import React, { useMemo, useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../../redux/filterByCategorySlice";

interface IFilterByCategoryCollapseProps {
  isTypeFavorite: boolean;
}

const FilterByCategoryCollapse: React.FC<IFilterByCategoryCollapseProps> = ({
  isTypeFavorite,
}) => {
  const [isCollapseUp, setIsCollapseUp] = useState(true);

  if (isTypeFavorite) {
  }
  const cars = useSelector((state: RootState) => {
    if (isTypeFavorite) {
      return state.favoritesSlice.cars;
    } else {
      return state.carsSlice.cars;
    }
  });

  const dispatch = useDispatch();

  const categoryes = useMemo(() => {
    let uniqueCategoryes: string[] = [];
    const categoryes = cars.map((item) => {
      return item.category[0].toUpperCase() + item.category.slice(1);
    });

    categoryes.forEach((item, index) => {
      if (!uniqueCategoryes.includes(item)) {
        uniqueCategoryes.push(item);
      }
    });
    return uniqueCategoryes;
  }, [cars]);

  const numberOfCarsByCategory = useMemo(() => {
    let countSUV = 0;
    let countCompacto = 0;
    let countSedan = 0;
    let countUtilitario = 0;
    let countPicape = 0;
    cars.map((car) => {
      if (car.category === "SUV") {
        countSUV++;
      } else if (car.category.toLowerCase() === "compacto") {
        countCompacto++;
      } else if (car.category.toLowerCase() === "sedan") {
        countSedan++;
      } else if (car.category.toLowerCase() === "utilitario") {
        countUtilitario++;
      } else if (car.category.toLowerCase() === "picape") {
        countPicape++;
      }
    });

    return [
      {
        category: "SUV",
        count: countSUV,
      },
      {
        category: "Compacto",
        count: countCompacto,
      },
      {
        category: "Sedan",
        count: countSedan,
      },
      {
        category: "Utilitario",
        count: countUtilitario,
      },
      {
        category: "Picape",
        count: countPicape,
      },
    ];
  }, [cars]);

  function handleCollapse() {
    setIsCollapseUp(!isCollapseUp);
  }

  return (
    <div className="my-[1rem]">
      <div className="flex cursor-pointer" onClick={() => handleCollapse()}>
        <p className="flex items-center m-0">Car Filter</p>
        <div
          className={`flex items-center transition-all ${
            isCollapseUp ? "" : "rotate-180"
          } ml-auto cursor-pointer`}
        >
          <FcCollapse />
        </div>
      </div>
      {isCollapseUp ? (
        ""
      ) : (
        <div className="flex flex-col p-[1rem]">
          {categoryes.map((item, index) => {
            return (
              <div className="mb-[0.5rem]" key={index}>
                <input
                  className="mr-[0.5rem]"
                  type="checkbox"
                  onChange={(e) => {
                    {
                      e.target.checked === true
                        ? dispatch(addCategory(e.target.name.toLowerCase()))
                        : dispatch(removeCategory(e.target.name.toLowerCase()));
                    }
                  }}
                  name={item}
                />
                <label htmlFor={item}>
                  {item}{" "}
                  {numberOfCarsByCategory.map((obj) => {
                    if (obj.category === item) {
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
  );
};

export default FilterByCategoryCollapse;
