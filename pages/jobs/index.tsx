import { useState, useEffect } from 'react';
import db from '../../db';

import Vacancies from '../../components/Vacancies';

export async function getServerSideProps(req, res) {
	let query = await db({
		query:
			'SELECT Vacancies.id, Companies.name, job_title, position_description, city, fulltime_parttime_contract, country_code, currency_symbol, lower_pay_threshold, upper_pay_threshold, onsite_remote_hybrid, created, expires_days FROM Vacancies INNER JOIN Companies ON Vacancies.company_id = Companies.id ORDER BY Vacancies.created DESC',
		values: '',
	});

	return {
		props: {
			query: JSON.parse(JSON.stringify(query)),
		},
	};
}

function JobBoard(query) {
	return (
		<section className="main-container">
			<h1>Jobs</h1>
			<form>
				<div className="form-item">
					<input type="search" name="Search" id="search" />
					<button type="submit">Search</button>
				</div>
			</form>
			<div>
				<Vacancies vacancies={query.query} />
			</div>
		</section>
	);
}

export default JobBoard;
