import {
	Text,
	Button,
	HStack,
	VStack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	Avatar,
	AvatarBadge,
	Icon,
	Tooltip,
	ButtonGroup,
	Box,
	chakra,
	useToast,
} from "@chakra-ui/react";
import { useAuth } from "@contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { BiUnlink } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";

import { CheckIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const DrawerFooterContent = () => {
	const {
		currentUser,
		updateProfileDetails,
		providers,
		logOut,
		linkGoogleAccount,
		unLinkGoogleAccount,
	} = useAuth();
	const toast = useToast();
	const router = useRouter();

	const KEYVALUES = [
		{
			icon: AiOutlineIdcard,
			value: currentUser?.uid,
		},
		{
			icon: AiOutlineMail,
			value: currentUser?.email,
		},
		{
			icon: BsTelephone,
			value: "9800000000",
		},
	];

	return (
		<VStack>
			{currentUser ? (
				<>
					<VStack my={3} justifyContent={"space-between"}>
						<VStack>
							<Avatar size="lg" src={currentUser.photoURL}>
								{providers.includes("google.com") && (
									<AvatarBadge border={"transparent"}>
										<Icon w={6} h={6} as={FcGoogle} />
									</AvatarBadge>
								)}
							</Avatar>
							<HStack>
								<Text>{currentUser.displayName}</Text>
								<Tooltip label={`Linked with Google`}>
									<Icon as={CheckIcon} />
								</Tooltip>
							</HStack>
						</VStack>
					</VStack>
					{!providers.includes("google.com") && (
						<Button
							leftIcon={<FcGoogle />}
							m={5}
							w="90%"
							onClick={async () => {
								await linkGoogleAccount()
									.then(() => {
										updateProfileDetails(
											currentUser,
											currentUser.displayName,
											currentUser.providerData[0].photoURL
												? currentUser.providerData[0]
														.photoURL
												: currentUser.providerData[1]
														.photoURL
										);
										toast({
											title: "Successfully Linked",
											description:
												"You Madre account is now linked with Google.",
											status: "success",
											duration: 4000,
											isClosable: true,
										});
										router.reload();
									})
									.catch((error) => {
										toast({
											title: "An Error Occured",
											description: error.message,
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									});
							}}
						>
							Link with Google
						</Button>
					)}
					<VStack alignItems={"flex-start"}>
						<Box pb={4}>
							<chakra.p py={2}>
								Full Stack maker & UI / UX Designer , love hip
								hop music Author of Building UI.
							</chakra.p>

							{KEYVALUES.map((item) => {
								return (
									<HStack
										key={item.value}
										alignItems="center"
										mt={4}
									>
										<Icon
											as={item.icon}
											h={6}
											w={6}
											mr={2}
										/>

										<chakra.h1 px={2} fontSize="sm">
											{item.value}
										</chakra.h1>
									</HStack>
								);
							})}
						</Box>
					</VStack>
					<HStack>
						<Popover closeOnBlur closeOnEsc>
							{({ isOpen, onClose }) => (
								<>
									{providers.includes("google.com") && (
										<>
											<PopoverTrigger>
												<Button
													w={"full"}
													leftIcon={<FcGoogle />}
												>
													Unlink
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
														Are you sure you want to
														continue with unlinking
														you Google Account from
														Madre Account?
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
																	unLinkGoogleAccount()
																		.then(
																			() => {
																				toast(
																					{
																						title: "Successfully Unlinked",
																						description:
																							"You Madre account is not associated with Google now.",
																						status: "success",
																						duration: 4000,
																						isClosable: true,
																					}
																				);
																				router.reload();
																			}
																		)
																		.catch(
																			(
																				error
																			) => {
																				toast(
																					{
																						title: "An Error Occured",
																						description:
																							error.message,
																						status: "error",
																						duration: 5000,
																						isClosable: true,
																					}
																				);
																			}
																		);
																}}
															>
																Unlink
															</Button>
														</ButtonGroup>
													</PopoverFooter>
												</PopoverContent>
											</PopoverContent>
										</>
									)}
								</>
							)}
						</Popover>
						<Button
							bg={"red.400"}
							color={"white"}
							w="full"
							_hover={{
								bg: "red.500",
							}}
							onClick={() => {
								logOut()
									.then(() => {
										toast({
											title: "",
											description:
												"Logged Out Successfully.",
											status: "success",
											duration: 9000,
											isClosable: true,
										});
										router.replace("/auth/login");
									})
									.catch((error) => {
										toast({
											title: "An Error Occured",
											description: error.message,
											status: "error",
											duration: 9000,
											isClosable: true,
										});
									});
							}}
						>
							Logout
						</Button>
					</HStack>
				</>
			) : (
				<VStack h={"full"} justifyContent={"center"}>
					<Button
						variant={"outline"}
						colorScheme={"green"}
						w={"full"}
						onClick={() => router.push("/auth/login")}
					>
						Login to your account
					</Button>
				</VStack>
			)}
		</VStack>
	);
};

export default DrawerFooterContent;
