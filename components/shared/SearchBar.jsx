import React, { useState } from "react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
	AutoCompleteGroup,
	AutoCompleteFixedItem,
	AutoCompleteGroupTitle,
} from "@choc-ui/chakra-autocomplete";
import {
	Text,
	Icon,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Button,
	Input,
	InputLeftAddon,
	InputRightAddon,
	Select,
} from "@chakra-ui/react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useMenu } from "@contexts/MenuContext";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { BiCalendarEvent, BiBuildings } from "react-icons/bi";
import { MdWorkOutline, MdLogin, MdDashboard } from "react-icons/md";
import { AiOutlineShoppingCart, AiFillHome } from "react-icons/ai";
import { IoBagCheckOutline, IoCreateOutline } from "react-icons/io5";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
	const { menuItems } = useMenu();

	const [seletValue, setSelectValue] = useState("all");

	const router = useRouter();

	return (
		<AutoComplete
			rollNavigation
			onSelectOption={(val) => {
				router.push(val.item.value, val.item.value);
			}}
		>
			<InputGroup size="lg" w={"full"}>
				<AutoCompleteInput
					w={"full"}
					placeholder="Search"
				></AutoCompleteInput>
				<InputRightAddon p={0} border={"none"}>
					<Select
						p={2}
						defaultValue={"all"}
						onChange={(e) => {
							setSelectValue(e.target.value);
						}}
						variant="unstyled"
					>
						<option value="all">All</option>
						<option value="menu">Menu</option>
						<option value="pages">Pages</option>
					</Select>
				</InputRightAddon>
			</InputGroup>
			<AutoCompleteList>
				<AutoCompleteGroup title="Menu Item" showDivider>
					<AutoCompleteGroupTitle textTransform="capitalize">
						Menu Items
					</AutoCompleteGroupTitle>
					{(seletValue === "menu" || seletValue === "all") &&
						menuItems.map((menu, oid) => (
							<AutoCompleteItem
								key={nanoid()}
								label={menu.menuname}
								value={`/menu/${menu.menuId}`}
								textTransform="capitalize"
								align="center"
								focus={{ bg: "gray.200" }}
							>
								<Icon as={MdOutlineRestaurantMenu} />
								<Text ml="4">{menu.menuname}</Text>
							</AutoCompleteItem>
						))}
				</AutoCompleteGroup>

				<AutoCompleteGroup title="Pages" showDivider>
					<AutoCompleteGroupTitle textTransform="capitalize">
						Pages
					</AutoCompleteGroupTitle>
					{(seletValue === "pages" || seletValue === "all") &&
						PAGES.map((option, oid) => (
							<AutoCompleteItem
								key={nanoid()}
								label={option.label}
								value={option.href}
								textTransform="capitalize"
								align="center"
							>
								<Icon as={option.icon} />
								<Text ml="4">{option.label}</Text>
							</AutoCompleteItem>
						))}
				</AutoCompleteGroup>
			</AutoCompleteList>
		</AutoComplete>
	);
};

export default SearchBar;

const PAGES = [
	{
		label: "Menu Page",
		href: "/menu",
		icon: MdOutlineRestaurantMenu,
	},
	{
		label: "Events Page",
		href: "/events",
		icon: BiCalendarEvent,
	},
	{
		label: "Jobs Page",
		href: "/jobs",
		icon: MdWorkOutline,
	},
	{
		label: "About Us Page",
		href: "/aboutus",
		icon: BiBuildings,
	},
	{
		label: "Cart Page",
		href: "/cart",
		icon: AiOutlineShoppingCart,
	},
	{
		label: "Checkout Page",
		href: "/cart/checkout",
		icon: IoBagCheckOutline,
	},
	{
		label: "Login Page",
		href: "/auth/login",
		icon: MdLogin,
	},
	{
		label: "Sign Up Page",
		href: "/auth/register",
		icon: IoCreateOutline,
	},
	{
		label: "Dashboard",
		href: "/profile",
		icon: MdDashboard,
	},
	{
		label: "Home Page",
		href: "/",
		icon: AiFillHome,
	},
];
