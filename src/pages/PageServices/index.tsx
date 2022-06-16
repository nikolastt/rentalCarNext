import React, { useEffect, useMemo, useState } from "react";

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
} from "../../stylePages/stylesPageServices";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper";

import Cards from "../../components/Cards/intex";
import IconInformation from "../../components/IconInformation";

// import Cars from "../../repositories/cars";
import AppBar from "../../components/AppBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import { useSelector, useDispatch } from "react-redux";
import { getCars, ICarProps } from "../../redux/carsSlice";
import { RootState } from "../../redux/store";
import Image from "next/image";

import veicleHomePage from "../../../public/images/veicleHomePage.png";
import { GetStaticProps } from "next";

const PageServices: React.FC = () => {
  const dispatch = useDispatch();

  const [cars, setCars] = useState<ICarProps[]>([]);
  const carsRedux = useSelector((state: RootState) => state.carsSlice.cars);

  useEffect(() => {
    async function getCarsDb() {
      const arrayCars: any = [];
      const querySnapshot = await getDocs(collection(db, "cars"));
      querySnapshot.forEach((doc) => {
        arrayCars.push(doc.data());
      });
      setCars(arrayCars);
      dispatch(getCars(arrayCars));
    }

    if (carsRedux.length > 0) {
      setCars(carsRedux);
    } else {
      getCarsDb();
    }
  }, [carsRedux, dispatch]);

  const getUniqueNumbers = useMemo(() => {
    const numbers: number[] = [];
    let totalCarsInPromotion = 0;
    const getTotalCarsInPromotion = () => {
      if (cars.length < 4) {
        totalCarsInPromotion = cars.length;
      } else {
        totalCarsInPromotion = 4;
      }
    };
    getTotalCarsInPromotion();

    if (cars.length > 0) {
      for (let i = 0; i < totalCarsInPromotion; i++) {
        var temp = Math.floor(Math.random() * (cars?.length || 5));
        if (numbers.includes(temp)) {
          i--;
        } else {
          numbers.push(temp);
        }
      }
    }

    return numbers;
  }, [cars]);

  const getCarsPromotion = useMemo(() => {
    const carsPromotion: ICarProps[] = [];

    getUniqueNumbers.forEach((number) => {
      carsPromotion.push(cars[number]);
    });

    return carsPromotion;
  }, [cars, getUniqueNumbers]);

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
          {getCarsPromotion?.map((car, index) => {
            return (
              <SwiperSlide key={car.model + index}>
                <Cards
                  car={car}
                  title={car.model}
                  img={car.img}
                  amount={car.amount}
                  autoMaker={car.autoMaker}
                  gear={car.gear}
                  seats={car.seats}
                  isTypeFavorite={false}
                />
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

export default PageServices;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
