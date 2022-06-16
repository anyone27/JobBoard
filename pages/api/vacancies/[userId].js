import db from '../../../helpers/db';

export default async function Jobpost(req, res) {
	if (req.method === 'GET') {
		let query = await db({
			query: 'SELECT * FROM Vacancies WHERE user_id = ?',
			values: req.query.userId,
		});
		res.send(query);
	}
}
