import React from "react";
import { Button, useToast, Flex } from "@chakra-ui/react";
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

const TestingPage = () => {
	const { menuItems } = useMenu();

	const router = useRouter();

	const toast = useToast();

	const options = ["apple", "appoint", "zap", "cap", "japan"];

	return (
		<Flex
			boxSize="full"
			h="100vh"
			pos="absolute"
			p={30}
			justifyContent="center"
		>
			<AutoComplete rollNavigation>
				<AutoCompleteInput
					// variant="filled"
					placeholder="Search..."
					autoFocus
				/>
				<AutoCompleteList>
					{menuItems.map((option, oid) => (
						<AutoCompleteItem
							key={`option-${oid}`}
							value={option.menuname}
							textTransform="capitalize"
							onClick={() => {
								router.push(`/menu/${option.menuId}`);
							}}
						>
							{option.menuname}
						</AutoCompleteItem>
					))}
				</AutoCompleteList>
			</AutoComplete>
		</Flex>
	);
};

export default TestingPage;
