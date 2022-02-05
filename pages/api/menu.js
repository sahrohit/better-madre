// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	fetch(process.env.NEXT_PUBLIC_FIREBASE_REALTIME_DATABASE_URL)
		.then((response) => {
			console.log(response.body.json());
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(404).json({ message: error });
		});
}
