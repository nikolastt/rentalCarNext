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

const pages = [
  { name: "Home", path: "/" },
  { name: "Veículos", path: "/Booking" },
  { name: "Meus Favoritos", path: "/Favorites" },
  { name: "Adicionar Veículo", path: "/AddVeicle" },
];
const settings = ["Perfil", "Carros alugados", "Sair"];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];

  const { data: session } = useSession();

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
        } fixed left-0 bottom-0 min-w-[calc(100%)] backdrop-blur-sm h-full ease-out duration-300 z-10 lg:hidden`}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      ></div>
    </>
    // <AppBar
    //   position="static"
    //   color="transparent"
    //   sx={{ boxShadow: "none", mb: "1.5rem" }}
    //   enableColorOnDark
    // >
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "none", md: "flex" },
    //           fontFamily: "Lora",
    //           fontWeight: 900,
    //           letterSpacing: ".3rem",
    //           color: "primary.main",
    //           textDecoration: "none",

    //           "&:hover": {
    //             color: "primary.main",
    //             filter: "brightness(0.8)",
    //           },
    //         }}
    //       >
    //         10Loca
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           sx={{ color: "text.primary" }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: "bottom",
    //             horizontal: "left",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: "block", md: "none" },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page.name} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page.name}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "flex", md: "none" },
    //           flexGrow: 1,
    //           fontFamily: "monospace",
    //           fontWeight: 900,
    //           letterSpacing: ".3rem",
    //           color: "primary.main",
    //           textDecoration: "none",

    //           "&:hover": {
    //             color: "primary.main",
    //             filter: "brightness(0.8)",
    //           },
    //         }}
    //       >
    //         Perfect Wheels
    //       </Typography>
    //       <Box
    //         sx={{
    //           flexGrow: 1,
    //           display: { xs: "none", md: "flex" },
    //           justifyContent: "flex-end",
    //         }}
    //       >
    //         {pages.map((page) => (
    //           <Button
    //             key={page.name}
    //             onClick={handleCloseNavMenu}
    //             sx={{ my: 2, mr: "1rem", color: "white", display: "block" }}
    //           >
    //             <Link
    //               href={page.path}
    //               style={{ color: "white", textDecoration: "none" }}
    //             >
    //               {page.name}
    //             </Link>
    //           </Button>
    //         ))}
    //       </Box>

    //       <Box sx={{ flexGrow: 0 }}>
    //         {session ? (
    //           <Tooltip title="Abrir configurações do perfil">
    //             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //               <Avatar
    //                 alt={session?.user?.name?.toString()}
    //                 src={session.user?.image?.toString()}
    //               />
    //             </IconButton>
    //           </Tooltip>
    //         ) : (
    //           <Button
    //             variant="outlined"
    //             color="primary"
    //             onClick={() => signIn()}
    //           >
    //             login com
    //             <AiFillGithub size={30} style={{ marginLeft: "1rem" }} />
    //           </Button>
    //         )}

    //         <Menu
    //           sx={{ mt: "45px" }}
    //           id="menu-appbar"
    //           anchorEl={anchorElUser}
    //           anchorOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           open={Boolean(anchorElUser)}
    //           onClose={handleCloseUserMenu}
    //         >
    //           {settings.map((setting) => (
    //             <MenuItem
    //               key={setting}
    //               onClick={() => manageSettingsOptions(setting)}
    //             >
    //               <Typography textAlign="center">{setting}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
};

export default ResponsiveAppBar;
