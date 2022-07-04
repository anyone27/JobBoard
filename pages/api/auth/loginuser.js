import db from '../../../helpers/db';

export default async function registerUser(req, res) {
	const bcrypt = require('bcryptjs');

	if (req.method === 'POST') {
		// query DB for users details based on the user entered email
		const validate = await db({
			query:
				'SELECT id, first_name, hashed_password from Users WHERE email = ?',
			values: req.body.email,
		});

		// if no results are found, then return error code and email not recognised
		if (!validate[0]) {
			console.log('Email not recognised');
			res.status(500).json({ error: 'Email not recognised' });

			// if user details are found, confirm that the entered password matches the hashed password stored
		} else {
			if (bcrypt.compareSync(req.body.password, validate[0].hashed_password)) {
				let userInfo = {
					id: validate[0].id,
					name: validate[0].first_name,
				};

				// if successful, send user first name and user id to loginpage
				console.log('logged in successfully');
				res.send(userInfo);

				// if passwords don't match, send error code and alert to incorrect password
			} else {
				console.log('incorrect password');
				res.status(500).json({ error: 'Incorrect Password' });
			}
		}
	} else {
		res.send('Error');
	}
}
