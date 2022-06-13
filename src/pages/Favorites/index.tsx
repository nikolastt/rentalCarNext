import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/intex";

import { Container, Content } from "../../stylePages/stylesBooking";

import SideLeft from "../../components/SideLeft";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AppBar from "../../components/AppBar";

import { getCars, ICarProps } from "../../redux/carsSlice";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase";

import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { setFavoriteCars } from "../../redux/favoriteslice";

const Favorites: React.FC = () => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const [cars, setCars] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const favoriteCars = useSelector(
    (state: RootState) => state.favoritesSlice.cars
  );
  const dispatch = useDispatch();

  console.log(favoriteCars, "favorites");

  useEffect(() => {
    async function getCarsDb() {
      const arrayCars: any = [];
      const querySnapshot = query(collection(db, "cars"));
      const documents = await getDocs(querySnapshot);
      documents.forEach((doc) => {
        arrayCars.push(doc.data());
      });
      setCars(arrayCars);
      dispatch(setFavoriteCars(arrayCars));
    }

    if (favoriteCars.length > 0) {
      setCars(favoriteCars);
    } else {
      // getCarsDb();
    }
  }, [favoriteCars, dispatch]);

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
        <SideLeft isTypeFavorite={true} />

        {carsInScreen.length > 0 ? (
          <Content>
            {carsInScreen.map((item, index) => {
              return (
                <Cards
                  car={item}
                  key={item.model}
                  title={item.model}
                  img={item.img}
                  amount={item.amount}
                  autoMaker={item.autoMaker}
                  seats={item.seats}
                  gear={item.gear}
                  width="33.3%"
                  carFavorite={true}
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

export default Favorites;

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

  return {
    props: {},
  };
};
