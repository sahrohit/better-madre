import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	Image,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
// import Image from "next/image";
import {
	motion,
	useViewportScroll,
	useSpring,
	useTransform,
	AnimatePresence,
} from "framer-motion";

const Banner = (props) => {
	const isMobile = useBreakpointValue({
		base: true,
		md: true,
		lg: false,
		xl: false,
	});

	const MotionImage = motion(Image);
	const [isLogoLoaded, setLogoLoaded] = useState(false);
	const { scrollYProgress } = useViewportScroll();
	const yRange = useTransform(scrollYProgress, (latest) => {
		return latest * (isMobile ? 1200 : 300);
	});
	const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

	const variants = {
		initial: {
			y: 0,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			rotate: pathLength,
			transition: {
				duration: 0.5,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
	};

	return (
		<Flex
			align="center"
			justify={{
				base: "center",
				md: "space-around",
				xl: "space-between",
			}}
			direction={{ base: "column-reverse", md: "row" }}
			wrap="wrap"
			minH="70vh"
			px={8}
			mb={16}
			{...props}
		>
			<Stack
				spacing={4}
				w={{ base: "80%", md: "40%" }}
				align={["center", "center", "flex-start", "flex-start"]}
				mx="auto"
			>
				<Heading
					as="h1"
					size="xl"
					fontWeight="bold"
					color="primary.800"
					textAlign={["center", "center", "left", "left"]}
				>
					Madre, where something delicious is always cooking.
				</Heading>
				<Heading
					as="h2"
					size="md"
					color="primary.800"
					opacity="0.8"
					fontWeight="normal"
					lineHeight={1.5}
					textAlign={["center", "center", "left", "left"]}
				>
					The restaurant chain, that focuses on customer <br />{" "}
					experience and quality food.
				</Heading>
				<Link href="/menu" passHref>
					<Button
						variant="outline"
						borderRadius="8px"
						py="4"
						px="4"
						lineHeight="1"
						size="md"
					>
						Order Now
					</Button>
				</Link>
				{/* <Text
					fontSize="xs"
					mt={2}
					textAlign="center"
					color="primary.800"
					opacity="0.6"
				>
					No credit card required.
				</Text> */}
			</Stack>
			<Box
				w={{ base: "80%", sm: "60%", md: "50%" }}
				mb={{ base: 12, md: 0 }}
				mx="auto"
				overflow={"hidden"}
			>
				<AnimatePresence>
					<MotionImage
						src="/foods/eggs.webp"
						alt="random image"
						layout={`"fill"`}
						variants={variants}
						animate={isLogoLoaded && "animate"}
						onLoad={() => setLogoLoaded(true)}
						style={{ rotate: yRange }}
					/>
				</AnimatePresence>
			</Box>
		</Flex>
	);
};

export default Banner;
