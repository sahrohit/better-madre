import React, { useEffect } from "react";
import {
	HStack,
	VStack,
	Text,
	Button,
	Tag,
	Divider,
	IconButton,
	useColorModeValue,
	SimpleGrid,
	PopoverTrigger,
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	FormErrorMessage,
	Textarea,
	Stack,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import moment from "moment";
import { colorizeFromText } from "@components/helpers/colorize";
import { MdPhone } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiCheckCircle } from "react-icons/fi";
import { GiDeliveryDrone } from "react-icons/gi";
import Link from "next/link";
import { useAdmin } from "@contexts/AdminContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

const DeliveryPartnerSchema = Yup.object().shape({
	deliveryPartnerName: Yup.string().required("Required"),
	deliveryPartnerPhone: Yup.number()
		.required("Required")
		.min(999999999, "Not a PhoneNumber")
		.max(10000000000, "Not a Phone Number"),
});

const CancellationMessageSchema = Yup.object().shape({
	cancellationMessage: Yup.string().required("Required"),
});

const AdminOrderCard = ({ order }) => {
	const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
		initialStep: orderStatus(order.status),
	});

	const {
		updateToVerified,
		updateToCancelled,
		updateToDelivered,
		updateToLeftforDelivery,
	} = useAdmin();

	useEffect(() => setStep(orderStatus(order.status)), [order, setStep]);

	return (
		<VStack
			bg={useColorModeValue("white", "#1a1b1e")}
			rounded={"lg"}
			shadow={"lg"}
			w={"full"}
		>
			<SimpleGrid
				p={5}
				w={"full"}
				templateColumns={{
					base: "1fr",
					md: "1fr 1fr",
					xl: "1fr 1fr 1fr",
				}}
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
					<Divider
						borderColor={"gray.400"}
						orientation="horizontal"
					/>

					<VStack align="left" w={"full"}>
						<Text fontWeight={"semibold"}>ID: {order.orderId}</Text>
						<Text>Delivering to :</Text>
						<HStack w={"full"} justifyContent={"space-between"}>
							<VStack align="left" spacing={0}>
								<Text fontSize={"sm"}>
									{order.deliveryToName}
								</Text>
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
					{order?.orderedItems?.map((item) => {
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
					{(order.status === "pending" ||
						order.status === "verified" ||
						order.status === "left-for-delivery") && (
						<HStack w={"full"} justifyContent={"space-between"}>
							{order.status === "left-for-delivery" ? (
								<Popover isLazy>
									{({ isOpen, onClose }) => (
										<>
											<PopoverTrigger>
												<Button
													colorScheme={"green"}
													size="sm"
												>
													Delivered
												</Button>
											</PopoverTrigger>
											<PopoverContent>
												<PopoverHeader fontWeight="semibold">
													Confirmation
												</PopoverHeader>
												<PopoverArrow />
												<PopoverCloseButton />
												<PopoverBody>
													Are you sure the customer
													recieved the order ?
												</PopoverBody>
												<PopoverFooter
													d="flex"
													justifyContent="flex-end"
												>
													<ButtonGroup size="sm">
														<Button
															variant="outline"
															onClick={onClose}
														>
															Cancel
														</Button>
														<Button
															colorScheme="green"
															onClick={async () =>
																await updateToDelivered(
																	order.orderId
																).then(() =>
																	onClose()
																)
															}
														>
															Delivered
														</Button>
													</ButtonGroup>
												</PopoverFooter>
											</PopoverContent>
										</>
									)}
								</Popover>
							) : (
								<>
									<Popover isLazy>
										{({ isOpen, onClose }) => (
											<>
												<PopoverTrigger>
													<Button
														size="sm"
														isDisabled={
															order.status !==
															"pending"
														}
													>
														Verify
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<PopoverHeader fontWeight="semibold">
														Confirmation
													</PopoverHeader>
													<PopoverArrow />
													<PopoverCloseButton />
													<PopoverBody>
														Are you sure you want to
														change the status to{" "}
														<Tag
															colorScheme={
																"green"
															}
														>
															Verified
														</Tag>{" "}
														?
													</PopoverBody>
													<PopoverFooter
														d="flex"
														justifyContent="flex-end"
													>
														<ButtonGroup size="sm">
															<Button
																variant="outline"
																onClick={
																	onClose
																}
															>
																Cancel
															</Button>
															<Button
																colorScheme="green"
																onClick={async () =>
																	await updateToVerified(
																		order.orderId
																	).then(() =>
																		onClose()
																	)
																}
															>
																Apply
															</Button>
														</ButtonGroup>
													</PopoverFooter>
												</PopoverContent>
											</>
										)}
									</Popover>

									<Popover isLazy>
										{({ isOpen, onClose }) => (
											<>
												<PopoverTrigger>
													<Button
														size="sm"
														isDisabled={
															order.status !==
															"verified"
														}
													>
														Left for Delivery
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<Formik
														initialValues={{
															deliveryPartnerName:
																"",
															deliveryPartnerPhone:
																"",
														}}
														validationSchema={
															DeliveryPartnerSchema
														}
														onSubmit={async (
															values,
															actions
														) => {
															await updateToLeftforDelivery(
																order.orderId,
																values.deliveryPartnerName,
																values.deliveryPartnerPhone
															)
																.then(() => {
																	actions.setSubmitting(
																		false
																	);
																	onClose();
																})
																.catch(
																	(
																		error
																	) => {}
																);
														}}
													>
														{(props) => (
															<Form>
																<PopoverHeader fontWeight="semibold">
																	Delivery
																	Partner
																	Details
																</PopoverHeader>
																<PopoverArrow />
																<PopoverCloseButton />
																<PopoverBody>
																	<Field
																		name="deliveryPartnerName"
																		autoComplete="name"
																	>
																		{({
																			field,
																			form,
																		}) => (
																			<FormControl
																				isInvalid={
																					form
																						.errors
																						.deliveryPartnerName &&
																					form
																						.touched
																						.deliveryPartnerName
																				}
																			>
																				<FormLabel>
																					Delivery
																					Partner
																					Name:
																				</FormLabel>

																				<Input
																					autoComplete="name"
																					{...field}
																					type="text"
																				/>
																				<FormErrorMessage>
																					{
																						form
																							.errors
																							.deliveryPartnerName
																					}
																				</FormErrorMessage>
																			</FormControl>
																		)}
																	</Field>
																	<Field
																		name="deliveryPartnerPhone"
																		autoComplete="tel-national"
																	>
																		{({
																			field,
																			form,
																		}) => (
																			<FormControl
																				isInvalid={
																					form
																						.errors
																						.deliveryPartnerPhone &&
																					form
																						.touched
																						.deliveryPartnerPhone
																				}
																			>
																				<FormLabel>
																					Delivery
																					Partner
																					Phone:
																				</FormLabel>

																				<InputGroup>
																					<InputLeftAddon>
																						+977
																					</InputLeftAddon>
																					<Input
																						autoComplete="tel-national"
																						{...field}
																						type="number"
																					/>
																				</InputGroup>

																				<FormErrorMessage>
																					{
																						form
																							.errors
																							.deliveryPartnerPhone
																					}
																				</FormErrorMessage>
																			</FormControl>
																		)}
																	</Field>
																</PopoverBody>
																<PopoverFooter
																	d="flex"
																	justifyContent="flex-end"
																>
																	<ButtonGroup size="sm">
																		<Button
																			variant="outline"
																			onClick={
																				onClose
																			}
																		>
																			Cancel
																		</Button>
																		<Button
																			colorScheme="red"
																			type="submit"
																			isLoading={
																				props.isLoading
																			}
																		>
																			Confirm
																		</Button>
																	</ButtonGroup>
																</PopoverFooter>
															</Form>
														)}
													</Formik>
												</PopoverContent>
											</>
										)}
									</Popover>
								</>
							)}

							<Popover isLazy>
								{({ isOpen, onClose }) => (
									<>
										<PopoverTrigger>
											<Button
												size="sm"
												colorScheme={"red"}
											>
												Cancel
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Formik
												initialValues={{
													cancellationMessage: "",
												}}
												validationSchema={
													CancellationMessageSchema
												}
												onSubmit={async (
													values,
													actions
												) => {
													await updateToCancelled(
														order.orderId,
														values.cancellationMessage
													)
														.then(() => {
															actions.setSubmitting(
																false
															);
															onClose();
														})
														.catch((error) => {});
												}}
											>
												{(props) => (
													<Form>
														<PopoverHeader fontWeight="semibold">
															Reason for
															Cancelling
														</PopoverHeader>
														<PopoverArrow />
														<PopoverCloseButton />
														<PopoverBody>
															<Field name="cancellationMessage">
																{({
																	field,
																	form,
																}) => (
																	<FormControl
																		isInvalid={
																			form
																				.errors
																				.cancellationMessage &&
																			form
																				.touched
																				.cancellationMessage
																		}
																	>
																		<FormLabel>
																			Cancellation
																			Message:
																		</FormLabel>
																		<Textarea
																			{...field}
																		/>

																		<FormErrorMessage>
																			{
																				form
																					.errors
																					.cancellationMessage
																			}
																		</FormErrorMessage>
																	</FormControl>
																)}
															</Field>
														</PopoverBody>
														<PopoverFooter
															d="flex"
															justifyContent="flex-end"
														>
															<ButtonGroup size="sm">
																<Button
																	variant="outline"
																	onClick={
																		onClose
																	}
																>
																	Keep
																</Button>
																<Button
																	colorScheme="red"
																	type="submit"
																	isLoading={
																		props.isLoading
																	}
																>
																	Cancel
																</Button>
															</ButtonGroup>
														</PopoverFooter>
													</Form>
												)}
											</Formik>
										</PopoverContent>
									</>
								)}
							</Popover>
						</HStack>
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
			{(order.status === "left-for-delivery" ||
				order.status === "delivered") && (
				<HStack textAlign={"center"} py={{ base: 2, sm: 0 }} margin={5}>
					<Stack direction={{ base: "column", sm: "row" }}>
						<Text fontWeight={"semibold"}>
							{order.status === "left-for-delivery"
								? `${order.deliveryPartner.name} has the order now.`
								: `${order.deliveryPartner.name} delivered the order.`}
							{}
						</Text>
						<Text>
							({order.deliveryPartner.phoneNumber}) Contact him ?
						</Text>
					</Stack>
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
			)}
		</VStack>
	);
};

export default AdminOrderCard;
