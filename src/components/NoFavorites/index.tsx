import React from "react";
import { FaRegSadCry } from "react-icons/fa";

import Link from "next/link";

const NoFavorites: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-15rem) flex flex-col items-center justify-center  ]">
      <h3 className="mb-[1.5rem]">Você não tem nenhum carro favoritado</h3>
      <FaRegSadCry size={65} className="text-text-secondary" />

      <Link href="/Booking">
        <button className="mt-6 flex border border-primary-500 py-2 px-12 rounded-md hover:scale-105 ease-in duration-200 w-1/2 justify-center">
          Ir para veículos
        </button>
      </Link>
    </div>
  );
};

export default NoFavorites;
