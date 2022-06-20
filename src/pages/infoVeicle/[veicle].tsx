import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import ResponsiveAppBar from "../../components/AppBar";

import {
  Container,
  Content,
  SideRight,
  ContentImage,
  SizeImage,
} from "../../stylePages/stylesInfoVeicle";

const infoVeicle: React.FC = () => {
  return (
    <Container>
      <ResponsiveAppBar />
      <h1>Nome do Carro</h1>
      <Content>
        <ContentImage>
          <SizeImage>
            <Image
              alt="//////////////////////////"
              src="https://www.localiza.com/brasil-site/geral/Frota/KICK.png"
              layout="fill"
              quality={100}
            />
          </SizeImage>
        </ContentImage>

        <SideRight></SideRight>
      </Content>
    </Container>
  );
};

export default infoVeicle;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};
