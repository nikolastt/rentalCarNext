import Link from "next/link";
import * as React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCar } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { useRouter } from "next/router";
import ItemMenuSideBar from "../ItemMenuSideBar";

const ResponsiveAppBar = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  return (
    <>
      <div className=" h-[79px] items-center hidden lg:flex container">
        <div>10Loca</div>

        <div className="ml-auto flex">
          <nav className="">
            <ul className="flex space-x-6">
              <div className="">Home</div>
              <div className="">Veículos</div>
              <div className="">Meus Favoritos</div>
              <div className="">Adicionar Veículo</div>
            </ul>
          </nav>

          <div className="ml-6">
            <button>LOGIN COM</button>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full flex h-[79px]  px-3 ">
        <div className="flex relative w-full h-full items-center justify-center ">
          <div className="">10Loca</div>

          {!menuIsOpen && (
            <div className="right-0 absolute ">
              <AiOutlineMenu
                size={25}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 bottom-0 w-[250px] ease-in-out duration-300  bg-secondary-500/80 backdrop-blur-lg z-30 ${
          menuIsOpen ? "mr-0" : "-mr-[250px]"
        }`}
      >
        {menuIsOpen && (
          <AiOutlineClose
            size={25}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="z-30 right-3 top-6 fixed cursor-pointer"
          />
        )}

        <button onClick={() => signIn("github")}>login</button>

        <div className="mt-32 space-y-6">
          <ItemMenuSideBar
            content="Home"
            active={path === "" ? true : false}
            href="/"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <AiOutlineHome size={25} className="mx-3" />
          </ItemMenuSideBar>

          <ItemMenuSideBar
            content="Veículos"
            active={path === "Booking" ? true : false}
            href="/Booking"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <AiOutlineCar size={25} className="mx-3" />
          </ItemMenuSideBar>

          <ItemMenuSideBar
            content="Favoritos"
            active={path === "Favorites" ? true : false}
            href="/Favorites"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <MdFavoriteBorder size={25} className="mx-3" />
          </ItemMenuSideBar>

          <ItemMenuSideBar
            content="Adicionar Veículos"
            active={path === "AddVeicle" ? true : false}
            href="/AddVeicle"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <IoMdAdd size={25} className="mx-3" />
          </ItemMenuSideBar>

          <ItemMenuSideBar
            content="Perfil"
            active={path === "Profile" ? true : false}
            href="/Profile"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <BsPerson size={25} className="mx-3" />
          </ItemMenuSideBar>
        </div>
      </div>

      <div
        className={` ${
          !menuIsOpen && "hidden"
        } fixed left-0 bottom-0 min-w-[calc(100%)] bg-black/75 h-full ease-out duration-300 z-10 lg:hidden`}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      ></div>
    </>
  );
};

export default ResponsiveAppBar;
