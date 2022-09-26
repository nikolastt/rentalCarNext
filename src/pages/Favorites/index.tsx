import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";
import SideLeft from "../../components/SideLeft";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AppBar from "../../components/AppBar";
import { ICarProps } from "../../redux/carsSlice";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { LoadingButton } from "@mui/lab";
import NoFavorites from "../../components/NoFavorites";
import { authOptions } from "../api/auth/[...nextauth]";

import { unstable_getServerSession } from "next-auth/next";
import { getFavoritesCarUserBd } from "../../services/handleDocsFirebase";

interface IFavorite {
  arrayFavorites: IDataProps[];
}

const Favorites: React.FC<IFavorite> = ({ arrayFavorites }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);

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
      <div className="flex flex-col w-full bg-background rounded-md py-[1rem]">
        {carsInScreen.length > 0 ? (
          <>
            <div className="px-3">
              <SideLeft isTypeFavorite={true} />
            </div>

            <div className="flex flex-col px-3 mt-6">
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
            </div>
          </>
        ) : (
          <NoFavorites />
        )}
      </div>
    </>
  );
};

export default Favorites;

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

  const arrayFavorites = await getFavoritesCarUserBd(session?.id as string);

  return {
    props: {
      arrayFavorites,
    },
  };
};
