import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";

import { Container, Content } from "../../stylePages/stylesBooking";

import SideLeft from "../../components/SideLeft";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AppBar from "../../components/AppBar";

import { ICarProps } from "../../redux/carsSlice";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase";

import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { setUSer } from "../../redux/userSlice";

import { store } from "../../redux/store";

interface IUserProps {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface IBooking {
  user: IUserProps;
  arrayCars: ICarProps[];
  arrayFavorites: IDataProps[];
}

const Booking: React.FC<IBooking> = ({ user, arrayCars, arrayFavorites }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const dispatch = useDispatch();
  const cars = arrayCars;

  const userStore = useSelector((state: RootState) => state.userSlice.user);
  useEffect(() => {
    if (!userStore.email) {
      dispatch(setUSer(user));
    }
  }, [dispatch, user, userStore]);

  useEffect(() => {
    function handleCarsInScreen() {
      const newCars = cars.filter((item) => {
        return (
          filter.includes(item.category.toLowerCase()) ||
          filter.includes(item.seats)
        );
      });

      setCarsInScreen(newCars);
    }

    handleCarsInScreen();

    {
      filter.length > 0 ? handleCarsInScreen() : setCarsInScreen(cars);
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
              return (
                <Cards
                  car={item}
                  key={item.model}
                  width="33.3%"
                  favorites={arrayFavorites}
                />
              );
            })}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "1.5rem",
              }}
            >
              <Pagination count={3} variant="outlined" />
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
        destination: "/",
        permanent: false,
      },
    };
  }

  const state = store.getState();

  const cars = state.carsSlice.cars;
  const favorites = state.favoritesSlice.cars;
  let arrayCars: any = [];
  let arrayFavorites: any = [];

  if (favorites.length > 0) {
    arrayFavorites = favorites;
  } else {
    const querySnapshot = query(collection(db, "Favorites"));
    const documents = await getDocs(querySnapshot);
    documents.forEach((doc) => {
      arrayFavorites.push({ ...doc.data(), id: doc.id });
    });
  }

  if (cars.length > 0) {
    arrayCars = cars;
  } else {
    const querySnapshot = query(collection(db, "cars"));
    const documents = await getDocs(querySnapshot);
    documents.forEach((doc) => {
      arrayCars.push(doc.data());
    });
  }

  const user = {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
    id: session.id,
  };

  return {
    props: {
      user,
      arrayCars,
      arrayFavorites,
    },
  };
};
