import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useAuth } from "./AuthContext";
import { sum } from "lodash";
import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";

const UserContext = React.createContext();

const useUser = () => {
	return useContext(UserContext);
};

const UserProvider = ({ children }) => {
	const toast = useToast();
	const [userData, setUserData] = useState();
	const [loading, setLoading] = useState(true);

	const { currentUser } = useAuth();
	const uid = currentUser?.uid;

	useEffect(() => {
		if (!uid) {
			setLoading(false);
			return;
		}
		const userDataListener = onSnapshot(doc(db, "users", uid), (doc) => {
			setUserData(doc.data());
			setLoading(false);
		});
		return () => userDataListener();
	}, [uid]);

	const addToCart = async (menuId, menuname, price) => {
		const existingItem = userData.cartItems.find(
			(item) => item.menuId === menuId
		);

		try {
			if (!existingItem) {
				await updateDoc(doc(db, "users", uid), {
					cartItems: arrayUnion({
						menuId: menuId,
						price: price,
						quantity: 1,
						totalPrice: price,
						menuname: menuname,
					}),
					cartTotal:
						sum(userData.cartItems.map((item) => item.totalPrice)) +
						price,
				});
				toast.closeAll();
				toast({
					title: "Added to cart",
					description: `${menuname} added to cart`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice += price;
				await updateDoc(doc(db, "users", uid), {
					cartItems: userData.cartItems,
					cartTotal: sum(
						userData.cartItems.map((item) => item.totalPrice)
					),
				});
				toast.closeAll();
				toast({
					title: "Updated the cart",
					description: `Added one more ${menuname} to cart`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast.closeAll();
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const removeFromCart = async (menuId) => {
		const existingItem = userData.cartItems.find(
			(item) => item.menuId === menuId
		);

		if (existingItem.quantity === 1) {
			userData.cartItems = userData.cartItems.filter(
				(item) => item.menuId !== menuId
			);
		} else {
			existingItem.quantity--;
			existingItem.totalPrice -= existingItem.price;
		}

		try {
			await updateDoc(doc(db, "users", uid), {
				cartItems: userData.cartItems,
				cartTotal: sum(
					userData.cartItems.map((item) => item.totalPrice)
				),
			});
			toast.closeAll();
			toast({
				title: "Removed from Cart",
				description: `${existingItem.menuname} removed from cart`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast.closeAll();
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const clearCart = async () => {
		await updateDoc(doc(db, "users", uid), {
			cartItems: [],
			cartTotal: 0,
		});
	};

	const addNewAddress = async (address) => {
		try {
			await updateDoc(doc(db, "users", uid), {
				addresses: arrayUnion({
					...address,
					addressId: `${address.name}-${nanoid()}`,
				}),
			}).then(() => {
				toast.closeAll();
				toast({
					title: "Address Added",
					description: `${address.addressName} added successfully`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			});
		} catch (error) {
			toast.closeAll();
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const deleteAddress = async (addressId) => {
		await updateDoc(doc(db, "users", uid), {
			addresses: userData.addresses.filter(
				(address) => address.addressId !== addressId
			),
		});
	};

	const value = {
		userData,
		addToCart,
		removeFromCart,
		clearCart,
		addNewAddress,
		deleteAddress,
	};

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<UserContext.Provider value={value}>
			{!loading && children}
		</UserContext.Provider>
	);
};

export { UserProvider };
export { useUser };
