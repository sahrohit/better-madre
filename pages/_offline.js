import React from "react";
import { Navbar } from "@components/Navbar";
import Lottie from "react-lottie";
import animationData from "@public/lotties/nointernet.json";
import {
	Center,
	Heading,
	Flex,
	Box,
	Text,
	Button,
	Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

const OfflinePage = () => {
	return (
		<>
			{/* <Navbar /> */}
			<Center minH={"90vh"}>
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
						height={300}
						width={300}
					/>
					<Heading
						as="h2"
						fontWeight={"medium"}
						size="xl"
						mt={6}
						mb={2}
					>
						Connect to the Internet.
					</Heading>
					<Text color={"gray.500"}>
						You`re offline. Check you connection.
					</Text>

					<ChakraLink as={Link} href="/" passHref>
						<Button m={2}>Retry</Button>
					</ChakraLink>
				</Box>
			</Center>
		</>
	);
};

export default OfflinePage;
