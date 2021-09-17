import Head from "next/head";
import Features from "../components/Home/Features";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Madre</title>
        <meta
          name="description"
          content="where something delicious is Always Cooking"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <Features />

      <Footer />
    </>
  );
}
