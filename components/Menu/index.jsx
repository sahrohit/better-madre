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
import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import { BiDollar } from "react-icons/bi";

const data = {
	isNew: true,
	imageURL:
		"https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
	name: "Wayfarer Classic",
	price: 4.5,
	rating: 4.2,
	numReviews: 34,
};

const Menu = () => {
	const [menu, setMenu] = useState(null);

	useEffect(() => {
		const timer = setTimeout(async () => {
			const res = await fetch(
				process.env.NEXT_PUBLIC_FIREBASE_REALTIME_DATABASE_URL
			);
			const data = await res.json();
			setMenu(data["-MuxjT863Vd78kuMGVBc"].menuItems);
		}, 0);
		return () => {
			clearTimeout(timer);
		};
	});

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
					{menu
						? menu.map((item) => {
								return (
									<MenuCard
										key={item._id}
										id={item._id}
										isNew={data.isNew}
										name={item.menuname}
										imageURL={item.images[0]}
										price={data.price}
										rating={data.rating}
										numReviews={data.numReviews}
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
