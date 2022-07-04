import db from '../../../helpers/db';

export default async function Companies(req, res) {
	// query DB for all companies related to a specific user
	if (req.method === 'GET') {
		const data = await db({
			query:
				'SELECT company_id, name FROM Companies INNER JOIN Employees ON Companies.id = Employees.company_id WHERE Employees.user_id = ?',
			values: req.query.userId,
		});
		res.send(data);
	}
}
