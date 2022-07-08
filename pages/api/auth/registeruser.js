import db from '../../../helpers/db';

export default async function registerUser(req, res) {
	if (req.method === 'POST') {
		//saerch database for user email
		let validate = await db({
			query: 'SELECT email from Users WHERE email = ?',
			values: req.body.email,
		});

		// if database already contains users with this email, do not continue and alert user
		if (validate.length > 0) {
			res.send('Email already in use');

			// If email not registered then hash user password and store details in DB
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

			// validate that email can now be found in DB, if not, then return error
			if (!response[0]) {
				console.log(response);
				console.log('Email not recognised');
				res.send([false, 1, response]);

				// validate the stored password and the hash match and confirm true
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
