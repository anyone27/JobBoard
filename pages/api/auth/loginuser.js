import db from '../../../helpers/db';

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
			res.status(500).json({ error: 'Email not recognised' });
		} else {
			if (bcrypt.compareSync(req.body.password, validate[0].hashed_password)) {
				let userInfo = {
					id: validate[0].id,
					name: validate[0].first_name,
				};

				console.log('logged in successfully');
				res.send(userInfo);
			} else {
				console.log('incorrect password');
				res.status(500).json({ error: 'Incorrect Password' });
			}
		}
	} else {
		res.send('Error');
	}
}
