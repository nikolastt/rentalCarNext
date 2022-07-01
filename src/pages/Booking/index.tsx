import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";
import { Container, Content } from "../../stylePages/stylesBooking";
import SideLeft from "../../components/SideLeft";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AppBar from "../../components/AppBar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { setUSer } from "../../redux/userSlice";
import { store } from "../../redux/store";
import { ICarProps, getCars } from "../../redux/carsSlice";
import { LoadingButton } from "@mui/lab";

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

const Booking: React.FC<IBooking> = ({ user, arrayCars, arrayFavorites }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const dispatch = useDispatch();
  const [noMoreCars, setnoMoreCars] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [qntCarsInScreen, setQntCarsInScreen] = useState(6);
  const cars = arrayCars;

  const userStore = useSelector((state: RootState) => state.userSlice.user);
  const carsStore = useSelector((state: RootState) => state.carsSlice.cars);

  useEffect(() => {
    if (!userStore.email) {
      dispatch(setUSer(user));
    }
  }, [dispatch, user, userStore]);
  useEffect(() => {
    if (carsStore.length <= 0) {
      dispatch(getCars(cars));
    }
  }, [dispatch, cars, carsStore]);

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
      <Container>
        <SideLeft isTypeFavorite={false} />

        {carsInScreen.length > 0 ? (
          <Content>
            {carsInScreen.map((item, index) => {
              if (index < qntCarsInScreen) {
                return (
                  <Cards
                    car={item}
                    key={item.model}
                    width="33.3%"
                    favorites={arrayFavorites}
                  />
                );
              }
            })}
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
                loadingPosition="start"
                variant="outlined"
                onClick={() => handleChange()}
                disabled={noMoreCars ? true : false}
              >
                {noMoreCars ? "NÃO HÁ MAIS CARROS" : "CARREGAR MAIS CARROS"}
              </LoadingButton>
            </Box>
          </Content>
        ) : (
          <Content>
            <h1>Carregando</h1>
          </Content>
        )}
      </Container>
    </>
  );
};

export default Booking;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  const state = store.getState();

  const favorites = state.favoritesSlice.cars;
  const cars = state.carsSlice.cars;
  let arrayCars: any = [];
  let arrayFavorites: any = [];

  if (favorites.length > 0) {
    arrayFavorites = favorites;
  } else {
    const favoritesRef = collection(db, "Favorites");
    const q = query(favoritesRef, where("userId", "==", user.id));
    const documents = await getDocs(q);
    documents.forEach((doc) => {
      arrayFavorites.push({ ...doc.data(), id: doc.id });
    });
  }

  if (cars.length > 0) {
    arrayCars = cars;
  } else {
    const querySnapshot = await getDocs(collection(db, "cars"));
    querySnapshot.forEach((doc) => {
      arrayCars.push({ ...doc.data(), id: doc.id });
    });
  }

  return {
    props: {
      user,
      arrayCars,
      arrayFavorites,
    },
  };
};
