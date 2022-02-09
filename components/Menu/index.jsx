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

const Menu = () => {
	const { menuItems, categories, cusines } = useMenu();

	const [sliderValue, setSliderValue] = useState([0, 10000]);
	const [showCategories, setShowCategories] = useState(
		Array.from(categories)
	);
	const [showCusines, setShowCusines] = useState(Array.from(cusines));

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
			showCategories.includes(item.category) &&
			showCusines.includes(item.cusine)
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

				<SimpleGrid
					m={{ base: "auto", md: "50" }}
					spacing={50}
					columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
				>
					{menuItems
						? menuItems.map((item) => {
								if (optionValidator(item)) {
									return (
										<MenuCard key={item._id} {...item} />
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
				</SimpleGrid>
			</Flex>
		</>
	);
};

export default Menu;
