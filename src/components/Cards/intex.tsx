import React, { useEffect, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";

import {
  Container,
  ContentFooter,
  ContentHeader,
  IconHeaderFavoriteContainer,
  Amount,
  SideLeftContentFooter,
  Gears,
  Seats,
} from "./styles";
import { Skeleton, Stack, useTheme } from "@mui/material";
import { addFavoriteCar, removeFavoriteCar } from "../../redux/favoriteslice";
import { ICarProps } from "../../redux/carsSlice";
import { useDispatch } from "react-redux";

interface ICardProps {
  title: string;
  img: string;
  amount: string;
  autoMaker: string;
  width?: string;
  isTypeFavorite?: boolean;
  seats: string;
  gear: string;
  carFavorite: boolean;
  car: ICarProps;
}

const Cards: React.FC<ICardProps> = ({
  title,
  img,
  amount,
  autoMaker,
  width,
  isTypeFavorite,
  seats,
  gear,
  car,
  carFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    isFavorite
      ? dispatch(addFavoriteCar(car))
      : dispatch(removeFavoriteCar(car));

    console.log(isFavorite, "2");
    // isFavorite ? addFavorite() : removeFavorite();
  }, [car, dispatch, isFavorite]);

  console.log(isFavorite, "Fora da função");

  return (
    <Container width={width}>
      {!img ? (
        <Stack spacing={1}>
          <Skeleton
            variant="rectangular"
            width={295}
            sx={{ borderRadius: "1rem" }}
            height={230}
          />
        </Stack>
      ) : (
        <Card className="card">
          <Card.Header className="cardHeader">
            <ContentHeader>
              <Card.Title className="cardTitle">
                {autoMaker + " "}
                {title}
              </Card.Title>
              {isTypeFavorite ?? (
                <IconHeaderFavoriteContainer>
                  {isFavorite ? (
                    <MdFavorite
                      size={20}
                      color="red"
                      onClick={() => setIsFavorite(false)}
                    />
                  ) : (
                    <MdFavoriteBorder
                      size={20}
                      color="white"
                      onClick={() => setIsFavorite(true)}
                    />
                  )}
                </IconHeaderFavoriteContainer>
              )}
            </ContentHeader>
          </Card.Header>
          <Card.Img className="cardImg" variant="bottom" src={img} />
          <Card.Footer className="cardFooter">
            <ContentFooter>
              <SideLeftContentFooter>
                {seats ? (
                  <Seats>
                    <FaUser size={18} color={theme.palette.text.primary} />
                    <p>{seats}</p>
                  </Seats>
                ) : (
                  ""
                )}

                {gear ? (
                  <Gears>
                    <GiGearStickPattern
                      size={18}
                      color={theme.palette.text.primary}
                    />
                    <strong>{gear == "automatico" ? "A" : "M"}</strong>
                  </Gears>
                ) : (
                  ""
                )}
              </SideLeftContentFooter>

              {amount ? (
                <Amount>
                  <p>R$ </p>

                  <strong>{amount}</strong>
                </Amount>
              ) : (
                ""
              )}
            </ContentFooter>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default Cards;
