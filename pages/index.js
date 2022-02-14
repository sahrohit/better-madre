import Features from "@components/Home/Features";
import Footer from "@components/shared/Footer";
import { Navbar } from "@components/Navbar";
import OpenGraphHead from "@components/shared/OpenGraphHead";
import Banner from "@components/Home/Banner";
import Stats from "@components/Home/Stats";
import FadeInWhenVisible from "@components/shared/FadeWhenVisible";

const Home = () => {

	return (
		<>
			<OpenGraphHead />

			<Navbar position="sticky" />

			<Banner />

			<FadeInWhenVisible>
				<Stats />
			</FadeInWhenVisible>

			<FadeInWhenVisible>
				<Features />
			</FadeInWhenVisible>

			<FadeInWhenVisible>
				<Footer />
			</FadeInWhenVisible>
		</>
	);
};

export default Home;
