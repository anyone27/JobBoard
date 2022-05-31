import db from '../../db';

export default async function registerUser(req, res) {
	const bcrypt = require('bcryptjs');

	if (req.method === 'POST') {
		const validate = await db({
			query:
				'SELECT id, first_name, hashed_password from Users WHERE email = ?',
			values: req.body.email,
		});
		if (!validate[0]) {
			console.log('Email not recognised');
			res.send([false, 1]);
		} else {
			if (bcrypt.compareSync(req.body.password, validate[0].hashed_password)) {
				console.log('logged in successfully');
				let userInfo = {
					id: validate[0].id,
					name: validate[0].first_name,
				};

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
