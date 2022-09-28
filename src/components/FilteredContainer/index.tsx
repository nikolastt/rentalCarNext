import React from "react";
import { ICarProps } from "../../redux/carsSlice";
import CarSeats from "../CarSeats";
import FilterByCategoryCollapse from "../FilterByCategoryCollapse";

interface ISideLeftProps {
  cars: ICarProps[];
}

const SideLeft: React.FC<ISideLeftProps> = ({ cars }) => {
  return (
    <div className="w-full h-full rounded-[1.5rem] p-[1rem] bg-gradient-to-br from-[#101010] to-primary-500/20 shadow   ">
      <p className="font-bold">Filtrar 🎯 </p>
      <hr />
      <FilterByCategoryCollapse cars={cars} />
      <CarSeats cars={cars} />
    </div>
  );
};

export default SideLeft;
