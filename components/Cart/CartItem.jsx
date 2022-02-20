import { useUser } from "@contexts/UserContext";
import {
	Flex,
	Box,
	HStack,
	Heading,
	Text,
	IconButton,
	VStack,
	Stack,
	useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useMenu } from "@contexts/MenuContext";

const CartItem = ({ menuId, menuname, quantity, price, totalPrice }) => {
	const { menuItems } = useMenu();
	const { addToCart, removeFromCart } = useUser();
	const currentMenuItem = menuItems.find((item) => item.menuId === menuId);
	const isMobile = useBreakpointValue({ base: true, sm: false });

	return (
		<Flex shadow="lg" rounded="lg" direction={isMobile && "column"}>
			<Box
				h={isMobile && "200px"}
				w={!isMobile && "200px"}
				bgSize="cover"
				bgPos={"center"}
				rounded="lg"
				style={{
					backgroundImage: `url(${currentMenuItem.images[0].imageURL})`,
				}}
			/>

			<Stack
				w={isMobile ? "full" : 4 / 5}
				p={4}
				direction={{ base: "column", lg: "row" }}
			>
				<VStack align={"left"}>
					<Heading fontSize="2xl" fontWeight="normal">
						{menuname}
					</Heading>

					<Text mt={2} fontSize="sm" noOfLines={2}>
						{currentMenuItem.description}
					</Text>

					<Flex mt={3} justifyContent="space-between">
						<Text color="#318b6c" fontWeight="bold" fontSize="lg">
							रू {price.toFixed(2) / 100}/item
						</Text>
					</Flex>
				</VStack>

				<Stack
					w={"full"}
					alignItems={"flex-end"}
					justifyContent={"space-between"}
					direction={{ base: "row", lg: "column" }}
				>
					<HStack
						flexWrap={"wrap"}
						direction={{
							base: "row",
							md: "row",
							lg: "column",
							xl: "row",
						}}
						minW={"150px"}
						justifyContent={{
							base: "flex-start",
							lg: "flex-end",
						}}
					>
						<Text color="#318b6c" fontWeight="bold" fontSize="lg">
							x {quantity}
						</Text>
						<Text color="#318b6c" fontWeight="normal" fontSize="lg">
							(रू {totalPrice / 100})
						</Text>
					</HStack>

					<HStack spacing={2}>
						<IconButton
							variant="outline"
							colorScheme="green"
							icon={<AddIcon />}
							onClick={() => addToCart(menuId, menuname, price)}
						/>
						<IconButton
							variant="outline"
							colorScheme="red"
							icon={<MinusIcon />}
							onClick={() => removeFromCart(menuId)}
						/>
					</HStack>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default CartItem;
