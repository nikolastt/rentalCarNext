import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import * as React from "react";
import ResponsiveAppBar from "../../components/AppBar";
import Cards from "../../components/Cards/intex";
import { db } from "../../firebase";
import { ICarProps } from "../../redux/carsSlice";

interface IRentedCars {
  arrayRentedCars: ICarProps[];
}

const RentedCars: React.FC<IRentedCars> = ({ arrayRentedCars }) => {
  return (
    <>
      <ResponsiveAppBar />

      {arrayRentedCars.map((car) => (
        <Cards car={car} key={car.model} width="100%" isTypeFavorite={false} />
      ))}
    </>
  );
};

export default RentedCars;

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

  let arrayRentedCars: any = [];
  const favoritesRef = collection(db, "RentedCars");
  const q = query(favoritesRef, where("userId", "==", user.id));
  const documents = await getDocs(q);
  documents.forEach((doc) => {
    arrayRentedCars.push({ ...doc.data() });
  });

  return {
    props: {
      user,
      arrayRentedCars,
    },
  };
};
