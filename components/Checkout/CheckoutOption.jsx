import { useState } from "react";
import {
	Text,
	HStack,
	VStack,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	ButtonGroup,
	Box,
	useBreakpointValue,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	FormErrorMessage,
	Input,
	Heading,
	useToast,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Textarea,
	InputLeftAddon,
	InputGroup,
} from "@chakra-ui/react";
import { useUser } from "@contexts/UserContext";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
	AutoCompleteCreatable,
} from "@choc-ui/chakra-autocomplete";
import {
	addDoc,
	doc,
	collection,
	updateDoc,
	arrayUnion,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const CheckoutSchema = Yup.object().shape({
	deliveryToName: Yup.string().required("Required"),
	deliveryToPhoneNumber: Yup.number().required("Required"),
	address: Yup.string().required("Required"),
	deliveryNote: Yup.string(),
});

const CheckoutOption = () => {
	const router = useRouter();
	const toast = useToast();
	const { userData, clearCart } = useUser();
	const isMobile = useBreakpointValue({ base: true, sm: false });

	const [value, setValue] = useState("cash-on-delivery");

	return (
		<Box>
			<Formik
				initialValues={{
					deliveryToName: userData.displayName,
					deliveryToPhoneNumber: parseInt(userData.phoneNumber) || "",
					address:
						// userData.addresses?.length > 0
						// 	? `${userData.addresses[0].addressName} (${userData.addresses[0].addressline1}, ${userData.addresses[0].addressline2}, ${userData.addresses[0].city}, ${userData.addresses[0].state}, ${userData.addresses[0].zipcode})`
						// 	:
						"",
					deliveryNote: "",
				}}
				validationSchema={CheckoutSchema}
				onSubmit={async (values, actions) => {
					if (value !== "cash-on-delivery") {
						toast({
							title: "Wallet Payment are yet not supported",
							description:
								"Please use cash on delivery as of now.",

							status: "warning",
							duration: 5000,
							isClosable: true,
						});
					} else {
						await addDoc(collection(db, "orders"), {
							...values,
							orderedBy: userData.uid,
							orderedItems: userData.cartItems,
							totalPrice: userData.cartTotal,
							status: "pending",
							payment: "unpaid",
							orderTimeStamp: serverTimestamp(),
						}).then(async ({ id }) => {
							await updateDoc(doc(db, "users", userData.uid), {
								orders: arrayUnion(id),
							}).then(() => {
								router.replace("/profile").then(() => {
									clearCart();
								});
							});
						});
					}
				}}
			>
				{(props) => (
					<Form>
						<VStack
							p={5}
							py={10}
							boxShadow={"lg"}
							borderRadius={"lg"}
							spacing={4}
						>
							<Heading
								fontSize="xl"
								fontWeight={"medium"}
								mr={"auto"}
							>
								Deliver to:{" "}
							</Heading>

							<Stack
								w={"full"}
								direction={{
									base: "column",
									sm: "row",
									md: "column",
									xl: "row",
								}}
							>
								<Field name="deliveryToName">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.deliveryToName &&
												form.touched.deliveryToName
											}
										>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Name :</FormLabel>
												<FormErrorMessage>
													{form.errors.deliveryToName}
												</FormErrorMessage>
											</Stack>

											<Input
												{...field}
												autoComplete="name"
												type="text"
											/>
										</FormControl>
									)}
								</Field>
								<Field name="deliveryToPhoneNumber">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors
													.deliveryToPhoneNumber &&
												form.touched
													.deliveryToPhoneNumber
											}
										>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Phone :</FormLabel>
												<FormErrorMessage>
													{
														form.errors
															.deliveryToPhoneNumber
													}
												</FormErrorMessage>
											</Stack>

											<InputGroup>
												<InputLeftAddon>
													+977
												</InputLeftAddon>
												<Input
													{...field}
													autoComplete="tel-national"
													type="number"
												/>
											</InputGroup>
										</FormControl>
									)}
								</Field>
							</Stack>

							<HStack
								w={"full"}
								alignItems={"flex-end"}
								spacing={4}
							>
								<Field name="address" autoComplete="off">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.address &&
												form.touched.address
											}
										>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>
													Detailed Address :
												</FormLabel>

												<FormErrorMessage>
													{form.errors.address}
												</FormErrorMessage>
											</Stack>
											<AutoComplete
												creatable
												rollNavigation
											>
												<AutoCompleteInput
													{...field}
													id="address"
													placeholder="Type Address or Select from your Addresses"
													autoComplete="off"
													variant="filled"
												/>
												{userData.addresses?.length >
													0 && (
													<AutoCompleteList>
														{userData.addresses.map(
															(address, oid) => (
																<AutoCompleteItem
																	key={
																		address.addressId
																	}
																	value={
																		address.addressName
																	}
																	textTransform="capitalize"
																	align="center"
																	onClick={() => {
																		form.setFieldValue(
																			"address",
																			`${address.addressline1}, ${address.addressline2}, ${address.city}, ${address.state}, ${address.zipcode}`
																		);
																	}}
																	my={1}
																>
																	<Text ml="4">
																		{`
																		${address.addressName} (${address.addressline1}, ${address.addressline2}, ${address.city}, ${address.state}, ${address.zipcode})
																	`}
																	</Text>
																</AutoCompleteItem>
															)
														)}
														<AutoCompleteCreatable>
															{({ value }) => (
																<Text>
																	Deliver to{" "}
																	{value}
																</Text>
															)}
														</AutoCompleteCreatable>
													</AutoCompleteList>
												)}
											</AutoComplete>
										</FormControl>
									)}
								</Field>
							</HStack>

							<Accordion w={"full"} allowMultiple>
								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												Add Delivery Note
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<Field name="deliveryNote">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors
															.deliveryNote &&
														form.touched
															.deliveryNote
													}
												>
													<Stack
														direction={{
															base: "column",
															sm: "row",
														}}
														align={"start"}
														justify={
															"space-between"
														}
													>
														<FormLabel>
															Delivery Note :
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.deliveryNote
															}
														</FormErrorMessage>
													</Stack>
													<Textarea
														placeholder="Eg. Leave the food on the porch, and dont ring the doorbell."
														h={"120px"}
														{...field}
													/>
												</FormControl>
											)}
										</Field>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>

							<FormControl>
								<FormLabel>Select Payement Option :</FormLabel>

								<RadioGroup
									defaultValue="cash-on-delivery"
									onChange={setValue}
									value={value}
								>
									<Stack spacing={4} direction="row">
										<Radio value="cash-on-delivery">
											Cash on Delivery
										</Radio>
										<Radio value="khalti">Khalti</Radio>
										<Radio value="e-sewa">e-Sewa</Radio>
									</Stack>
								</RadioGroup>
							</FormControl>

							<HStack justifyContent={"center"}>
								<Text
									color="#318b6c"
									fontWeight="normal"
									fontSize="xl"
									colorScheme={"blue"}
								>
									Total Price:
								</Text>
								<Text
									color="#318b6c"
									fontWeight="bold"
									fontSize="xl"
								>
									रू {userData.cartTotal / 100}
								</Text>
							</HStack>
							<Popover>
								<PopoverTrigger>
									<Button
										w={"full"}
										variant={"outline"}
										colorScheme={"blue"}
									>
										{value === "cash-on-delivery"
											? "Place Order"
											: `Pay रू ${
													userData.cartTotal / 100
											  }`}
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverHeader>Confirmation!</PopoverHeader>
									<PopoverBody>
										Are you sure you want to confirm the
										order?
									</PopoverBody>
									<PopoverFooter
										d="flex"
										justifyContent="flex-end"
									>
										<ButtonGroup size="sm">
											<Button variant="outline">
												Cancel
											</Button>
											<Button
												type="submit"
												colorScheme="red"
											>
												Confirm Order
											</Button>
										</ButtonGroup>
									</PopoverFooter>
								</PopoverContent>
							</Popover>
						</VStack>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default CheckoutOption;
