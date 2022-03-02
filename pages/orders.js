import React from "react";
import { useRouter } from "next/router";
import SearchOrderPage from "@components/Orders/SearchOrder";
import { Navbar } from "@components/Navbar";

import OrderDetail from "@components/Orders/OrderDetail";

const Orders = () => {
	const router = useRouter();
	const { orderid } = router.query;

	return (
		<>
			<Navbar position="sticky" />
			{orderid ? <OrderDetail orderid={orderid} /> : <SearchOrderPage />}
		</>
	);
};

export default Orders;
