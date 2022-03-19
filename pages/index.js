import { Navbar } from "@components/Navbar";
import Banner from "@components/Home/Banner";
import FadeInWhenVisible from "@components/shared/FadeWhenVisible";
import dynamic from "next/dynamic";

const Stats = dynamic(() => import("@components/Home/Stats"));
const Features = dynamic(() => import("@components/Home/Features"));
const Footer = dynamic(() => import("@components/shared/Footer"));

const Home = () => {
	return (
		<>
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
