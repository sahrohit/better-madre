import React from "react";
import { Navbar } from "@components/Navbar";
import {
	Box,
	Heading,
	Text,
	FormControl,
	InputGroup,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	VStack,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FaRandom } from "react-icons/fa";
import * as Yup from "yup";
import { useRouter } from "next/router";

const OrderIDSchema = Yup.object().shape({
	orderID: Yup.string().required("Required"),
});

const SearchOrderPage = () => {
	const router = useRouter();

	const toast = useToast();

	return (
			<VStack minH={"90vh"} justifyContent={"center"} spacing={12}>
				<VStack align={"center"} spacing={4} m={4}>
					<Heading as="h1" size="2xl">
						Track you Order
					</Heading>
					<Text textAlign={"center"} fontSize="xl">
						Enter your order id below, and you can check the status
						of your order.
					</Text>
				</VStack>

				<Box align="center">
					<Formik
						initialValues={{
							orderID: "",
						}}
						onSubmit={(values, actions) => {
							router.push(`/orders?orderid=${values.orderID}`);

							actions.setSubmitting(false);
						}}
						validationSchema={OrderIDSchema}
					>
						{(props) => (
							<Form>
								<Field name="orderID">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.orderID &&
												form.touched.orderID
											}
										>
											<HStack
												justifyContent={"space-between"}
											>
												<FormLabel
													id="field-message-label"
													htmlFor="text"
												>
													Order Id:
												</FormLabel>
												<FormErrorMessage>
													{form.errors.orderID}
												</FormErrorMessage>
											</HStack>
											<InputGroup>
												<Input
													{...field}
													id="text"
													width={{
														base: "100%",
														md: 400,
													}}
												/>
											</InputGroup>
										</FormControl>
									)}
								</Field>
								<Button
									mt={4}
									colorScheme="teal"
									isLoading={props.isSubmitting}
									disabled={props.isSubmitting}
									type="submit"
								>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</Box>
			</VStack>
	);
};

export default SearchOrderPage;
