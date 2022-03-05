import Link from "next/link";
import { memo, useState } from "react";
import { useColorMode, Image, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { simpleOpacity } from "@config/animations";
import { ThemeMode, mobileBreakpointsMap } from "@config/theme";

import styles from "./styles.module.css";

const Logo = () => {
	const { colorMode } = useColorMode();
	const [isLogoLoaded, setLogoLoaded] = useState(false);
	const MotionImage = motion(Image);
	const isMobile = useBreakpointValue(mobileBreakpointsMap);
	return (
		<AnimatePresence>
			<Link href="/" passHref>
				{colorMode === ThemeMode.Dark ? (
					<MotionImage
						className={!isMobile ? styles.logo : ""}
						width={"100px"}
						height={"50px"}
						objectFit="contain"
						src="/Madre_dark.svg"
						alt="Madre Logo"
						fallbackSrc="/Madre_dark.svg"
						variants={simpleOpacity}
						initial="initial"
						animate={isLogoLoaded && "animate"}
						onLoad={() => setLogoLoaded(true)}
						zIndex={2}
					/>
				) : (
					<MotionImage
						className={!isMobile ? styles.logo : ""}
						width={"100px"}
						height={"50px"}
						objectFit="contain"
						src="/Madre_light.svg"
						fallbackSrc="/Madre_light.svg"
						alt="Madre Logo"
						variants={simpleOpacity}
						initial="initial"
						animate={isLogoLoaded && "animate"}
						onLoad={() => setLogoLoaded(true)}
						zIndex={2}
					/>
				)}
			</Link>
		</AnimatePresence>
	);
};

export default memo(Logo);
