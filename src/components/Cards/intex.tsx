import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  ContentFooter,
  ContentHeader,
  IconHeaderFavoriteContainer,
  Amount,
  SideLeftContentFooter,
  Gears,
  Seats,
  CardContent,
  ImageContent,
} from "./styles";
import { Skeleton, Stack, useTheme } from "@mui/material";
import { addFavoriteCar, removeFavoriteCar } from "../../redux/favoriteslice";
import { ICarProps } from "../../redux/carsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/index";
import { RootState } from "../../redux/store";
import Image from "next/image";

interface ICardProps {
  width?: string;
  isTypeFavorite?: boolean;
  car: ICarProps;
  setFavorite?: boolean;
  favorites?: IDataProps[];
}

export interface IDataProps {
  model: string;
  autoMaker: string;
  amount: string;
  typeFuel: string;
  category: string;
  img: string;
  seats: string;
  gear: string;
  userId: string;
  id: string;
}

const Cards: React.FC<ICardProps> = ({
  width,
  isTypeFavorite,
  car,
  setFavorite,
  favorites,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(setFavorite || false);
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [carFavorite, setCarFavorite] = useState<IDataProps>();
  const dispatch = useDispatch();

  const [isLoadingAddFavorites, setisLoadingAddFavorites] = useState(false);

  useEffect(() => {
    favorites?.map((carDb) => {
      if (carDb.model.toLowerCase() === car.model.toLowerCase()) {
        setIsFavorite(true);
        setCarFavorite(carDb);
      }
    });
  }, [car.model, favorites]);

  const addFavoriteCarBD = async () => {
    setisLoadingAddFavorites(true);
    const ref = collection(db, "Favorites");
    await addDoc(ref, {
      model: car.model,
      autoMaker: car.autoMaker,
      amount: car.amount,
      typeFuel: car.typeFuel,
      category: car.category,
      img: car.img,
      seats: car.seats,
      gear: car.gear,
      userId: user?.id,
    }).then((doc) => {
      let data = {
        model: car.model,
        autoMaker: car.autoMaker,
        amount: car.amount,
        typeFuel: car.typeFuel,
        category: car.category,
        img: car.img,
        seats: car.seats,
        gear: car.gear,
        userId: user?.id,
        id: doc.id,
      };

      dispatch(addFavoriteCar(data));
      setCarFavorite(data);
      setisLoadingAddFavorites(false);
    });
  };

  const removeFavoriteCarBD = async () => {
    if (!carFavorite?.id) {
      return;
    } else {
      await deleteDoc(doc(db, "Favorites", carFavorite.id)).then((doc) => {
        try {
          dispatch(removeFavoriteCar(car));
          setisLoadingAddFavorites(false);
        } catch {}
      });
    }
  };

  const handleIcon = () => {
    if (!isLoadingAddFavorites) {
      setisLoadingAddFavorites(true);
      setIsFavorite((prevState) => {
        if (!prevState) {
          addFavoriteCarBD();
        } else {
          removeFavoriteCarBD();
        }

        return !prevState;
      });
    } else {
      console.log("Não Fez");
    }
  };

  return (
    <Container width={width}>
      {!car.img ? (
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
                {car.autoMaker + " "}
                {car.model}
              </Card.Title>
              {isTypeFavorite ?? isLoadingAddFavorites ? (
                <IconHeaderFavoriteContainer
                  typeCursor={isLoadingAddFavorites ? "not-allowed" : "Pointer"}
                >
                  <Spinner animation="border" variant="secondary" size="sm" />
                </IconHeaderFavoriteContainer>
              ) : (
                <IconHeaderFavoriteContainer onClick={handleIcon}>
                  {isFavorite ? (
                    <MdFavorite size={20} color="red" />
                  ) : (
                    <MdFavoriteBorder size={20} color="white" />
                  )}
                </IconHeaderFavoriteContainer>
              )}
            </ContentHeader>
          </Card.Header>
          <CardContent>
            <ImageContent>
              <Image src={car.img} alt={car.amount} layout="fill" />
            </ImageContent>
          </CardContent>

          <Card.Footer className="cardFooter">
            <ContentFooter>
              <SideLeftContentFooter>
                {car.seats ? (
                  <Seats>
                    <FaUser size={18} color={theme.palette.text.primary} />
                    <p>{car.seats}</p>
                  </Seats>
                ) : (
                  ""
                )}

                {car.gear ? (
                  <Gears>
                    <GiGearStickPattern
                      size={18}
                      color={theme.palette.text.primary}
                    />
                    <strong>{car.gear == "automatico" ? "A" : "M"}</strong>
                  </Gears>
                ) : (
                  ""
                )}
              </SideLeftContentFooter>

              {car.amount ? (
                <Amount>
                  <p>R$ </p>

                  <strong>{car.amount}</strong>
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
