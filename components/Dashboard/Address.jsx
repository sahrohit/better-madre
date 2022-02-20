import {
	Box,
	Heading,
	Text,
	Button,
	Flex,
	Center,
	HStack,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CheckIcon, EmailIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useUser } from "@contexts/UserContext";
import AddressCard from "./AddressCard";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddressSchemea = Yup.object().shape({
	addressName: Yup.string().required("Name is required"),
	landMark: Yup.string().required("Landmark is required"),
	addressline1: Yup.string().required("Address Line 1 is required"),
	addressline2: Yup.string().required("Address Line 2 is required"),
	city: Yup.string().required("City is required"),
	state: Yup.string().required("State is required"),
	zipcode: Yup.number().required("Zip is required"),
});

const Address = () => {
	const router = useRouter();

	const { userData, addNewAddress } = useUser();

	const {
		isOpen: isAddressModalOpen,
		onOpen: onAddressModalOpen,
		onClose: onAddressModalClose,
	} = useDisclosure();

	return (
		<VStack>
			<Modal
				size="2xl"
				preserveScrollBarGap
				isOpen={isAddressModalOpen}
				onClose={onAddressModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<Formik
						initialValues={{
							addressName: "",
							landMark: "",
							addressline1: "",
							addressline2: "",
							city: "",
							state: "",
							zipcode: "",
						}}
						validationSchema={AddressSchemea}
						onSubmit={(values, actions) => {
							addNewAddress(values).then(() => {
								actions.setSubmitting(false);
								onAddressModalClose();
							});
						}}
					>
						{(props) => (
							<Form>
								<ModalHeader>Modal Title</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<VStack>
										<Field name="addressName">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors
															.addressName &&
														form.touched.addressName
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
															Address Name
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.addressName
															}
														</FormErrorMessage>
													</Stack>

													<Input
														{...field}
														type="text"
													/>
												</FormControl>
											)}
										</Field>
										<Field name="landMark">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.landMark &&
														form.touched.landMark
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
															LandMark
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.landMark
															}
														</FormErrorMessage>
													</Stack>

													<Input
														{...field}
														type="text"
													/>
												</FormControl>
											)}
										</Field>
										<Field name="addressline1">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors
															.addressline1 &&
														form.touched
															.addressline1
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
															Address Line 1
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.addressline1
															}
														</FormErrorMessage>
													</Stack>

													<Input
														{...field}
														type="text"
													/>
												</FormControl>
											)}
										</Field>
										<Field name="addressline2">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors
															.addressline2 &&
														form.touched
															.addressline2
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
															Address Line 2
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.addressline2
															}
														</FormErrorMessage>
													</Stack>

													<Input
														{...field}
														type="text"
													/>
												</FormControl>
											)}
										</Field>

										<HStack>
											<Field name="city">
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.city &&
															form.touched.city
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
																City
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.city
																}
															</FormErrorMessage>
														</Stack>

														<Input
															{...field}
															type="text"
														/>
													</FormControl>
												)}
											</Field>
											<Field name="state">
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.state &&
															form.touched.state
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
																State
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.state
																}
															</FormErrorMessage>
														</Stack>

														<Input
															{...field}
															type="text"
														/>
													</FormControl>
												)}
											</Field>
											<Field name="zipcode">
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors
																.zipcode &&
															form.touched.zipcode
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
																Zip Code
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.zipcode
																}
															</FormErrorMessage>
														</Stack>

														<Input
															{...field}
															type="number"
														/>
													</FormControl>
												)}
											</Field>
										</HStack>
									</VStack>
								</ModalBody>

								<ModalFooter>
									<Button
										colorScheme="blue"
										mr={3}
										onClick={onAddressModalClose}
									>
										Discard
									</Button>
									<Button
										type="submit"
										variant="ghost"
										isLoading={props.isSubmitting}
									>
										Add Address
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalContent>
			</Modal>

			<Button
				ml={"auto"}
				colorScheme={"green"}
				onClick={onAddressModalOpen}
			>
				Add New Address
			</Button>
			{userData?.addresses.length > 0 ? (
				userData.addresses.map((address, index) => {
					return (
						<AddressCard
							key={address.addressId}
							address={address}
						/>
					);
				})
			) : (
				<Center>
					<Box textAlign="center" py={10} px={6}>
						<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
						<Heading as="h2" size="xl" mt={6} mb={2}>
							No Pending Orders.
						</Heading>
						<Text color={"gray.500"}>
							There are no pending orders, you can order some item
							from our appealing menu.
						</Text>
						<HStack justifyContent={"center"} spacing="24px" mt={2}>
							<Button
								color="outline"
								onClick={() => {
									router.push("/menu");
								}}
							>
								Order Now
							</Button>
						</HStack>
					</Box>
				</Center>
			)}
		</VStack>
	);
};

export default Address;
