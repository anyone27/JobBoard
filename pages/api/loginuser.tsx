import db from '../../db';

export default async function registerUser(req, res) {
	const query = [req.body.email, req.body.password];

	if (req.method === 'POST') {
		const validate = await db({
			query:
				'SELECT id, first_name, hashed_password from Users WHERE email = ?',
			values: req.body.email,
		});

		console.log(validate[0]);

		if (!validate[0]) {
			console.log('Email not recognised');
			res.send([false, 1]);
		} else {
			if (validate[0].hashed_password === req.body.password) {
				console.log('logged in successfully');
				let userInfo = {
					id: validate[0].id,
					name: validate[0].first_name,
				};
				console.log(userInfo);
				res.send([true, userInfo]);
			} else {
				console.log('incorrect password');
				res.send([false, 2]);
			}
		}
	} else {
		res.send('Error');
	}
}
