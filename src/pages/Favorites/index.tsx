import React, { useEffect, useState } from "react";
import Cards, { IDataProps } from "../../components/Cards/intex";
import FilteredContainer from "../../components/FilteredContainer";
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
import { IUserProps } from "../Booking";

interface IFavorite {
  arrayFavorites: IDataProps[];
  user: IUserProps;
}

const Favorites: React.FC<IFavorite> = ({ arrayFavorites, user }) => {
  const [carsInScreen, setCarsInScreen] = useState<ICarProps[]>([]);
  const filter = useSelector((state: RootState) => state.filterByCategory);

  const [qntCarsInScreen, setQntCarsInScreen] = useState(6);
  const [noMoreCars, setnoMoreCars] = React.useState(false);

  const favorites = arrayFavorites;

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
            <div className="px-3 max-w-lg w-full mx-auto">
              <FilteredContainer cars={arrayFavorites} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6 ">
              {carsInScreen.map((item, index) => {
                if (index < qntCarsInScreen) {
                  return (
                    <Cards
                      car={item}
                      key={item.model}
                      favorites={arrayFavorites}
                      width="33.3%"
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
                loadingPosition="start"
                variant="outlined"
                onClick={() => handleChange()}
                disabled={noMoreCars ? true : false}
              >
                {noMoreCars ? "NÃO HÁ MAIS CARROS" : "CARREGAR MAIS CARROS"}
              </LoadingButton>
            </Box>
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
        destination: "/NotLogin",
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

  const arrayFavorites = await getFavoritesCarUserBd(user.id as string);

  return {
    props: {
      user,
      arrayFavorites,
    },
  };
};
