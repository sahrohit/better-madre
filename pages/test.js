import React from "react";
import { Button, useToast } from "@chakra-ui/react";
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

const TestingPage = () => {
	const { menuItems } = useMenu();

	const toast = useToast();

	const applyChanges = () => {
		// try {
		// 	menuItems.map((item) => {
		// 		console.log(item.menuId);
		// 		updateDoc(doc(db, "menu", item.menuId), {
		// 			badges: ["New", "Popular"],
		// 			isNew: deleteField(),
		// 			isPopular: deleteField(),
		// 		});
		// 	});
		// 	toast({
		// 		title: "Success",
		// 		description: "Changes applied",
		// 		status: "success",
		// 		duration: 9000,
		// 		isClosable: true,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	toast({
		// 		title: "An Error Occured",
		// 		description: error.message,
		// 		status: "error",
		// 		duration: 9000,
		// 		isClosable: true,
		// 	});
		// }
	};

	return <Button onClick={applyChanges}>Apply Changes</Button>;
};

export default TestingPage;
