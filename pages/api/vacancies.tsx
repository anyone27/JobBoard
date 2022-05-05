import db from '../../db';

export default async function Jobpost(req, res) {
	if (req.method === 'GET') {
		res.status(200).json({ message: 'This is a GET request' });
	} else if (req.method === 'PUSH') {
		const insert = [
			req.body.userId,
			req.body.companyId,
			req.body.jobtitle,
			req.body.jobdescription,
			req.body.city,
			req.body.fulltime,
			req.body.parttime,
			req.body.contract,
			req.body.country,
			req.body.currency_symbol,
			req.body.lowerpay,
			req.body.upperpay,
			req.body.onsite,
			req.body.hybrid,
			req.body.remote,
			req.body.expires,
		];

		let query = await db({
			query:
				'INSERT INTO Vacancies (user_id, company_id, job_title, position_description, city, full_time, part_time, contract_position, country_code, currency_symbol,lower_pay_threshold, upper_pay_threshold, office_based, hybrid, remote_only, expires_days) VALUES (?)',
			values: [insert],
		});
	}
}
