import { GetServerSideProps } from "next";
import React from "react";

// import { Container } from './styles';

interface ITeste {
  casa: string;
}

const Teste: React.FC<ITeste> = ({ casa }) => {
  return (
    <div>
      <h1>{casa}</h1>
    </div>
  );
};

export default Teste;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      casa: "abc",
    },
  };
};
