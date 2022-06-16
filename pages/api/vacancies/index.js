import db from '../../../helpers/db';

export default async function Jobpost(req, res) {
	if (req.method === 'GET') {
		let query = await db({
			query: 'SELECT * FROM Vacancies',
			values: '',
		});
		// console.log('query', query);
		res.send(query);
	} else if (req.method === 'POST') {
		const insert = [
			req.body.userId,
			req.body.companyId,
			req.body.jobtitle,
			req.body.jobdescription,
			req.body.city,
			req.body.fulltime_parttime_contract,
			req.body.country,
			req.body.currency_symbol,
			req.body.lowerpay,
			req.body.upperpay,
			req.body.onsite_remote_hybrid,
			req.body.expires,
		];

		// console.log('INSERT', insert);
		let query = await db({
			query:
				'INSERT INTO Vacancies (user_id, company_id, job_title, position_description, city, fulltime_parttime_contract, country_code, currency_symbol,lower_pay_threshold, upper_pay_threshold, onsite_remote_hybrid, expires_days) VALUES (?)',
			values: [insert],
		});

		// console.log('query', query);
		// console.log('Vacancy Posted');
		res.send('Vacancy posted');
	}
}
