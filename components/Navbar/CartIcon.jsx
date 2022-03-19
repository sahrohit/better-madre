import React, { useCallback } from "react";
import { chakra, IconButton } from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import { useRouter } from "next/router";
import { useUser } from "@contexts/UserContext";

const CartIcon = ({ items }) => {
	const { userData } = useUser();
	const router = useRouter();
	const itemLength =
		userData?.cartItems?.reduce((acc, obj) => acc + obj.quantity, 0) || 0;

	return (
		<chakra.span pos="relative" display="inline-block">
			<IconButton
				aria-label="Cart"
				px={2}
				fontSize={"2xl"}
				icon={<BsCart3 />}
				onClick={() => router.push("/cart")}
			/>
			<chakra.span
				pos="absolute"
				top="-1px"
				right="-1px"
				px={2}
				py={1}
				fontSize="xs"
				fontWeight="bold"
				lineHeight="none"
				color="green.100"
				transform="translate(20%,-20%)"
				bg="green.600"
				rounded="full"
			>
				{itemLength}
			</chakra.span>
		</chakra.span>
	);
};

export default CartIcon;
