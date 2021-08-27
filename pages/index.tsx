import type { NextPage } from "next";
import Head from "next/head";
import { VerticalSteps } from "../components/steps";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Panelinha Aleatoria</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VerticalSteps />
    </div>
  );
};

export default Home;
