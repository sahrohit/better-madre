import {
	SimpleGrid,
	Flex,
	Box,
	SkeletonText,
	Skeleton,
	Heading,
	useBreakpointValue,
} from "@chakra-ui/react";
import MenuCard from "./MenuCard";
import { useMenu } from "@contexts/MenuContext";
import { useState } from "react";
import MenuOption from "./MenuOption";
import MobileMenuOption from "./MobileMenuOption";
import SearchBar from "@components/shared/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import { staggerParent } from "@config/animations";

const Menu = () => {
	const MotionSimpleGrid = motion(SimpleGrid);
	const { menuItems } = useMenu();
	const [sliderValue, setSliderValue] = useState([0, 10000]);
	const [showCategories, setShowCategories] = useState([]);
	const [showCusines, setShowCusines] = useState([]);

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
		lg: false,
		xl: false,
	});

	const optionValidator = (item) => {
		if (
			item.price >= sliderValue[0] * 100 &&
			item.price <= sliderValue[1] * 100 &&
			(showCategories.length == 0 ||
				showCategories.includes(item.category)) &&
			(showCusines.length == 0 || showCusines.includes(item.cusine))
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<Heading
				textAlign={"center"}
				fontSize={"7xl"}
				py={5}
				fontWeight={"light"}
				fontFamily={"'Parisienne', sans-serif"}
			>
				Menu
			</Heading>
			<Flex
				boxShadow={"md"}
				borderRadius={"lg"}
				mx={"auto"}
				w={isMobile ? "95%" : "600px"}
				my={2}
			>
				<SearchBar />
			</Flex>
			<Flex direction={{ base: "column", md: "row" }}>
				{isMobile ? (
					<MobileMenuOption
						sliderValue={sliderValue}
						setSliderValue={setSliderValue}
						showCategories={showCategories}
						showCusines={showCusines}
						setShowCategories={setShowCategories}
						setShowCusines={setShowCusines}
					/>
				) : (
					<Box
						flexDirection="column"
						display={{
							base: "none",
							md: "flex",
							lg: "flex",
							xl: "flex",
						}}
					>
						<Box
							maxW="300"
							w="350px"
							margin={25}
							padding={50}
							shadow="lg"
							rounded="lg"
							position={"sticky"}
							top={10}
						>
							<MenuOption
								sliderValue={sliderValue}
								setSliderValue={setSliderValue}
								showCategories={showCategories}
								showCusines={showCusines}
								setShowCategories={setShowCategories}
								setShowCusines={setShowCusines}
							/>
						</Box>
					</Box>
				)}

				<AnimatePresence>
					<MotionSimpleGrid
						// w={"full"}
						// mx={{ base: "auto", md: 50 }}
						// my={50}
						// spacing={50}
						// minChildWidth="300px"
						variants={staggerParent}
						initial="hidden"
						animate="visible"
						m={{ base: "auto", md: "50" }}
						spacing={50}
						columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
					>
						{menuItems
							? menuItems.map((item) => {
									if (optionValidator(item)) {
										return (
											<MenuCard
												key={item._id}
												{...item}
											/>
										);
									}
							  })
							: Array(12)
									.fill("")
									.map((_, i) => {
										return (
											<Box
												key={i}
												borderWidth="1px"
												rounded="lg"
												shadow="lg"
												bg="white"
												w="300px"
											>
												<Skeleton height="200px" />
												<SkeletonText
													padding={6}
													noOfLines={4}
													spacing="4"
												/>
											</Box>
										);
									})}
					</MotionSimpleGrid>
				</AnimatePresence>
			</Flex>
		</>
	);
};

export default Menu;
