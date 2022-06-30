import { useTheme } from "@mui/material";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ResponsiveAppBar from "../../components/AppBar";
import { db } from "../../firebase";
import { ICarProps } from "../../redux/carsSlice";

import {
  Container,
  SideLeft,
  ContainerUp,
  ContainerDownLeft,
  ContentDownLeft,
  ContentDownRight,
  ContainerDownRight,
  ContainerDown,
  ContentUp,
  SideRight,
} from "../../stylePages/stylesDashboard";

interface IDashboard {
  teste: any;
  teste2: any;
}

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const Dashboard: React.FC<IDashboard> = ({ teste, teste2 }) => {
  const theme = useTheme();
  console.log(teste, "data");
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <SideLeft>
          <ContainerUp>
            <ContentUp></ContentUp>
          </ContainerUp>

          <ContainerDown>
            <ContainerDownLeft>
              <ContentDownLeft primaryColor={theme.palette.primary.main}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teste2}>
                    <PolarGrid />
                    <PolarAngleAxis
                      stroke={theme.palette.primary.contrastText}
                      dataKey="category"
                      color="red"
                    />
                    <PolarRadiusAxis color="red" />
                    <Radar
                      name="Mike"
                      dataKey="count"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ContentDownLeft>
            </ContainerDownLeft>
            <ContainerDownRight>
              <ContentDownRight></ContentDownRight>
            </ContainerDownRight>
          </ContainerDown>
        </SideLeft>

        <SideRight>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={teste2}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </SideRight>
      </Container>
    </>
  );
};

export default Dashboard;

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

  const arrayDataMoreVaiclesLocated: any[] = [];

  const querySnapshot = await getDocs(collection(db, "RentedCars"));
  querySnapshot.forEach((doc) => {
    arrayDataMoreVaiclesLocated.push({ ...doc.data() });
  });

  //   const favoritesRef = collection(db, "RentedCars");
  //   const q = query(favoritesRefs);
  //   const documents = await getDocs(q);
  //   documents.forEach((doc) => {
  //     arrayDataMoreVaiclesLocated.push({ ...doc.data() });
  //   });

  const nameCars: string[] = [];
  arrayDataMoreVaiclesLocated.map((car) => {
    if (!nameCars.includes(car.model)) {
      nameCars.push(car.model);
    }
  });

  const dataMoreVeicles: any = [];
  nameCars.map((name) => {
    let quantidade = 0;
    let nome = name;
    arrayDataMoreVaiclesLocated.map((car) => {
      if (name === car.model) {
        quantidade++;
        name = car.model;
      }
    });
    dataMoreVeicles.push({
      nome,
      quantidade,
    });
  });

  dataMoreVeicles.sort(function (a: any, b: any) {
    if (a.quantidade < b.quantidade) {
      return 1;
    }

    if (a.quantidade > b.quantidade) {
      return -1;
    }

    return 0;
  });

  const arrayCars: any[] = [];

  const categories: any = [];

  const querySnapshotCars = await getDocs(collection(db, "cars"));
  querySnapshotCars.forEach((doc) => {
    arrayDataMoreVaiclesLocated.push({ ...doc.data() });
    categories.push(doc.data().category);
  });

  let countSUV = 0;
  let countCompacto = 0;
  let countSedan = 0;
  let countUtilitario = 0;
  let countPicape = 0;
  categories?.map((categoria: string) => {
    if (categoria.toLowerCase() === "suv") {
      countSUV++;
    } else if (categoria.toLowerCase() === "compacto") {
      countCompacto++;
    } else if (categoria.toLowerCase() === "sedan") {
      countSedan++;
    } else if (categoria.toLowerCase() === "utilitario") {
      countUtilitario++;
    } else if (categoria.toLowerCase() === "picape") {
      countPicape++;
    }
  });

  const teste2 = [
    {
      category: "suv",
      count: countSUV,
    },
    {
      category: "compacto",
      count: countCompacto,
    },
    {
      category: "sedan",
      count: countSedan,
    },
    {
      category: "utilitario",
      count: countUtilitario,
    },
    {
      category: "picape",
      count: countPicape,
    },
  ];

  const teste = dataMoreVeicles.slice(0, 6);

  return {
    props: {
      user,
      teste,
      teste2,
    },
  };
};
