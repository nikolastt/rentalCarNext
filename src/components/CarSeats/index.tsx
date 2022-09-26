import React, { useMemo, useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addCategory, removeCategory } from "../../redux/filterByCategorySlice";

interface ISeatsAmount {
  seats: string;
  count: number;
}

interface ICarSeats {
  isTypeFavorite?: boolean;
}

const CarSeats: React.FC<ICarSeats> = ({ isTypeFavorite }) => {
  const [isCollapseUp, setIsCollapseUp] = useState(true);

  const cars = useSelector((state: RootState) => {
    if (isTypeFavorite) {
      return state.favoritesSlice.cars;
    } else {
      return state.carsSlice.cars;
    }
  });
  const dispatch = useDispatch();

  function handleCollapse() {
    setIsCollapseUp(!isCollapseUp);
  }

  const seats = useMemo(() => {
    let uniqueSeats: string[] = [];
    const seats = cars.map((item) => {
      return item.seats[0].toUpperCase() + item.seats.slice(1);
    });

    seats.forEach((item, index) => {
      if (!uniqueSeats.includes(item)) {
        uniqueSeats.push(item);
      }
    });
    return uniqueSeats;
  }, [cars]);

  const numberOfCarsBySeats = useMemo(() => {
    const seatsAmount: ISeatsAmount[] = [];

    seats.map((seat) => {
      let count = 0;
      let seats = seat;
      cars.map((car) => {
        if (car.seats === seat) {
          count++;
        }
      });
      seatsAmount.push({ seats: seats, count: count });
    });

    return seatsAmount;
  }, [cars]);

  return (
    <>
      <div>
        <div className="flex cursor-pointer" onClick={() => handleCollapse()}>
          <p className="flex items-center m-0">Assentos</p>
          <div
            className={`flex items-center transition-all duration-[.5s] ${
              !isCollapseUp && "rotate-180"
            } ml-auto cursor-pointer`}
          >
            <FcCollapse />
          </div>
        </div>
        {isCollapseUp ? (
          ""
        ) : (
          <div className="flex flex-col p-[1rem]">
            {seats.map((item, index) => {
              return (
                <div className="mb-[0.5rem]" key={index}>
                  <input
                    className="mr-[0.5rem]"
                    type="checkbox"
                    onChange={(e) => {
                      {
                        e.target.checked === true
                          ? dispatch(addCategory(e.target.name.toLowerCase()))
                          : dispatch(
                              removeCategory(e.target.name.toLowerCase())
                            );
                      }
                    }}
                    name={item}
                  />
                  <label htmlFor={item}>
                    {item}{" "}
                    {numberOfCarsBySeats.map((obj) => {
                      if (obj.seats === item) {
                        return ` (${obj.count})`;
                      }
                    })}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CarSeats;
