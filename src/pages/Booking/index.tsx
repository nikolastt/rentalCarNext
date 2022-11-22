import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";
import FilteredContainer from "../../components/FilteredContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { unstable_getServerSession } from "next-auth/next";
import AppBar from "../../components/AppBar";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { ICarProps } from "../../redux/carsSlice";
import { LoadingButton } from "@mui/lab";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUserDb, getCarsDb } from "../../services/handleDocsFirebase";

export interface IUserProps {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface IBooking {
  user: IUserProps;
  arrayCars: ICarProps[];
  arrayFavorites: IDataProps[];
  lastVisible: any;
  totalCars: number;
  cars: ICarProps[];
}

const Booking: React.FC<IBooking> = ({ arrayCars, arrayFavorites, user }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const [noMoreCars, setnoMoreCars] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [qntCarsInScreen, setQntCarsInScreen] = useState(6);
  const cars = arrayCars;

  const handleChange = () => {
    if (cars.length - 6 > qntCarsInScreen) {
      setQntCarsInScreen(qntCarsInScreen + 6);
    } else {
      setQntCarsInScreen(cars.length);
      setnoMoreCars(true);
    }
  };

  useEffect(() => {
    function handleCarsInScreen() {
      setQntCarsInScreen(6);
      const newCars = cars.filter((item) => {
        return (
          filter.includes(item.category.toLowerCase()) ||
          filter.includes(item.seats)
        );
      });

      if (newCars.length < 6) {
        setnoMoreCars(true);
      } else {
        setnoMoreCars(false);
      }

      setCarsInScreen(newCars);
    }

    if (filter.length > 0) {
      handleCarsInScreen();
    } else {
      if (cars.length < 6) {
        setnoMoreCars(true);
      } else {
        setnoMoreCars(false);
      }
      setCarsInScreen(cars);
      setQntCarsInScreen(6);
    }
  }, [filter, cars]);

  return (
    <>
      <AppBar />
      <div className="flex flex-col w-full bg-background rounded-md py-[1rem] ">
        <div className="px-3 max-w-lg w-full mx-auto">
          <FilteredContainer cars={cars} />
        </div>

        {carsInScreen.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6  ">
              {carsInScreen.map((item, index) => {
                if (index < qntCarsInScreen) {
                  return (
                    <Cards
                      car={item}
                      key={item.model}
                      width="33.3%"
                      favorites={arrayFavorites}
                      userId={user.id}
                    />
                  );
                }
              })}
            </div>
            <Box
              sx={{
                display: "flex ",
                justifyContent: "center",
                width: "100%",
                marginTop: "1.5rem",
              }}
            >
              <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={() => handleChange()}
                disabled={noMoreCars ? true : false}
              >
                {noMoreCars ? "NÃO HÁ MAIS CARROS" : "CARREGAR MAIS CARROS"}
              </LoadingButton>
            </Box>
          </>
        ) : (
          <div>
            <h1>Carregando</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/notlogin",
        permanent: false,
      },
    };
  }

  const user = {
    image: session?.user?.image,
    email: session?.user?.email,
    name: session?.user?.name,
    id: session?.id,
  };

  const userDb = await getUserDb(session?.id as string);
  const arrayCars = await getCarsDb();
  const arrayFavorites = userDb?.carFavorites || [];

  return {
    props: {
      user,
      arrayCars,
      arrayFavorites,
    },
  };
};
