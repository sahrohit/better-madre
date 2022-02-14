import React, { useState } from "react";
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
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	Box,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useUser } from "@contexts/UserContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const CartOption = () => {
	const router = useRouter();
	const { userData, clearCart } = useUser();
	const isMobile = useBreakpointValue({ base: true, sm: false });

	const [showClearButton, setShowClearButton] = useState();

	return (
		<Box gridRow={isMobile && 1}>
			<VStack
				p={5}
				py={10}
				boxShadow={"lg"}
				borderRadius={"lg"}
				spacing={4}
			>
				<HStack justifyContent={"center"}>
					<Text
						color="#318b6c"
						fontWeight="normal"
						fontSize="lg"
						colorScheme={"blue"}
					>
						Total Price:
					</Text>
					<Text color="#318b6c" fontWeight="bold" fontSize="lg">
						रू {userData.cartTotal / 100}
					</Text>
				</HStack>

				<ButtonGroup
					isAttached
					variant="outline"
					isDisabled={userData.cartTotal <= 0}
				>
					<Button
						colorScheme={"blue"}
						borderRight={"none"}
						onClick={() => router.push("/cart/checkout")}
					>
						Proceed to Checkout
					</Button>

					<Menu closeOnSelect>
						{(props) => (
							<>
								<MenuButton
									as={IconButton}
									borderLeft={"none"}
									colorScheme={"blue"}
									aria-label="Add to friends"
									icon={<ChevronDownIcon />}
								/>

								<MenuList p={0}>
									{/* TODO: Can add a better clear cart option here 
									TODO: https://user-images.githubusercontent.com/1174092/112765877-93972f00-900f-11eb-8be3-3b60969bfa50.gif */}

									<Popover closeOnBlur closeOnEsc>
										{({ isOpen, onClose }) => (
											<>
												<PopoverTrigger>
													<Button
														w={"full"}
														colorScheme={"red"}
														variant={"outline"}
													>
														Clear Cart
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<PopoverContent>
														<PopoverHeader fontWeight="semibold">
															Confirmation
														</PopoverHeader>
														<PopoverArrow />
														<PopoverCloseButton />
														<PopoverBody>
															Are you sure you
															want to remove all
															the items in the
															cart?
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
																	onClick={() => {
																		clearCart();
																		onClose();
																		props.onClose();
																	}}
																>
																	Clear
																</Button>
															</ButtonGroup>
														</PopoverFooter>
													</PopoverContent>
												</PopoverContent>
											</>
										)}
									</Popover>
								</MenuList>
							</>
						)}
					</Menu>
				</ButtonGroup>
			</VStack>
		</Box>
	);
};

export default CartOption;
