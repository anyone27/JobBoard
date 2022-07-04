import db from '../../../helpers/db';

export default async function registerCompany(req, res) {
	if (req.method === 'GET') {
		// request data on all companies registered
		// TODO query companies
		let query = await db({
			query: 'SELECT Companies.id, Companies.name FROM Companies',
			values: '',
		});
		res.send(query);
	}

	if (req.method === 'POST') {
		const insert = [
			req.body.company_name,
			req.body.company_website,
			req.body.company_description,
		];
		// query database for any companies with this name
		let validate = await db({
			query: 'SELECT name FROM Companies WHERE name = ?',
			values: req.body.company_name,
		});

		// if company already exists then do not create and alert user
		if (validate.length > 0) {
			console.log('duplicate company exists');
			res.send('Company already exists');

			// if not, insert company data to the DB
		} else {
			const result = await db({
				query: 'INSERT INTO Companies(name, website, description) VALUES(?)',
				values: [insert],
			});

			// find company id in newly created records
			const companyid = await db({
				query: 'SELECT id FROM Companies WHERE name = ?',
				values: req.body.company_name,
			});

			// insert user as first employee and admin of new company
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

			if (res.status(200)) {
				res.send('company registered');
			}
		}
	}
}
