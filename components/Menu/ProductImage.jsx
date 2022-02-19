import React, { useState } from "react";
import {
	Flex,
	Image,
	Skeleton,
	Box,
	Text,
	HStack,
	VStack,
	useColorModeValue,
	useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const ProductImage = ({ item }) => {
	const MotionBox = motion(Box);
	const MotionImage = motion(Image);

	const slides = item.images.map((image) => image.imageURL);
	const arrowStyles = {
		cursor: "pointer",
		pos: "absolute",
		top: "50%",
		w: "auto",
		mt: "-22px",
		p: "16px",
		color: "white",
		fontWeight: "bold",
		fontSize: "18px",
		transition: "0.6s ease",
		borderRadius: "0 3px 3px 0",
		userSelect: "none",
		_hover: {
			opacity: 0.8,
			bg: "black",
		},
	};

	const [currentSlide, setCurrentSlide] = useState(0);

	const slidesCount = slides.length;

	const prevSlide = () => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	};
	const nextSlide = () => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	};
	const setSlide = (slide) => {
		setCurrentSlide(slide);
	};
	const carouselStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};

	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<VStack>
			<Flex w="full" overflow="hidden" pos="relative">
				<Flex h="400px" w="full" {...carouselStyle}>
					{slides.map((slide, sid) => (
						<Box
							key={`slide-${sid}`}
							boxSize="full"
							shadow="md"
							flex="none"
						>
							<Text
								color="white"
								fontSize="xs"
								p="8px 12px"
								pos="absolute"
								top="0"
							>
								{sid + 1} / {slidesCount}
							</Text>
							<Image
								alt={item.menuname}
								src={slide}
								boxSize="full"
								fit="cover"
								bgPos={"center"}
								borderRadius="lg"
							/>
						</Box>
					))}
				</Flex>
				{slides.length > 1 && (
					<>
						<Text {...arrowStyles} left="0" onClick={prevSlide}>
							&#10094;
						</Text>
						<Text {...arrowStyles} right="0" onClick={nextSlide}>
							&#10095;
						</Text>
					</>
				)}
			</Flex>
			<HStack
				//TODO: Justifying the overflowing div
				//TODO: Current Wraparound is using too many conditions
				//TODO: Optional: The selected image should be at the center
				justify={
					isMobile
						? slides.length < 4 && "center"
						: slides.length < 5 && "center"
				}
				py={4}
				spacing={4}
				w={"full"}
				overflowX={"scroll"}
				css={{
					"&::-webkit-scrollbar": {
						width: "2px",
						height: "8px",
					},
					"&::-webkit-scrollbar-track": {
						width: "4px",
						height: "10px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#A0AEC0",
						borderRadius: "24px",
					},
				}}
			>
				{slides.map((slide, index) => {
					return (
						<MotionBox
							borderWidth={"5px"}
							borderColor={"transparent"}
							whileTap={{ scale: 0.9 }}
							animate={
								currentSlide === index
									? { scale: 1.15 }
									: { scale: 1 }
							}
							key={`dots-${index}`}
							borderRadius="5px"
						>
							<MotionImage
								minW={"100px"}
								minH={"100px"}
								maxW={"100px"}
								maxH={"100px"}
								alt={item.menuname}
								src={slide}
								boxSize="full"
								fit="cover"
								bgPos={"center"}
								cursor="pointer"
								borderRadius={"lg"}
								onClick={() => setSlide(index)}
							/>
						</MotionBox>
					);
				})}
			</HStack>
		</VStack>
	);
};

export default ProductImage;
