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
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useUser } from "@contexts/UserContext";
import { useMenu } from "@contexts/MenuContext";
import ProductImage from "./ProductImage";

const ProductPage = ({ id }) => {
	const { addToCart } = useUser();
	const { menuItems } = useMenu();
	const item = menuItems.find((item) => item.menuId === id);

	return (
		<Container maxW={"7xl"}>
			<SimpleGrid
				columns={{ base: 1, lg: 2 }}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 18, md: 24 }}
			>
				<ProductImage item={item} />
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
										{`रू ${(item.price / 100).toFixed(2)}`}
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
										textAlign={"justify"}
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
								onClick={() =>
									addToCart(
										item.menuId,
										item.menuname,
										item.price
									)
								}
							>
								Add to cart
							</Button>
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
								Recipe / Ingridients
							</Text>

							<SimpleGrid
								as={List}
								columns={{ base: 1, md: 2 }}
								spacing={2}
							>
								{item
									? item.recipe.map((detail, index) => {
											return (
												<ListItem key={nanoid()}>
													{`${index + 1}. ${detail}`}
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
					</Stack>
				</Stack>
			</SimpleGrid>
		</Container>
	);
};

export default ProductPage;
