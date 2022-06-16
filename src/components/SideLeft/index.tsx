import React from "react";
import CarSeats from "../CarSeats";
import FilterByCategoryCollapse from "../FilterByCategoryCollapse";

import { Container, Title } from "./styles";

interface ISideLeftProps {
  isTypeFavorite: boolean;
}

const SideLeft: React.FC<ISideLeftProps> = ({ isTypeFavorite }) => {
  return (
    <Container>
      <Title>Filtrar 🎯 </Title>
      <hr />
      <FilterByCategoryCollapse isTypeFavorite={isTypeFavorite} />
      <CarSeats isTypeFavorite={isTypeFavorite} />
    </Container>
  );
};

export default SideLeft;
