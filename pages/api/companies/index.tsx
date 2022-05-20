import db from '../../../db';

export default async function registerCompany(req, res) {
	if (req.method === 'GET') {
		// TODO query companies
		let query = await db({
			query: 'SELECT Companies.id, Companies.name FROM Companies',
			values: '',
		});
		res.send(query);
	}

	const insert = [
		req.body.company_name,
		req.body.company_website,
		req.body.company_description,
	];

	if (req.method === 'POST') {
		let validate = await db({
			query: 'SELECT name FROM Companies WHERE name = ?',
			values: req.body.company_name,
		});
		console.log('validate', validate);

		if (validate.length > 0) {
			console.log('duplicate company exists');
			res.send('Company already exists');
		} else {
			const result = await db({
				query: 'INSERT INTO Companies(name, website, description) VALUES(?)',
				values: [insert],
			});

			console.log('result', result);

			const companyid = await db({
				query: 'SELECT id FROM Companies WHERE name = ?',
				values: req.body.company_name,
			});

			const employeeInsert = [
				req.body.user_id,
				companyid[0].id,
				req.body.employee_position,
				'Admin',
				true,
				true,
			];

			const employee = await db({
				query:
					'INSERT INTO Employees(user_id, company_id, position, permissions, admin, current) VALUES(?)',
				values: [employeeInsert],
			});

			console.log('employee', employee);

			if (res.status(200)) {
				res.send('company registered');
			}
		}
	}
}
