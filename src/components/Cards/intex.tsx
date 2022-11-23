import React, { HTMLAttributes, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { ICarProps } from "../../redux/carsSlice";
import Image from "next/image";
import Link from "next/link";
import {
  addFavoriteCarBd,
  removeFavoriteCarBd,
} from "../../services/handleDocsFirebase";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  userId?: string;
  width?: string;
  isTypeFavorite?: boolean;
  car: ICarProps;
  setFavorite?: boolean;
  favorites?: IDataProps[];
  isTypeAddCar?: boolean;
  isTypeCarrosel: boolean;
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
  isTypeFavorite,
  car,
  setFavorite,
  favorites,
  isTypeAddCar,
  userId,
  isTypeCarrosel,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(setFavorite || false);
  const [isLoadingAddFavorites, setisLoadingAddFavorites] = useState(false);

  useEffect(() => {
    favorites?.map((carDb) => {
      if (carDb.model.toLowerCase() === car.model.toLowerCase()) {
        setIsFavorite(true);
      }
    });
  }, [car.model, favorites]);

  const addFavoriteCarBD = async () => {
    await addFavoriteCarBd(userId as string, car);
    setisLoadingAddFavorites(false);
  };

  const removeFavoriteCarBD = async () => {
    await removeFavoriteCarBd(userId as string, car);
  };

  function handleIcon() {
    setIsFavorite((prevState) => {
      if (!prevState) {
        addFavoriteCarBD();
      } else {
        removeFavoriteCarBD();
      }
      return !prevState;
    });
  }

  return (
    <div className="w-full h-[250px] ">
      <div
        className={` ${
          isTypeCarrosel ? "h-[75%]" : "h-full"
        }   w-full rounded-lg border-[1px] border-solid border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/20 shadow-lg p-3 cursor-pointer`}
      >
        <div className="h-[15%] bg-transparent">
          <div className="flex">
            <Link href={`/infoVeicle/${car.id}`} passHref>
              <div className="">
                {car.autoMaker + " "}
                {car.model}
              </div>
            </Link>

            {isLoadingAddFavorites ? (
              <div
                className={`ml-auto ${
                  isLoadingAddFavorites ? "cursor-not-allowed" : "cursor-poiter"
                }`}
              >
                <Spinner animation="border" variant="secondary" size="sm" />
              </div>
            ) : (
              isTypeFavorite ?? (
                <div
                  className={`ml-auto ${
                    isLoadingAddFavorites
                      ? "cursor-not-allowed"
                      : "cursor-poiter"
                  }`}
                >
                  {isFavorite ? (
                    <MdFavorite
                      size={20}
                      color="red"
                      onClick={() => handleIcon()}
                    />
                  ) : (
                    <MdFavoriteBorder
                      size={20}
                      color="white"
                      onClick={() => handleIcon()}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
        <Link href={`/infoVeicle/${car.id}`} passHref>
          <div className="w-full h-3/4 flex justify-center items-center">
            <div className="w-3/4 h-[90%] max-w-[250px] relative">
              {isTypeAddCar ? (
                <img src={car.img} alt={car.amount} />
              ) : (
                <Image src={car.img} alt={car.amount} layout="fill" />
              )}
            </div>
          </div>
        </Link>
        <Link href={`/infoVeicle/${car.id}`} passHref>
          <div className=" h-[15%] ">
            <div className="flex">
              <div className="w-[60%] flex">
                {car.seats ? (
                  <div className="w-[30%] flex mr-[1rem] ">
                    <FaUser size={18} className="text-primary-500" />
                    <p className="ml-[0.5rem]">{car.seats}</p>
                  </div>
                ) : (
                  ""
                )}

                {car.gear ? (
                  <div className="w-[30%] flex ">
                    <GiGearStickPattern
                      className="text-primary-500"
                      size={18}
                    />
                    <strong className="ml-[0.5rem]">
                      {car.gear == "automatico" ? "A" : "M"}
                    </strong>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {car.amount ? (
                <div className="w-[40%] ml-auto flex items-start justify-end ">
                  <p>R$ </p>

                  <strong className="ml-[0.5rem]">{car.amount}</strong>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
