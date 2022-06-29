import type { NextPage } from "next";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import {
  Container,
  Title,
  PageHeader,
  Img,
  Gradient,
  SectionAdvantage,
  TitleSectionAdvantage,
  ContentSectionAdvantage,
  SideLeft,
  InfoDate,
} from "../stylePages/stylesPageServices";

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

interface IHome {
  featuredCars: ICarProps[];
}

const Home: NextPage<IHome> = ({ featuredCars }) => {
  <Head>
    <title>Rental Car</title>
  </Head>;

  return (
    <>
      <AppBar />
      <Container>
        <PageHeader>
          <SideLeft>
            <Title>
              Alugue Seu <br />
              Veículo
            </Title>

            <InfoDate>
              <h1>
                Datas para alugar o carro <br />
                (a ser implementada){" "}
              </h1>
            </InfoDate>
          </SideLeft>

          <Img>
            <Gradient></Gradient>
            <Image src={veicleHomePage} alt="Veicle home page" />
          </Img>
        </PageHeader>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
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
              <SwiperSlide key={car.model + index}>
                <Cards car={car} isTypeFavorite={false} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <SectionAdvantage>
          <TitleSectionAdvantage>Nossas Vantagens</TitleSectionAdvantage>
          <ContentSectionAdvantage>
            <IconInformation
              Title="+50 CARROS"
              Description="Mais de 50 carros com categorias diferentes"
              SrcImg="images/carro-eletrico.png"
            />

            <IconInformation
              Title="PREÇOS BAIXOS"
              Description="Promoções imperdíveis"
              SrcImg="images/low-price.png"
            />

            <IconInformation
              Title="SUPORTE 24 HORAS"
              Description="Suporte disponível 24 horas, para dúvidas."
              SrcImg="images/customer-service.png"
            />
          </ContentSectionAdvantage>
        </SectionAdvantage>
      </Container>
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
    revalidate: 10,
  };
};
