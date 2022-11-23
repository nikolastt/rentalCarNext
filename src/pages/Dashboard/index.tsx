import { useTheme } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as TooltipChart,
  Legend as LegendChart,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import getMonthString from "../../assets/returnMonthString";

import { HiCurrencyDollar } from "react-icons/hi";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getAllRentedCars } from "../../services/handleDocsFirebase";
import { ICarProps } from "../../redux/carsSlice";

interface IDashboard {
  dataMostRentedVeicles: any;
  dataMostRentedCars: any;
  dataNumberOfCarsRentedInTheMonths: any;
  totalMoney: number;
}

interface IRentedCar {
  amount: string;
  autoMaker: string;
  category: string;
  extra1: number;
  extra2: number;
  gear: string;
  id: string;
  img: string;
  model: string;
  seats: string;
  typeFuel: string;
  userId: string;
  valueDateDevolution: string;
  valueDateLocation: string;
}

ChartJS.register(ArcElement, TooltipChart, LegendChart);

const Dashboard: React.FC<IDashboard> = ({
  dataMostRentedVeicles,
  dataMostRentedCars,
  dataNumberOfCarsRentedInTheMonths,
  totalMoney,
}) => {
  const theme = useTheme();

  const dataTeste = dataMostRentedCars.map((item: any) => {
    return item.count;
  });

  const dataTeste2 = dataMostRentedCars.map((item: any) => {
    return item.category;
  });

  const data = {
    labels: dataTeste2,
    datasets: [
      {
        label: "# of Votes",
        data: dataTeste,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <ResponsiveAppBar />

      <div className="w-full min-h-screen px-3 lg:grid grid-cols-2 gap-6 container ">
        <div>
          <p className="text-center">Total veículos alugados por mes</p>
          <div className="w-full h-[400px]  rounded-xl border-solid border-[1px] border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/20  ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataNumberOfCarsRentedInTheMonths}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="white" strokeDasharray="3 3" />
                <XAxis dataKey="monthString" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="countCars" stackId="a" fill="#c7ad9096" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full  mt-12 lg:mt-0  ">
          <p className="text-center">Carros mais alugados</p>
          <div className=" w-full h-[400px] border-solid border-[1px] border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/20 rounded-xl  ">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={dataMostRentedVeicles}
              >
                <PolarGrid />
                <PolarAngleAxis
                  stroke={theme.palette.primary.contrastText}
                  dataKey="nome"
                  color="red"
                />
                <PolarRadiusAxis color="red" />
                <Radar
                  name="Mike"
                  dataKey="quantidade"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full  mt-12 lg:mt-0">
          <p className="text-center">Total arrecadado</p>
          <div className="w-full h-[400px]  border-solid border-[1px] border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/20 rounded-xl flex flex-col justify-center items-center ">
            <HiCurrencyDollar size="30%" />
            <h2 className="mt-3">
              {totalMoney.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>
        </div>

        <div className="w-full h-full mt-12 pb-12 lg:mt-0 ">
          <p className="text-center">Categorias mais alugadas</p>
          <div className="w-full h-[400px] p-[1rem] border-solid border-[1px] border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/20 rounded-xl">
            <Pie data={data} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const arrayDataVaiclesLocated = await getAllRentedCars();

  const nameCars: string[] = [];
  arrayDataVaiclesLocated.map((car: ICarProps) => {
    if (!nameCars.includes(car.model)) {
      nameCars.push(car.model);
    }
  });

  const dataMoreVeicles: any = [];
  nameCars.map((name) => {
    let quantidade = 0;
    let nome = name;
    arrayDataVaiclesLocated.map((car: ICarProps) => {
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

  const categories: any = [];
  arrayDataVaiclesLocated.forEach((car: ICarProps) => {
    categories.push(car.category);
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

  const dataMostRentedCars = [
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

  const dataMostRentedVeicles = dataMoreVeicles.slice(0, 6);

  const meses: number[] = [];
  let totalMoney = 0;
  arrayDataVaiclesLocated.map((car: IRentedCar) => {
    totalMoney +=
      Number(car.amount.replace(".", "")) +
      Number(car.extra1) +
      Number(car.extra2);
    const date = new Date(Date.parse(car.valueDateDevolution));
    if (!meses.includes(date.getMonth() + 1)) {
      meses.push(date.getMonth() + 1);
    }
  });

  meses.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });

  const dataNumberOfCarsRentedInTheMonths: any = [];
  meses.map((mes: number) => {
    let month = mes;
    let countCars = 0;
    let monthString;
    monthString = getMonthString(mes);
    arrayDataVaiclesLocated.map((car: IRentedCar) => {
      const date = new Date(Date.parse(car.valueDateDevolution));
      if (date.getMonth() + 1 === mes) {
        countCars++;
      }
    });

    dataNumberOfCarsRentedInTheMonths.push({
      month,
      countCars,
      monthString,
    });
  });

  return {
    props: {
      dataMostRentedVeicles,
      dataMostRentedCars,
      dataNumberOfCarsRentedInTheMonths,
      totalMoney,
    },
  };
};
