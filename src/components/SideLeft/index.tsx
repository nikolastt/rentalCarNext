import { useTheme } from "@mui/material";
import React from "react";
import CarSeats from "../CarSeats";
import FilterByCategoryCollapse from "../FilterByCategoryCollapse";

import { Container, Title } from "./styles";

interface ISideLeftProps {
  isTypeFavorite: boolean;
}

const SideLeft: React.FC<ISideLeftProps> = ({ isTypeFavorite }) => {
  const theme = useTheme();
  return (
    <Container primaryColor={theme.palette.primary.main}>
      <Title>Filtrar 🎯 </Title>
      <hr />
      <FilterByCategoryCollapse isTypeFavorite={isTypeFavorite} />
      <CarSeats isTypeFavorite={isTypeFavorite} />
    </Container>
  );
};

export default SideLeft;
