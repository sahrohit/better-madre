import React, { useEffect } from "react";
import {
	Box,
	HStack,
	VStack,
	Text,
	Button,
	Tag,
	Divider,
	IconButton,
	useColorModeValue,
	SimpleGrid,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import moment from "moment";
import { colorizeFromText } from "@components/helpers/colorize";
import { useRouter } from "next/router";
import { MdPhone } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
	FiClipboard,
	FiDollarSign,
	FiUser,
	FiCheckCircle,
} from "react-icons/fi";
import { GiDeliveryDrone } from "react-icons/gi";
import Link from "next/link";

const orderStatus = (status) => {
	if (status == "pending") {
		return 1;
	} else if (status == "verified") {
		return 2;
	} else if (status == "left-for-delivery") {
		return 3;
	} else if (status == "delivered") {
		return 4;
	} else {
		return 1;
	}
};

const OrderCard = ({ order }) => {
	const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
		initialStep: orderStatus(order.status),
	});

	useEffect(() => setStep(orderStatus(order.status)), [order, setStep]);

	return (
		<SimpleGrid
			p={5}
			bg={useColorModeValue("white", "#383838")}
			w={"full"}
			rounded={"lg"}
			shadow={"lg"}
			templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
			column={3}
			gap={5}
		>
			<VStack spacing={5} w={"full"}>
				<VStack align="left" w={"full"}>
					<HStack>
						<Tag colorScheme={colorizeFromText(order.status)}>
							{capitalize(order.status.replaceAll("-", " "))}
						</Tag>
						<Tag colorScheme={colorizeFromText(order.payment)}>
							{capitalize(order.payment)}
						</Tag>
					</HStack>
					<Text fontSize={"sm"}>{order.deliveryToName}</Text>
				</VStack>
				<Divider borderColor={"gray.400"} orientation="horizontal" />

				<VStack align="left" w={"full"}>
					<Text fontWeight={"semibold"}>ID: {order.orderId}</Text>
					<Text>Delivering to :</Text>
					<HStack w={"full"} justifyContent={"space-between"}>
						<VStack align="left" spacing={0}>
							<Text fontSize={"sm"}>{order.deliveryToName}</Text>
							<Text fontSize={"sm"}>
								+977 {order.deliveryToPhoneNumber}
							</Text>
						</VStack>
						<Link
							href={`tel:+977${order.deliveryToPhoneNumber}`}
							passHref
						>
							<IconButton
								rounded={"full"}
								variant="ghost"
								aria-label={`Call ${order.deliveryToName}`}
								fontSize="20px"
								icon={<MdPhone />}
							/>
						</Link>
					</HStack>
					<VStack align="left">
						<Text color="gray.500">{order.address}</Text>
					</VStack>
				</VStack>
			</VStack>
			<VStack w={"full"}>
				{order.orderedItems.map((item) => {
					return (
						<HStack
							key={item.menuId}
							w={"full"}
							justifyContent={"space-between"}
						>
							<Text fontSize={"sm"}>
								{item.quantity} x {item.menuname}
							</Text>
							<Text
								whiteSpace={"nowrap"}
								fontSize={"sm"}
								fontWeight={"black"}
							>
								रू {(item.price / 100).toFixed(2)}
							</Text>
						</HStack>
					);
				})}
				<Divider
					borderColor={"gray.400"}
					colorScheme={"green"}
					orientation="horizontal"
				/>
				<HStack w={"full"} justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight={"semibold"}>
						Total Bill: रू {order.totalPrice / 100}
					</Text>
					<Button
						leftIcon={<BsPrinter />}
						colorScheme="teal"
						variant="ghost"
						size="sm"
					>
						Print Bill
					</Button>
				</HStack>
				{order.payment === "unpaid" && order.status !== "cancelled" && (
					<Button w={"full"} colorScheme={"green"}>
						Pay रू {order.totalPrice / 100}
					</Button>
				)}
			</VStack>

			<VStack w={"full"}>
				<Steps
					colorScheme={activeStep === 1 ? "yellow" : "green"}
					size="sm"
					activeStep={activeStep}
					orientation={"vertical"}
					state={order.status === "cancelled" && "error"}
				>
					<Step
						label={"Order Placed"}
						description={
							order?.orderTimeStamp
								? moment
										.unix(
											order.orderTimeStamp.toMillis() /
												1000
										)
										.format("h:mm A, do MMM YYYY")
								: "Keep calm, while we verify your order."
						}
						key={"order-placed"}
					/>
					<Step
						label={"Verified"}
						key={"order-verified"}
						description={
							order?.verificationTimeStamp
								? moment
										.unix(
											order.verificationTimeStamp.toMillis() /
												1000
										)
										.format("h:mm A, do MMM YYYY")
								: "Your delicious meal is being cooked."
						}
						icon={FiCheckCircle}
					/>
					<Step
						label={"Left for Delivery"}
						key={"left-for-delivery"}
						description={
							order?.leftfordeliveryTimeStamp
								? moment
										.unix(
											order.leftfordeliveryTimeStamp.toMillis() /
												1000
										)
										.format("h:mm A, do MMM YYYY")
								: "Might be at your doorstep, any moments now."
						}
						icon={GiDeliveryDrone}
					/>
					<Step
						label={"Delivered"}
						key={"order-delivered"}
						description={
							order?.deliveredTimeStamp
								? moment
										.unix(
											order.deliveredTimeStamp.toMillis() /
												1000
										)
										.format("h:mm A, do MMM YYYY")
								: "Enjoy our favulous food."
						}
						icon={FiClipboard}
					/>
				</Steps>
			</VStack>
		</SimpleGrid>
	);
};

export default OrderCard;
