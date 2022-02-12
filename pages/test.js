import React from "react";
import {
	Button,
	useToast,
	Flex,
	chakra,
	HStack,
	Box,
	Icon,
	IconButton,
	useDisclosure,
	useColorModeValue,
	VStack,
	Input,
	Avatar,
	VisuallyHidden,
	CloseButton,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	deleteField,
} from "firebase/firestore";
import { db } from "../firebase";
import { useMenu } from "../contexts/MenuContext";
import { getFromStorage } from "@components/helpers/localstorage";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
	AutoCompleteGroup,
	AutoCompleteFixedItem,
} from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import Logo from "@components/Logo";
import { CloseIcon } from "@chakra-ui/icons";
import {
	AiFillCloseCircle,
	AiOutlineMenu,
	AiFillHome,
	AiOutlineInbox,
	AiOutlineSearch,
	AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import SearchBar from "@components/shared/SearchBar";

const TestingPage = () => {
	const { menuItems } = useMenu();

	const router = useRouter();

	const toast = useToast();

	const options = ["apple", "appoint", "zap", "cap", "japan"];

	const bg = useColorModeValue("white", "gray.800");
	const mobileNav = useDisclosure();

	return (
		<>
			<SearchBar />
		</>
	);
};

export default TestingPage;
