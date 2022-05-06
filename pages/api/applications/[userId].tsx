import db from '../../../db';

export default async function Applications(req, res) {
	res.send(req.query.userId);
	if (req.method === 'GET') {
		const data = await db({
			query:
				'SELECT Companies.name, Vacancies.job_title, Vacancies.position_description, Vacancies.city, Vacancies.lower_pay_threshold, Vacancies.upper_pay_threshold FROM Vacancies INNER JOIN Applications ON Vacancies.id = Applications.vacancy_id WHERE Applications.user_id = ?',
			values: req.query.userId,
		});
		// console.log(data);
		res.send(data);
	}

	// if (req.method === 'POST') {
	// }
}
