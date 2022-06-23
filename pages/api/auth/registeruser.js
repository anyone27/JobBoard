import db from '../../../helpers/db';

export default async function registerUser(req, res) {
	if (req.method === 'POST') {
		let validate = await db({
			query: 'SELECT email from Users WHERE email = ?',
			values: req.body.email,
		});

		if (validate.length > 0) {
			res.send('Email already in use');
		} else {
			const bcrypt = require('bcryptjs');
			let hash = bcrypt.hashSync(req.body.password, 14);

			const insert = [
				req.body.first_name,
				req.body.surname,
				req.body.email,
				hash,
			];
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

			if (!response[0]) {
				console.log('Email not recognised');
				res.send([false, 1]);
			} else {
				if (response[0].hashed_password === hash) {
					console.log('logged in successfully');
					res.send([true, 2]);
				}
			}
		}
	} else {
		res.send('Error');
	}
}
