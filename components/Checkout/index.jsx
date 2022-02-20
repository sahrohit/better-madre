import {
	VStack,
	Radio,
	RadioGroup,
	Stack,
	Tooltip,
	FormControl,
	FormLabel,
	Text,
	useToast,
	Flex,
	SimpleGrid,
	chakra,
	Button,
	useColorModeValue,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Box,
	useBreakpointValue,
	useColorMode,
	HStack,
	Heading,
	ButtonGroup,
} from "@chakra-ui/react";
import { useUser } from "@contexts/UserContext";
import React from "react";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useRouter } from "next/router";
import { EditIcon } from "@chakra-ui/icons";

const CheckoutPageSection = () => {
	const toast = useToast();
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const isXL = useBreakpointValue({
		base: false,
		sm: false,
		md: false,
		lg: false,
		xl: true,
	});
	const {
		userData: { cartItems, cartTotal },
	} = useUser();

	if (cartItems.length === 0) {
		router.replace("/cart").then(() => {
			if (!toast.isActive("cart-empty")) {
				toast({
					id: "cart-empty",
					title: "Your cart is empty",
					description: "Please add items to your cart",
					status: "warning",
					duration: 9000,
					isClosable: true,
				});
			}
		});

		return <FullPageLoadingSpinner />;
	}

	return (
		<VStack overflowX="auto">
			<Box
				width={isXL ? `auto` : `full`}
				py="5"
				px={isXL && "5"}
				borderRadius="12px"
				border="1px"
				borderColor={
					colorMode == "light" ? `gray.200` : `whiteAlpha.300`
				}
				overflowX="auto"
			>
				<Table variant="simple" size={!isXL ? "sm" : "lg"}>
					<TableCaption w={"full"} fontSize={"2xl"} placement="top">
						<HStack justifyContent={"space-between"}>
							<Heading>Itemized Billing</Heading>
							<Button
								leftIcon={<EditIcon />}
								colorScheme={"gray"}
								onClick={() => router.push("/cart")}
							>
								Edit Cart
							</Button>
						</HStack>
					</TableCaption>
					<Thead>
						<Tr>
							<Th>Item Description</Th>
							<Th isNumeric>Quantity</Th>
							<Th isNumeric>Rate</Th>
							<Th isNumeric>Amount</Th>
						</Tr>
					</Thead>
					<Tbody>
						{cartItems.map((item) => (
							<Tr key={item.menuId}>
								<Td>{item.menuname}</Td>
								<Td whiteSpace={"nowrap"} isNumeric>
									x {item.quantity}
								</Td>
								<Td whiteSpace={"nowrap"} isNumeric>
									रू {(item.price / 100).toFixed(2)}
								</Td>
								<Td whiteSpace={"nowrap"} isNumeric>
									रू {(item.totalPrice / 100).toFixed(2)}
								</Td>
							</Tr>
						))}

						<Tr fontSize={"xl"} fontWeight={"bold"}>
							<Td></Td>
							<Td whiteSpace={"nowrap"} isNumeric></Td>
							<Td whiteSpace={"nowrap"} isNumeric>
								Total
							</Td>
							<Td whiteSpace={"nowrap"} isNumeric>
								रू {(cartTotal / 100).toFixed(2)}
							</Td>
						</Tr>
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Item Description</Th>
							<Th isNumeric>Quantity</Th>
							<Th isNumeric>Rate</Th>
							<Th isNumeric>Amount</Th>
						</Tr>
					</Tfoot>
				</Table>
			</Box>
		</VStack>
	);
};

export default CheckoutPageSection;
