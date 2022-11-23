import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import * as React from "react";
import ResponsiveAppBar from "../../components/AppBar";
import Cards from "../../components/Cards/intex";
import { getAllRentedCars } from "../../services/handleDocsFirebase";
import { authOptions } from "../api/auth/[...nextauth]";

interface ICarRented {
  id?: string;
  model: string;
  autoMaker: string;
  amount: string;
  typeFuel: string;
  category: string;
  img: string;
  seats: string;
  gear: string;
  valueDateLocation: Date;
  ValueDateDevolution: Date;
}

interface IRentedCars {
  arrayRentedCars: ICarRented[];
}

const RentedCars: React.FC<IRentedCars> = ({ arrayRentedCars }) => {
  return (
    <>
      <ResponsiveAppBar />

      {arrayRentedCars.map((car) => (
        <>
          <div className="px-3">
            <Cards
              car={car}
              key={car.model}
              width="100%"
              isTypeFavorite={false}
            />
            <Button variant="outlined">
              <Link href={`/infoVeicle/${car.id}`}>Alugar novamente</Link>
            </Button>
          </div>
        </>
      ))}
    </>
  );
};

export default RentedCars;

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

  const arrayRentedCars = await getAllRentedCars();

  return {
    props: {
      arrayRentedCars,
    },
  };
};
