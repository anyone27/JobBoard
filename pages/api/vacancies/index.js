import db from '../../../helpers/db';

export default async function Jobpost(req, res) {
	// if fetch request uses GET method, fetch all vacancies from DB
	if (req.method === 'GET') {
		let query = await db({
			query: 'SELECT * FROM Vacancies',
			values: '',
		});

		res.send(query);

		// if request method is POST then insert vacancy information into DB and confirm to browser
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

		let query = await db({
			query:
				'INSERT INTO Vacancies (user_id, company_id, job_title, position_description, city, fulltime_parttime_contract, country_code, currency_symbol,lower_pay_threshold, upper_pay_threshold, onsite_remote_hybrid, expires_days) VALUES (?)',
			values: [insert],
		});
		res.send('Vacancy posted');
	}
}
