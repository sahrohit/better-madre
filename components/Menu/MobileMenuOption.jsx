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
import { GoSettings } from "react-icons/go";

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
				variant={"outline"}
				rightIcon={<GoSettings />}
				m={4}
				ref={btnRef}
				colorScheme="green"
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
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMenuOption;
