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
import Lottie from "react-lottie";
import animationData from "@public/lotties/emptyaddresses.json";

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
														autoComplete="nickname"
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
														autoComplete="address-level2"
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
														autoComplete="address-level3"
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
															autoComplete="address-level2"
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
															autoComplete="address-level1"
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
															autoComplete="postal-code"
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
			{userData?.addresses?.length > 0 ? (
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
					<Box textAlign="center" py={10} px={6} spacing={2}>
						<Lottie
							options={{
								loop: true,
								autoplay: true,
								animationData: animationData,
								// rendererSettings: {
								// 	preserveAspectRatio: "xMidYMid slice",
								// },
							}}
							height={200}
							width={200}
						/>
						<Heading
							as="h2"
							fontWeight={"medium"}
							size="xl"
							mt={6}
							mb={2}
						>
							Your Address List is Empty.
						</Heading>
						<Text color={"gray.500"}>
							Click the button on the top right to add new
							Addresses.
						</Text>
					</Box>
				</Center>
			)}
		</VStack>
	);
};

export default Address;
