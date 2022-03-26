import React, { useState } from "react";
import {
	Alert,
	AlertIcon,
	Center,
	Icon,
	IconButton,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { getFromStorage, setToStorage } from "@components/helpers/localstorage";

const TopAlert = () => {
	const [ack, setAck] = useState(getFromStorage("ack"));

	if (ack) {
		return <></>;
	}

	return (
		<Alert as={Center} status="info" py={0}>
			<AlertIcon />
			This is a dummy website and your order will not be fulfilled. The
			source code for this is available here on github.{" "}
			<Link
				passHref
				href="https://www.github.com/sahrohit/better-madre"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View source code"
			>
				<IconButton
					aria-label="View source code"
					variant="ghost"
					mx={2}
					icon={<Icon fontSize="20px" as={FaGithub} />}
				/>
			</Link>
			<ChakraLink
				href="#"
				onClick={() => {
					setToStorage("ack", true);
					setAck(true);
				}}
			>
				I understand.
			</ChakraLink>
		</Alert>
	);
};

export default TopAlert;
