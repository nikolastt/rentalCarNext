import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AppBar from "../../components/AppBar";
import {
  Container,
  SideLeft,
  SideRight,
  ContentImage,
} from "../../stylePages/stylesProfile";
import { IUserProps } from "../Booking";
import Image from "next/image";
import { Button, useTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { store } from "../../redux/store";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { ICarProps } from "../../redux/carsSlice";
import { FaRegSadCry } from "react-icons/fa";
import Link from "next/link";
import { NoFavorites } from "../../stylePages/stylesBooking";
import { AiOutlineArrowRight } from "react-icons/ai";

interface IUser {
  user: IUserProps;
  arrayFavorites: ICarProps[];
}

interface IData {
  name: string;
  amount: number;
}

const UserProfile: React.FC<IUser> = ({ user, arrayFavorites }) => {
  const theme = useTheme();

  let dataTeste: IData[] = [];
  const data2 = () => {
    arrayFavorites?.map((car) => {
      dataTeste.push({
        name: car.model,
        amount: Number(car.amount.replace(".", "")),
      });
    });
  };

  data2();

  return (
    <>
      <AppBar />
      <Container>
        <SideLeft primaryColor={theme.palette.primary.main}>
          <ContentImage>
            <Image src={user.image} alt={"Avatar do usuário"} layout="fill" />
          </ContentImage>

          <h3>{user.name}</h3>

          <p>Identificamos que você é um adiministrador</p>
          <Link href="/Dashboard">
            <Button>
              Ir para dashboard!
              <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} size={20} />
            </Button>
          </Link>
        </SideLeft>

        {arrayFavorites.length > 0 ? (
          <SideRight>
            <h2>VEÍCULOS FAVORITOS</h2>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={dataTeste}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={theme.palette.info.main}
                  fill={theme.palette.info.main}
                />
              </AreaChart>
            </ResponsiveContainer>
          </SideRight>
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

export default UserProfile;

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
