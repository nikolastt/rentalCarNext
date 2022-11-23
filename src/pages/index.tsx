import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper";

import Cards from "../components/Cards/intex";
import IconInformation from "../components/IconInformation";
import AppBar from "../components/AppBar";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { db } from "../firebase";
import { ICarProps } from "../redux/carsSlice";
import Image from "next/image";
import veicleHomePage from "../../public/images/veicleHomePage.png";
import { GetStaticProps } from "next";
import GradientHomePage from "../components/GradientHomePage";

interface IHome {
  featuredCars: ICarProps[];
}

const Home: NextPage<IHome> = ({ featuredCars }) => {
  <Head>
    <title>Rental Car</title>
  </Head>;

  const [sizeWindow, setSizeWindow] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSizeWindow(window.innerWidth);
    }
  }, []);

  return (
    <>
      <div>
        <AppBar />

        <div className={` h-[calc(100vh-79px)] w-full `}>
          <div className="container ">
            <h1 className="text-center lg:text-left lg:absolute  ]">
              Alugue Seu Veículo
            </h1>

            <div className="relative w-[90%] max-w-[500px]  mx-auto h-44 mt-16 lg:ml-auto lg:mx-0 lg:h-80 lg:max-w-[700px] ">
              <div className="absolute right-1/4 -top-10">
                <GradientHomePage />
              </div>
              <Image src={veicleHomePage} alt="veículo" layout="fill" />
            </div>
          </div>

          <div className="mt-12  ">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={sizeWindow > 830 ? 2.3 : 1.3}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              navigation={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {featuredCars?.map((car, index) => {
                return (
                  <SwiperSlide className="pt-6 pb-6" key={car.model + index}>
                    <Cards car={car} isTypeFavorite={false} isTypeCarrosel />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <section className="flex flex-col items-center container ">
            <h1 className="mt-24 text-center">Nossas Vantagens</h1>

            <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:space-x-6 mt-12s   ">
              <IconInformation
                Title="+50 CARROS"
                Description="Mais de 50 carros com categorias diferentes"
                SrcImg="/images/carro-eletrico.png"
              />

              <IconInformation
                Title="PREÇOS BAIXOS"
                Description="Promoções imperdíveis"
                SrcImg="/images/low-price.png"
              />

              <IconInformation
                Title="SUPORTE 24 HORAS"
                Description="Suporte disponível 24 horas, para dúvidas."
                SrcImg="/images/customer-service.png"
                className="sm:col-span-2 flex min-w-full md:col-span-1 "
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const featuredCars: any = [];
  const startAfterNumber = Math.floor(Math.random() * (35 - 0) + 0);
  const queryThree = query(
    collection(db, "cars"),
    limit(4),
    orderBy("amount"),
    startAfter(startAfterNumber)
  );
  const documentSnapshots = await getDocs(queryThree);
  documentSnapshots.forEach((doc) => {
    featuredCars.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      featuredCars,
    },
    revalidate: 60 * 60,
  };
};
