import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";

import {
  Container,
  Content,
  NoFavorites,
} from "../../stylePages/stylesBooking";
import SideLeft from "../../components/SideLeft";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../redux/store";
import AppBar from "../../components/AppBar";
import { ICarProps } from "../../redux/carsSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Pagination from "@mui/material/Pagination";
import { Box, Button, useTheme } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { setFavoriteCars } from "../../redux/favoriteslice";
import { setUSer } from "../../redux/userSlice";
import { LoadingButton } from "@mui/lab";
import { FaRegSadCry } from "react-icons/fa";
import Link from "next/link";

interface IUserProps {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface IFavorite {
  user: IUserProps;
  arrayFavorites: IDataProps[];
}

const Favorites: React.FC<IFavorite> = ({ user, arrayFavorites }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);
  const dispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.userSlice.user);
  const [qntCarsInScreen, setQntCarsInScreen] = useState(6);
  const [noMoreCars, setnoMoreCars] = React.useState(false);

  const favorites = useSelector(
    (state: RootState) => state.favoritesSlice.cars
  );

  const handleChange = () => {
    if (favorites.length - 6 > qntCarsInScreen) {
      setQntCarsInScreen(qntCarsInScreen + 6);
    } else {
      setQntCarsInScreen(favorites.length);
      setnoMoreCars(true);
    }
  };

  const theme = useTheme();

  useEffect(() => {
    if (!userStore.email) {
      dispatch(setUSer(user));
    }
  }, [dispatch, user, userStore]);

  useEffect(() => {
    if (favorites.length > 0) {
      return;
    } else {
      dispatch(setFavoriteCars(arrayFavorites));
    }
  }, []);

  useEffect(() => {
    function handleCarsInScreen() {
      setQntCarsInScreen(6);
      const newCars = favorites.filter((item) => {
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
      if (favorites.length < 6) {
        setnoMoreCars(true);
      } else {
        setnoMoreCars(false);
      }
      setCarsInScreen(favorites);
      setQntCarsInScreen(6);
    }
  }, [filter, favorites]);

  return (
    <>
      <AppBar />
      <Container>
        {carsInScreen.length > 0 ? (
          <>
            <SideLeft isTypeFavorite={true} />
            <Content>
              {carsInScreen.map((item, index) => {
                if (index < qntCarsInScreen) {
                  return (
                    <Cards
                      car={item}
                      key={item.model}
                      favorites={arrayFavorites}
                      width="33.3%"
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
                  loadingPosition="start"
                  variant="outlined"
                  onClick={() => handleChange()}
                  disabled={noMoreCars ? true : false}
                >
                  {noMoreCars ? "NÃO HÁ MAIS CARROS" : "CARREGAR MAIS CARROS"}
                </LoadingButton>
              </Box>
            </Content>
          </>
        ) : (
          <NoFavorites>
            <h3 style={{ color: theme.palette.text.secondary }}>
              Você não tem nenhum carro favoritado
            </h3>
            <FaRegSadCry size={65} color={theme.palette.text.secondary} />

            <Link href="/Booking">
              <Button
                sx={{ marginTop: "4rem", width: "20%" }}
                variant="contained"
              >
                Ir para veículos
              </Button>
            </Link>
          </NoFavorites>
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
        destination: "/notlogin",
        permanent: false,
      },
    };
  }

  if (session.user?.email !== "nikolasbitencourtt@gmail.com") {
    return {
      redirect: {
        destination: "/",
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

  return {
    props: {
      user,
      arrayFavorites,
    },
  };
};
