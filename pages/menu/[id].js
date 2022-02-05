import React from "react";
import {
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	List,
	ListItem,
	Skeleton,
	HStack,
	Icon,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { nanoid } from "nanoid";

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	return { props: { id } };
};

export const getStaticPaths = async () => {
	const querySnapshot = await getDocs(collection(db, "menu"));
	const paths = querySnapshot.docs.map((doc) => {
		return {
			params: { id: doc.id },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export default function Simple({ id }) {
	const [item, setItem] = useState(null);

	useEffect(
		() =>
			onSnapshot(doc(db, "menu", id), (doc) => {
				setItem(doc.data());
			}),
		[id]
	);

	return (
		<>
			<Navbar />
			<Container maxW={"7xl"}>
				<SimpleGrid
					columns={{ base: 1, lg: 2 }}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 18, md: 24 }}
				>
					<Flex>
						{item ? (
							<Image
								rounded={"md"}
								alt={"product image"}
								src={item.images[0]}
								fit={"cover"}
								align={"center"}
								w={"100%"}
								h={{ base: "100%", sm: "400px", lg: "500px" }}
							/>
						) : (
							<Skeleton
								w={"100%"}
								h={{ base: "100%", sm: "400px", lg: "500px" }}
							/>
						)}
					</Flex>
					<Stack spacing={{ base: 6, md: 10 }}>
						<HStack as={"header"} justifyContent={"space-between"}>
							<VStack align={"left"}>
								{item ? (
									<Heading
										lineHeight={1.1}
										fontWeight={600}
										fontSize={{
											base: "2xl",
											sm: "4xl",
											lg: "5xl",
										}}
									>
										{item.menuname}
									</Heading>
								) : (
									<Skeleton height="3.2rem" />
								)}
								<Box
									color={useColorModeValue(
										"gray.900",
										"gray.400"
									)}
								>
									{item ? (
										<Text fontWeight={300} fontSize={"2xl"}>
											{`रू ${(item.price / 100).toFixed(
												2
											)}`}
										</Text>
									) : (
										<Skeleton
											mt={2}
											height="1.5rem"
											width="40%"
										/>
									)}
								</Box>
							</VStack>
							<Box>
								<Icon
									mr={12}
									as={AiOutlineShoppingCart}
									w={12}
									h={12}
								/>
							</Box>
						</HStack>

						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={"column"}
							divider={
								<StackDivider
									borderColor={useColorModeValue(
										"gray.200",
										"gray.600"
									)}
								/>
							}
						>
							<VStack spacing={{ base: 4, sm: 6 }}>
								<Box
									color={useColorModeValue(
										"gray.500",
										"gray.400"
									)}
								>
									{item ? (
										<Text
											fontSize={"2xl"}
											fontWeight={"300"}
										>
											{item.description}
										</Text>
									) : (
										<Stack>
											<Skeleton height="20px" />
											<Skeleton height="20px" />
											<Skeleton height="20px" />
										</Stack>
									)}
								</Box>
								{item ? (
									<Text fontSize={"lg"}>{item.recipe}</Text>
								) : (
									<Stack>
										<Skeleton height="20px" />
										<Skeleton height="20px" />
										<Skeleton height="20px" />
									</Stack>
								)}
							</VStack>
							<Box>
								<Text
									fontSize={{ base: "16px", lg: "18px" }}
									color={useColorModeValue(
										"yellow.500",
										"yellow.300"
									)}
									fontWeight={"500"}
									textTransform={"uppercase"}
									mb={"4"}
								>
									Features
								</Text>

								<SimpleGrid
									as={List}
									columns={{ base: 1, md: 2 }}
									spacing={2}
								>
									{item
										? item.features.map((detail) => {
												return (
													<ListItem key={nanoid()}>
														{detail}
													</ListItem>
												);
										  })
										: Array(6)
												.fill("")
												.map((_, i) => (
													<Skeleton
														key={nanoid()}
														height="20px"
													/>
												))}
								</SimpleGrid>
							</Box>
							<Box>
								<Text
									fontSize={{ base: "16px", lg: "18px" }}
									color={useColorModeValue(
										"yellow.500",
										"yellow.300"
									)}
									fontWeight={"500"}
									textTransform={"uppercase"}
									mb={"4"}
								>
									Product Details
								</Text>

								<List spacing={2}>
									{item &&
										Object.keys(item.productDetails).map(
											(key, index) => {
												return (
													<ListItem key={nanoid()}>
														<Text
															as={"span"}
															fontWeight={"bold"}
														>
															{`${key}:`}
														</Text>{" "}
														{index}
													</ListItem>
												);
											}
										)}
								</List>
							</Box>
						</Stack>

						<Button
							rounded={"none"}
							w={"full"}
							mt={8}
							size={"lg"}
							py={"7"}
							bg={useColorModeValue("gray.900", "gray.50")}
							color={useColorModeValue("white", "gray.900")}
							textTransform={"uppercase"}
							_hover={{
								transform: "translateY(2px)",
								boxShadow: "lg",
							}}
						>
							Add to cart
						</Button>

						<Stack
							direction="row"
							alignItems="center"
							justifyContent={"center"}
						>
							<MdLocalShipping />
							<Text>2-3 business days delivery</Text>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Container>
			<Footer />
		</>
	);
}
