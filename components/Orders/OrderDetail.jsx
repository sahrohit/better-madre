import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useToast } from "@chakra-ui/react";

const OrderDetail = ({ orderid }) => {
	const toast = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [orderDetail, setOrderDetail] = useState();

	useEffect(
		() =>
			onSnapshot(doc(db, "orders", orderid), (doc) => {
				if (doc.exists()) {
					setOrderDetail(doc.data());
				} else {
					router.push("/orders");
					toast.closeAll();
					toast({
						title: "Order not found",
						description:
							"The order you are looking for does not exist",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
				setLoading(false);
			}),
		[orderid, router, toast]
	);

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return <div>{JSON.stringify(orderDetail)}</div>;
};

export default OrderDetail;
