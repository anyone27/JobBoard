import db from '../../helpers/db';

export default async function logout(req, res) {
	if (req.method === 'POST') {
		const auth_token = 'logoutToken';
		const authorise = await db({
			query: `UPDATE Users SET auth_token=(?) WHERE id = (?)`,
			values: [auth_token, req.body.user_id],
		});
		res.send('logged out');
	}
}
