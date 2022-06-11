import type { NextPage } from "next";
import Head from "next/head";

import { ThemeProvider as ThemeProviderMUI } from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";

import darkThemeMUI from "../styles/themes/MUIThemes/dark";

import PageServices from "./PageServices";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rental Car</title>
      </Head>

      <ThemeProviderMUI theme={darkThemeMUI}>
        <PageServices />
      </ThemeProviderMUI>
    </div>
  );
};

export default Home;
