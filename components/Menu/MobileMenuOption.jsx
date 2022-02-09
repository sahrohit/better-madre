import { useRef } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	useDisclosure,
	Box,
} from "@chakra-ui/react";
import MenuOption from "./MenuOption";
import { FiFilter } from "react-icons/fi";

const MobileMenuOption = ({
	sliderValue,
	setSliderValue,
	showCategories,
	showCusines,
	setShowCategories,
	setShowCusines,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button
				leftIcon={<FiFilter />}
				w={{ base: "96%", md: "80%" }}
				mx={"auto"}
				mb={10}
				ref={btnRef}
				colorScheme="teal"
				onClick={onOpen}
			>
				Filters
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="bottom"
				onClose={onClose}
				finalFocusRef={btnRef}
				variant={"default"}
			>
				<DrawerOverlay />
				<DrawerContent variant="default">
					<DrawerCloseButton />
					<DrawerHeader>Filters</DrawerHeader>

					<DrawerBody p={50}>
						<MenuOption
							sliderValue={sliderValue}
							setSliderValue={setSliderValue}
							showCategories={showCategories}
							showCusines={showCusines}
							setShowCategories={setShowCategories}
							setShowCusines={setShowCusines}
						/>
					</DrawerBody>

					{/* <DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Close
						</Button>
					</DrawerFooter> */}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMenuOption;
