import {
	SimpleGrid,
	Flex,
	Box,
	SkeletonText,
	Skeleton,
	Heading,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Checkbox,
	CheckboxGroup,
	Stack,
} from "@chakra-ui/react";
import MenuCard from "./MenuCard";
import { BiDollar } from "react-icons/bi";
import { useMenu } from "@contexts/MenuContext";

const Menu = () => {
	const { menuItems } = useMenu();

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
				<Box
					flexDirection="column"
					maxW="350"
					display={{
						base: "none",
						md: "flex",
						lg: "flex",
						xl: "flex",
					}}
					margin={50}
					w="300px"
				>
					<Box h={20}>
						<Heading size="md" fontWeight="thin">
							Price Range
						</Heading>
						<Slider aria-label="slider-ex-4" defaultValue={30}>
							<SliderMark
								value={0}
								mt="1"
								ml="-2.5"
								fontSize="sm"
							>
								रू0
							</SliderMark>
							<SliderMark
								value={100}
								mt="1"
								ml="-2.5"
								fontSize="sm"
							>
								रू1000
							</SliderMark>
							<SliderTrack bg="red.100">
								<SliderFilledTrack bg="tomato" />
							</SliderTrack>
							<SliderThumb boxSize={6}>
								<Box color="tomato" as={BiDollar} />
							</SliderThumb>
						</Slider>
					</Box>

					<Box>
						<Heading size="md" fontWeight="thin">
							Category
						</Heading>
						<CheckboxGroup
							colorScheme="green"
							defaultValue={["naruto", "kakashi"]}
						>
							<Stack spacing={1} direction={["column", "column"]}>
								<Checkbox value="whateverthatis">
									Hors d`oeuvre
								</Checkbox>
								<Checkbox value="soup">Soup</Checkbox>
								<Checkbox value="appetizer">Appetizer</Checkbox>
								<Checkbox value="salad">Salad</Checkbox>
								<Checkbox value="maincourse">
									Maincourse
								</Checkbox>
								<Checkbox value="dessert">Dessert</Checkbox>
								<Checkbox value="mignardise">
									Mignardise
								</Checkbox>
							</Stack>
						</CheckboxGroup>
					</Box>
				</Box>
				<SimpleGrid
					m={50}
					spacing={50}
					columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
				>
					{menuItems
						? menuItems.map((item) => {
								return (
									<MenuCard
										key={item._id}
										id={item.menuId}
										isNew={item.isPopular}
										name={item.menuname}
										imageURL={item.images[0]}
										price={item.price}
										rating={item.rating}
										numReviews={item.numberOfReviews}
									/>
								);
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
