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
import { BiExit } from "react-icons/bi";
import { useRouter } from "next/router";
import ItemMenuSideBar from "../ItemMenuSideBar";
import { IUserProps } from "../../pages/Booking";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const ResponsiveAppBar: React.FC = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const { data: session } = useSession();

  return (
    <>
      <div className=" h-[79px] items-center hidden lg:flex container">
        <div className="text-3xl text-primary-500">10Loca</div>

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
          <Link href="/" passHref>
            <div className="text-3xl text-primary-500 font-[lora] font-semibold cursor-pointer">
              10Loca
            </div>
          </Link>

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

        {!session ? (
          <div className="mt-24">
            <button
              onClick={() => signIn("google")}
              className="py-2 mx-auto flex justify-between px-6 border border-primary-500 rounded-md w-3/4 shadow-lg shadow-primary-500/50"
            >
              Login com <FcGoogle size={25} />
            </button>
          </div>
        ) : (
          <div className="flex pl-6 mt-24 items-center">
            <div className="min-w-[76px] h-[76px] bg-primary-500  rounded-full flex justify-center items-center">
              <div className="min-w-[70px] h-[70px] relative rounded-full  overflow-hidden">
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    layout="fill"
                    priority
                  />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-white pl-3   flex flex-col flex-wrap">
                {session?.user?.name && "Olá,"}
                <br />
                <span className="font-bold">{session?.user?.name}</span>
              </span>
            </div>
          </div>
        )}

        <div className="mt-12 space-y-6">
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

          <ItemMenuSideBar
            content="Sair"
            onClick={() => signOut()}
            href="/"
            closeMenu={() => setMenuIsOpen(!menuIsOpen)}
          >
            <BiExit size={25} className="mx-3" />
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
