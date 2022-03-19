import React, { useEffect, useState } from "react";
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
	Text,
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
	orderBy,
	query,
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
import {
	uploadBytes,
	ref,
	uploadString,
	getDownloadURL,
	listAll,
	deleteObject,
} from "firebase/storage";
import { pull } from "lodash";

import { storage } from "../firebase";
import { Step, Steps, useSteps } from "chakra-ui-steps";

import {
	FiClipboard,
	FiDollarSign,
	FiUser,
	FiCheckCircle,
} from "react-icons/fi";
import { GiDeliveryDrone } from "react-icons/gi";
import IconBadge from "@components/Navbar/CartIcon";

const TestingPage = () => {
	// const files = [];

	// const { menuItems } = useMenu();

	// const router = useRouter();

	// const toast = useToast();

	// const options = ["apple", "appoint", "zap", "cap", "japan"];

	// const bg = useColorModeValue("white", "gray.800");
	// const mobileNav = useDisclosure();

	// const [selectedFile, setSelectedFile] = useState();

	// const storageRef = ref(storage, "test/image");

	// const addImageToPost = async (e) => {
	// 	const reader = new FileReader();
	// 	if (e.target.files[0]) {
	// 		reader.readAsDataURL(e.target.files[0]);
	// 	}

	// 	reader.onload = (readerEvent) => {
	// 		setSelectedFile(readerEvent.target.result);
	// 	};
	// };

	// const listRef = ref(storage, "images/menu/apple-crumble");

	// const appleCrubmle = menuItems.find(
	// 	(item) => item.menuId === "apple-crumble"
	// );

	// const appleImages = appleCrubmle.images.map((image) => image.imageRef);

	// const handleClick = async () => {
	// 	listAll(listRef)
	// 		.then((res) => {
	// 			const storageBucket = res.items.map((itemRef) => {
	// 				return itemRef._location.path_;
	// 			});
	// 			console.log("STORAGE BUCKET", storageBucket);
	// 			console.log("APPLE IMAGES", appleImages);
	// 			const unWantedFiles = storageBucket.filter(
	// 				(item) => !appleImages.includes(item)
	// 			);
	// 			unWantedFiles.forEach((file) => {
	// 				deleteObject(ref(storage, file))
	// 					.then(() => {
	// 						console.log("File deleted successfully");
	// 					})
	// 					.catch((error) => {
	// 						console.log("Uh-oh, an error occurred!");
	// 					});
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// const handleClick = async (e) => {
	// 	e.preventDefault();
	// 	const docRef = await addDoc(collection(db, "orders"), {
	// 		name: "Tokyo",
	// 		country: "Japan",
	// 	});
	// 	console.log("Document written with ID: ", docRef.id);
	// };

	const [orders, setOrders] = useState([]);

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "orders"),
					orderBy("orderTimeStamp", "desc")
				),
				(snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => {
							console.log(doc.id);
							return {
								...doc.data(),
								orderId: doc.id,
							};
						})
					);
				}
			),
		[]
	);

	return (
		<>
			<Box width="100%">
				{orders?.map((order) => {
					<Text>{JSON.stringify(order)}</Text>;
				})}
			</Box>
		</>
	);
};

export default TestingPage;
