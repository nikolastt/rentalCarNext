import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AppBar from "../../components/AppBar";

import { IUserProps } from "../Booking";
import Image from "next/image";
import { useTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ICarProps } from "../../redux/carsSlice";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import NoFavorites from "../../components/NoFavorites";
import { getFavoritesCarUserBd } from "../../services/handleDocsFirebase";

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
      <div className="w-full h-[calc(100vh-8rem)]  ">
        <div className="flex  items-center px-3 w-full">
          <div className="w-[76px] h-[76px] bg-primary-500 flex items-center justify-center rounded-full">
            <div className="relative w-[70px] h-[70px] overflow-hidden  rounded-full ">
              <Image src={user.image} alt={"Avatar do usuário"} layout="fill" />
            </div>
          </div>

          <div className="flex flex-grow items-center">
            <h3 className=" ml-3">Olá, {user.name}</h3>

            <button className="ml-auto px-12 py-1 border-solid border-[1px] border-primary-500 rounded-md hover:scale-105 ease-in duration-200">
              Sair
            </button>
          </div>
        </div>

        {arrayFavorites.length > 0 ? (
          <div className=" mt-12 w-full h-[400px] flex flex-col items-center ">
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
          </div>
        ) : (
          <div className="mt-36 w-full">
            <NoFavorites />
          </div>
        )}
        <div className="mt-12 mx-auto  w-full flex flex-col items-center">
          <p className="text-center m-0 h-[20%] flex items-center ">
            <AiOutlineWarning size={30} className="text-primary-500 mr-1" />
            Identificamos que você é um adiministrador
          </p>

          <Link href="/Dashboard">
            <button className="flex mt-6 border-solid border-[1px] border-primary-500 py-2 px-12 rounded-md hover:scale-105 ease-in duration-200 w-1/2 justify-center">
              Ir para dashboard!
              <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} size={20} />
            </button>
          </Link>
        </div>
      </div>
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
