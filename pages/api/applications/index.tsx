import db from '../../../db';

export default async function PostApplication(req, res) {
	if (req.method === 'POST') {
		const insert = [req.body.userId, req.body.job_id];
		const result = await db({
			query: 'INSERT INTO Applications(user_id, vacancy_id) VALUES(?)',
			values: [insert],
		});
		console.log(result);
		res.send('application successful');
	}
}
