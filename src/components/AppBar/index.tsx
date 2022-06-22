import Link from "next/link";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { signIn, signOut, useSession } from "next-auth/react";

import { AiFillGithub } from "react-icons/ai";
import { GetStaticProps } from "next";
import { Router, useRouter } from "next/router";

const pages = [
  { name: "Home", path: "/" },
  { name: "Veículos", path: "/Booking" },
  { name: "Meus Favoritos", path: "/Favorites" },
  { name: "Adicionar Veículo", path: "/AddVeicle" },
];
const settings = ["Perfil", "Carros alugados", "Sair"];

const ResponsiveAppBar = () => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const manageSettingsOptions = (option: string) => {
    if (option === "Sair") {
      handleCloseUserMenu();
      signOut();
    }

    if (option === "Perfil") {
      handleCloseUserMenu();
      router.push(`/Profile`);
    }

    if (option === "Carros alugados") {
      handleCloseUserMenu();
      router.push(`/RentedCars`);
    }
  };

  const { data: session } = useSession();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "none", mb: "1.5rem" }}
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Lora",
              fontWeight: 900,
              letterSpacing: ".3rem",
              color: "primary.main",
              textDecoration: "none",

              "&:hover": {
                color: "primary.main",
                filter: "brightness(0.8)",
              },
            }}
          >
            10Loca
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".3rem",
              color: "primary.main",
              textDecoration: "none",

              "&:hover": {
                color: "primary.main",
                filter: "brightness(0.8)",
              },
            }}
          >
            Perfect Wheels
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mr: "1rem", color: "white", display: "block" }}
              >
                <Link
                  href={page.path}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {session ? (
              <Tooltip title="Abrir configurações do perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={session?.user?.name?.toString()}
                    src={session.user?.image?.toString()}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => signIn()}
              >
                login com
                <AiFillGithub size={30} style={{ marginLeft: "1rem" }} />
              </Button>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => manageSettingsOptions(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
