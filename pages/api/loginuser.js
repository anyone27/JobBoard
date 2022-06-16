import db from '../../helpers/db';

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
				const auth_token = 'loginToken';
				const authorise = await db({
					query: `UPDATE Users SET auth_token=(?) WHERE email = (?)`,
					values: [auth_token, req.body.email],
				});
				let userInfo = {
					id: validate[0].id,
					name: validate[0].first_name,
				};

				console.log('userId', validate[0].id);
				const date = new Date();
				console.log('Full date', date);
				console.log('expires', date + 1);
				res.setHeader(
					'Set-Cookie',
					`session=${auth_token}`,
					'HttpOnly',
					'Secure',
					'SameSite=Strict',
					'Set-Cookie',
					`userId=${validate[0].id}`,
					'Secure'
				);
				res.setHeader('Set-Cookie', `userId=${validate[0].id}`, 'Secure');
				res.setHeader(
					'Set-Cookie',
					`userName=${validate[0].first_name}`,
					'Secure',
					'SameSite=Strict'
				);

				res.send([true, userInfo]);
				console.log('logged in successfully');
			} else {
				console.log('incorrect password');
				res.send([false, 2]);
			}
		}
	} else {
		res.send('Error');
	}
}
