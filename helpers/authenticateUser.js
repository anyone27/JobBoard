export default async function getServerSideProps(req, res) {
	const user_token = req.Cookie;
	console.log(user_token);
	let server_token = await db({
		query: 'SELECT auth_token FROM Users WHERE id = (?)',
		values: req.body.user_id,
	});

	return {
		props: {
			query: JSON.parse(JSON.stringify(query[0])),
		},
	};
}
