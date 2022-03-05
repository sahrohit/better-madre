import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
	apiKey: process.env.MAIL_CHIMP_API_KEY,
	server: process.env.MAIL_CHIMP_SERVER_PREFIX,
});

const subscribe = async (req, res) => {
	const { email } = req.body;

	try {
		await mailchimp.lists.addListMember(
			process.env.MAIL_CHIMP_AUDIENCE_ID,
			{
				email_address: email,
				status: "subscribed",
			}
		);
		return res.status(201).json({ error: "" });
	} catch (error) {
		return res
			.status(error.response.status)
			.json({ error: error.response });
	}
};
export default subscribe;
