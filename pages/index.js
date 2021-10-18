import Features from "../components/Home/Features";
import Footer from "../components/shared/Footer";
import Navbar from "../components/Navbar";
import OpenGraphHead from "../components/shared/OpenGraphHead";

const Home = () => {
  return (
    <>
      <OpenGraphHead />

      <Navbar isFixed={true} />

      <Features />

      <Footer />
    </>
  );
};

export default Home;
