import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";

import { Container, Content } from "../../stylePages/stylesBooking";

import SideLeft from "../../components/SideLeft";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import AppBar from "../../components/AppBar";
// import { ICarProps } from "../../redux/carsSlice";
import {
  collection,
  getDocs,
  query,
  limit,
  where,
  orderBy,
  startAt,
  startAfter,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";

import Pagination from "@mui/material/Pagination";
import { Box, Button } from "@mui/material";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import { setUSer } from "../../redux/userSlice";

import { store } from "../../redux/store";
import { ICarProps } from "../../redux/carsSlice";
import { LoadingButton } from "@mui/lab";

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
  lastVisible: any;
  totalCars: number;
}

const Booking: React.FC<IBooking> = ({ user, arrayCars, arrayFavorites }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const [cars, setCars] = useState<ICarProps[]>(arrayCars);
  const dispatch = useDispatch();
  const [noMoreCars, setnoMoreCars] = React.useState(false);
  const [pages, setPages] = React.useState(0);
  const [lastVisible, setLastVisible] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFirsLastVisible = async () => {
      const queryGetCars = query(
        collection(db, "cars"),
        limit(6),
        orderBy("autoMaker")
      );
      const documentSnapshots = await getDocs(queryGetCars);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    };
    getFirsLastVisible();
  }, []);

  const handleChange = () => {
    setLoading(true);
    const getMoreCars = async () => {
      const queryGetCars = query(
        collection(db, "cars"),
        orderBy("autoMaker"),
        startAfter(lastVisible),
        limit(6)
      );
      let mock: any = [];
      const documentSnapshots = await getDocs(queryGetCars);
      if (documentSnapshots.docs.length > 0) {
        documentSnapshots.forEach((doc) => {
          mock.push({ ...doc.data(), id: doc.id });
        });
        setCarsInScreen(mock);
        setCars([...cars, ...mock]);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
        setLoading(false);
      } else {
        setnoMoreCars(true);
        setLoading(false);
      }
    };
    if (lastVisible !== undefined) {
      getMoreCars();
    } else {
      setnoMoreCars(true);
    }
  };

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

    {
      filter.length > 0 ? handleCarsInScreen() : setCarsInScreen(cars);
    }
  }, [filter, cars]);

  const getCars = async () => {
    const favoritesRef = collection(db, "cars");
    const documents = await getDocs(favoritesRef);
    setPages(Math.round(documents.size));
    console.log(pages, "Total cars");
  };

  getCars();

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

  const queryGetCars = query(
    collection(db, "cars"),
    limit(6),
    orderBy("autoMaker")
  );
  const documentSnapshots = await getDocs(queryGetCars);
  documentSnapshots.forEach((doc) => {
    arrayCars.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      user,
      arrayCars,
      arrayFavorites,
    },
  };
};
