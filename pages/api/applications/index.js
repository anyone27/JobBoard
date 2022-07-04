import db from '../../../helpers/db';

export default async function PostApplication(req, res) {
	// register user application against vacancy
	if (req.method === 'POST') {
		const insert = [req.body.userId, req.body.job_id];
		const result = await db({
			query: 'INSERT INTO Applications(user_id, vacancy_id) VALUES(?)',
			values: [insert],
		});

		res.send('application successful');
	} else {
	}
}
