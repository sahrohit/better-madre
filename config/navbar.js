import { MdOutlineRestaurantMenu, MdWorkOutline } from "react-icons/md";
import { BiCalendarEvent, BiBuildings } from "react-icons/bi";

export const NAV_ITEMS = [
	{
		label: "Menu",
		href: "/menu",
		icon: <MdOutlineRestaurantMenu />,
	},
	{
		label: "Events",
		href: "/events",
		icon: <BiCalendarEvent />,
	},
	{
		label: "Jobs",
		href: "/jobs",
		icon: <MdWorkOutline />,
	},
	{
		label: "About Us",
		href: "/aboutus",
		icon: <BiBuildings />,
	},
];
