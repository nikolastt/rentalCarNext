import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import AppBar from "../../components/AppBar";

import IconInformation from "../../components/IconInformation";
import {
  Container,
  SideLeft,
  SideRight,
  ContentImage,
} from "../../stylePages/stylesProfile";
import { IUserProps } from "../Booking";
import Image from "next/image";
import { useTheme } from "@mui/material";

import { PureComponent } from "react";
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

interface IUser {
  user: IUserProps;
  favorites: ICarProps[];
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: -1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 500,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: -2000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: -250,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const UserProfile: React.FC<IUser> = ({ user, favorites }) => {
  const theme = useTheme();
  const off = gradientOffset();
  // static demoUrl = 'https://codesandbox.io/s/area-chart-filled-by-sign-0h7rt';

  const data2 = () => {
    favorites.map((car) => {
      return {
        name: car.model,
        uv: car.amount,
      };
    });
  };

  return (
    <>
      <AppBar />
      <Container>
        <SideLeft primaryColor={theme.palette.primary.main}>
          <ContentImage>
            <Image src={user.image} alt={"Avatar do usuário"} layout="fill" />
          </ContentImage>

          <h3>{user.name}</h3>
        </SideLeft>

        <SideRight>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
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
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={off} stopColor="green" stopOpacity={1} />
                  <stop offset={off} stopColor="red" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#000"
                fill="url(#splitColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </SideRight>
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
      favorites,
    },
  };
};
