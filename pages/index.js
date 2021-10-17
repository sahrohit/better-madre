import Head from "next/head";
import Features from "../components/Home/Features";
import Footer from "../components/shared/Footer";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import OpenGraphHead from "../components/shared/OpenGraphHead";

const Home = () => {
  const paddTop = useBreakpointValue({ base: 0, md: -5, lg: -5, xl: 10 });
  return (
    <>
      <OpenGraphHead />

      <Navbar />

      <Box marginTop={paddTop} />

      <Features />

      <Footer />
    </>
  );
};

export default Home;
