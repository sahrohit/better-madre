import React from "react";
import {
	Box,
	chakra,
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
	VisuallyHidden,
	List,
	ListItem,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import { useState, useEffect } from "react";

export const getStaticProps = async ({ params }) => {
	const { id } = params;

	return { props: { id } };
};

export const getStaticPaths = async () => {
	const res = await fetch("https://foodbukka.herokuapp.com/api/v1/menu");
	const data = await res.json();

	const paths = data.Result.map((item) => {
		return {
			params: { id: item._id },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export default function Simple({ id }) {
	const [item, setItem] = useState(null);

	useEffect(() => {
		setTimeout(async () => {
			const res = await fetch(
				`https://foodbukka.herokuapp.com/api/v1/menu/${id}`
			);
			const data = await res.json();
			setItem(data.Result);
		}, 2000);
	});

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
								src={item.images[1]}
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
						<Box as={"header"}>
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
								<Skeleton height="2rem" />
							)}

							<Text
								color={useColorModeValue(
									"gray.900",
									"gray.400"
								)}
								fontWeight={300}
								fontSize={"2xl"}
							>
								{item ? (
									"$350.00 USD"
								) : (
									<Skeleton height="1.5rem" width="40%" />
								)}
							</Text>
						</Box>

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
								<Text
									color={useColorModeValue(
										"gray.500",
										"gray.400"
									)}
									fontSize={"2xl"}
									fontWeight={"300"}
								>
									{item ? (
										item.description
									) : (
										<Stack>
											<Skeleton height="20px" />
											<Skeleton height="20px" />
											<Skeleton height="20px" />
										</Stack>
									)}
								</Text>
								<Text fontSize={"lg"}>
									{item ? (
										`Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Ad aliquid amet at
										delectus doloribus dolorum expedita hic,
										ipsum maxime modi nam officiis porro, quae,
										quisquam quos reprehenderit velit? Natus,
										totam.`
									) : (
										<Stack>
											<Skeleton height="20px" />
											<Skeleton height="20px" />
											<Skeleton height="20px" />
										</Stack>
									)}
								</Text>
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
									columns={{ base: 1, md: 2 }}
									spacing={10}
								>
									<List spacing={2}>
										<ListItem>Chronograph</ListItem>
										<ListItem>
											Master Chronometer Certified
										</ListItem>{" "}
										<ListItem>Tachymeter</ListItem>
									</List>
									<List spacing={2}>
										<ListItem>Anti‑magnetic</ListItem>
										<ListItem>Chronometer</ListItem>
										<ListItem>Small seconds</ListItem>
									</List>
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
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Between lugs:
										</Text>{" "}
										20 mm
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Bracelet:
										</Text>{" "}
										leather strap
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Case:
										</Text>{" "}
										Steel
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Case diameter:
										</Text>{" "}
										42 mm
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Dial color:
										</Text>{" "}
										Black
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Crystal:
										</Text>{" "}
										Domed, scratch‑resistant sapphire
										crystal with anti‑reflective treatment
										inside
									</ListItem>
									<ListItem>
										<Text as={"span"} fontWeight={"bold"}>
											Water resistance:
										</Text>{" "}
										5 bar (50 metres / 167 feet){" "}
									</ListItem>
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
