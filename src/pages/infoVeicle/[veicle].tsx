import React, { useState } from "react";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import ResponsiveAppBar from "../../components/AppBar";
import { db } from "../../firebase";
import { ICarProps } from "../../redux/carsSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LoadingButton,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/lab";

import { useTheme } from "@mui/material";

interface IUserProps {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface IInforVeicles {
  user: IUserProps;
  car: ICarProps;
  id: String;
}

export interface State extends SnackbarOrigin {
  openSuccess?: boolean;
  openError?: boolean;
  open: boolean;
}

const InfoVeicle: React.FC<IInforVeicles> = ({ user, car, id }) => {
  const [extra1, setExtra1] = useState(0);
  const [extra2, setExtra2] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const [state, setState] = React.useState<State>({
    open: false,
    openSuccess: true,
    openError: true,
    vertical: "top",
    horizontal: "right",
  });

  const ref = collection(db, "RentedCars");

  const [valueDateLocation, setValueDateLocation] = React.useState<Date | null>(
    new Date()
  );
  const [valueDateDevolution, setValueDateDevolution] =
    React.useState<Date | null>(new Date());

  const handleChangeDataLocation = (newValue: Date | null) => {
    setValueDateLocation(newValue);
  };

  const handleChangeDataDevolution = (newValue: Date | null) => {
    setValueDateDevolution(newValue);
  };

  const { vertical, horizontal, openSuccess, openError, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleClick = (
    newState: SnackbarOrigin,
    openSuccess?: any,
    openError?: any
  ) => {
    setState({ openSuccess, openError, open: true, ...newState });
  };

  const reservVeicle = async () => {
    setIsLoading(true);

    try {
      await addDoc(ref, {
        model: car.model,
        autoMaker: car.autoMaker,
        amount: car.amount,
        typeFuel: car.typeFuel,
        category: car.category,
        img: car.img,
        seats: car.seats,
        gear: car.gear,
        userId: user?.id,
        extra1,
        extra2,
        valueDateLocation: valueDateLocation?.toDateString(),
        valueDateDevolution: valueDateDevolution?.toDateString(),
        id,
      }).then(() => {
        setIsLoading(false);
        handleClick(
          {
            vertical: "top",
            horizontal: "right",
          },
          { openSuccess: true }
        );
      });
    } catch {
      setIsLoading(false);
      handleClick(
        {
          vertical: "top",
          horizontal: "right",
        },
        { openError: true }
      );
    }
  };

  const handleExtra1 = () => {
    if (extra1 === 0) {
      setExtra1(50);
    } else {
      setExtra1(0);
    }
  };

  const handleExtra2 = () => {
    if (extra2 === 0) {
      setExtra2(75);
    } else {
      setExtra2(0);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <h1>
        {car.autoMaker} {car.model}
      </h1>
      <div className="h-[calc(100vh-10rem)] w-full flex mt-[1rem]">
        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="relative w-[80%] h-[60%] flex justify-center items-center rounded-[1.5rem] overflow-hidden border-solid border-[1px] border-primary-500 bg-red-500 shadow backdrop-blur-lg">
            <div className="relative w-[85%] h-[75%]">
              <Image
                alt={car.model}
                src={car.img}
                layout="fill"
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 ml-[1rem] p-[0.5rem]">
          <div className="h-[10%]">
            <h2>Extras</h2>
          </div>

          <div className="flex flex-col h-[25%]">
            <FormControlLabel
              control={<Checkbox onClick={handleExtra1} />}
              label="GPS + R$50,00"
            />
            <FormControlLabel
              control={<Checkbox onClick={handleExtra2} />}
              label="Vidros Escuros + RS75,00"
            />
          </div>

          <div className="h-[35%]">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <MobileDatePicker
                  label="Data da locação"
                  inputFormat="dd/MM/yyyy"
                  value={valueDateLocation}
                  onChange={handleChangeDataLocation}
                  renderInput={(params) => <TextField {...params} />}
                />

                <MobileDatePicker
                  label="Data da devolução"
                  inputFormat="dd/MM/yyyy"
                  value={valueDateDevolution}
                  onChange={handleChangeDataDevolution}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>

          <div className="w-full h-[20%]">
            <h2 className="flex w-full">
              Total:{" "}
              <span className="ml-auto">
                R${" "}
                {(
                  extra1 +
                  extra2 +
                  Number(car.amount.replace(".", ""))
                ).toLocaleString()}
              </span>
            </h2>
            <LoadingButton
              sx={{ width: "100%" }}
              onClick={reservVeicle}
              loading={isLoading}
              variant="outlined"
            >
              Reservar
            </LoadingButton>
          </div>
          <Snackbar
            open={open}
            key={vertical + horizontal}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={5000}
            onClose={handleClose}
            sx={{ marginTop: "65vh" }}
          >
            {openError ? (
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Ocorreu um erro ao cadastrar o veículo!
              </Alert>
            ) : (
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Veículo reservado com sucesso!
              </Alert>
            )}
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default InfoVeicle;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/notlogin",
        permanent: false,
      },
    };
  }

  const user = {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
    id: session.id,
  };
  const id = params?.veicle;

  let car;
  const docRef = doc(db, "cars", `${id}`);
  const document = await getDoc(docRef);
  car = document.data();

  return {
    props: {
      user,
      car,
      id,
    },
  };
};
