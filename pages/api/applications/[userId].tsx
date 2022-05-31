import db from '../../../db';

export default async function Applications(req, res) {
	if (req.method === 'GET') {
		const data = await db({
			query:
				'SELECT Vacancies.job_title, Vacancies.position_description, Vacancies.city, Vacancies.currency_symbol, Vacancies.lower_pay_threshold, Vacancies.upper_pay_threshold, Companies.name FROM Vacancies INNER JOIN Applications ON Vacancies.id = Applications.vacancy_id INNER JOIN Companies ON Vacancies.company_id = Companies.id WHERE Applications.user_id = ?',
			values: req.query.userId,
		});

		res.send(data);
	}
}
