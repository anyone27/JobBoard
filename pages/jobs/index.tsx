import { useState, useEffect } from 'react';
import db from '../../db';

import Vacancies from '../../components/Vacancies';

export async function getServerSideProps(req, res) {
	let query = await db({
		query:
			'SELECT * FROM Vacancies INNER JOIN Companies ON Vacancies.company_id=Companies.id ORDER BY Vacancies.created DESC LIMIT 30',
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
