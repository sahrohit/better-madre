export const colorizeFromText = (text) => {
	switch (text) {
		case "pending":
			return "yellow";

		case "verified":
			return "purple";

		case "cancelled":
			return "red";

		case "left-for-delivery":
			return "cyan";

		case "delivered":
			return "green";

		case "Paid with Cash":
			return "green";

		default:
			return "pink";
	}
};
