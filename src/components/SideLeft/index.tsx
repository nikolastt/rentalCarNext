import React from "react";
import CarSeats from "../CarSeats";
import FilterByCategoryCollapse from "../FilterByCategoryCollapse";

interface ISideLeftProps {
  isTypeFavorite: boolean;
}

const SideLeft: React.FC<ISideLeftProps> = ({ isTypeFavorite }) => {
  return (
    <div className="w-full h-full rounded-[1.5rem] p-[1rem] bg-gradient-to-br from-[#101010] to-primary-500/20 shadow   ">
      <p className="font-bold">Filtrar 🎯 </p>
      <hr />
      <FilterByCategoryCollapse isTypeFavorite={isTypeFavorite} />
      <CarSeats isTypeFavorite={isTypeFavorite} />
    </div>
  );
};

export default SideLeft;
