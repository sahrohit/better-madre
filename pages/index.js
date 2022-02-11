import Features from "@components/Home/Features";
import Footer from "@components/shared/Footer";
import { Navbar } from "@components/Navbar";
import OpenGraphHead from "@components/shared/OpenGraphHead";
import Banner from "@components/Home/Banner";
// import {
// 	motion,
// 	useViewportScroll,
// 	useSpring,
// 	useTransform,
// } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Box, Stat, useColorModeValue } from "@chakra-ui/react";
import Stats from "@components/Home/Stats";
import FadeInWhenVisible from "@components/shared/FadeWhenVisible";

const Home = () => {
	// const [isComplete, setIsComplete] = useState(false);
	// const { scrollYProgress } = useViewportScroll();
	// const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
	// const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

	// console.log("ScrollYProgress", scrollYProgress);
	// console.log("yRange", yRange);
	// console.log("path Length", pathLength);

	// const progressColor = useColorModeValue("#3F72AF", "#30E3CA");

	return (
		<>
			<OpenGraphHead />

			{/* <NavBar /> */}

			<Navbar position="sticky" />

			{/* <Box
				height={100}
				width={100}
				position="fixed"
				bottom={0}
				right={0}
				zIndex={500}
			>
				<svg className="progress-icon" viewBox="0 0 60 60">
					<motion.path
						fill="none"
						strokeWidth="5"
						stroke={progressColor}
						strokeDasharray="0 1"
						d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
						style={{
							pathLength,
							rotate: 90,
							translateX: 5,
							translateY: 5,
							scaleX: -1, // Reverse direction of line animation
						}}
					/>
					<motion.path
						fill="none"
						strokeWidth="5"
						stroke={progressColor}
						d="M14,26 L 22,33 L 35,16"
						initial={false}
						strokeDasharray="0 1"
						animate={{ pathLength: isComplete ? 1 : 0 }}
					/>
				</svg>
			</Box> */}

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
