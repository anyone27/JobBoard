import db from '../../db';

export default async function registerUser(req, res) {
	const insert = [
		req.body.first_name,
		req.body.surname,
		req.body.email,
		req.body.password,
	];

	if (req.method === 'POST') {
		let validate = await db({
			query: 'SELECT email from Users WHERE email = ?',
			values: req.body.email,
		});

		if (validate.length > 0) {
			res.send('Email already in use');
		} else {
			const result = await db({
				query:
					'INSERT INTO Users(first_name, surname, email, hashed_password) VALUES(?)',
				values: [insert],
			});
			const response = await db({
				query:
					'SELECT id, first_name, hashed_password from Users WHERE email = ?',
				values: req.body.email,
			});

			// console.log('response', response[0]);

			if (!response[0]) {
				console.log('Email not recognised');
				res.send([false, 1]);
			} else {
				if (response[0].hashed_password === req.body.password) {
					console.log('logged in successfully');
					let userInfo = {
						id: response[0].id,
						name: response[0].first_name,
					};
					// console.log(userInfo);
					res.send([true, userInfo]);
				}
			}
		}
	} else {
		res.send('Error');
	}
}