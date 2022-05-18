import { useRouter } from 'next/router';
import db from '../../db';
import currencyCodes from '../../currencycodes.json';

function JobPost({ query }) {
	let currencySymbol = '';
	let pay = '';

	for (let currency in currencyCodes) {
		if (currencyCodes[currency].code === query.currency_symbol) {
			currencySymbol = currencyCodes[currency].symbol;
		}
	}

	const lower_pay = query.lower_pay_threshold;
	const upper_pay = query.upper_pay_threshold;

	if (upper_pay !== 0) {
		pay = currencySymbol.concat(lower_pay, ' - ', upper_pay);
	} else {
		pay = currencySymbol.concat(lower_pay);
	}
	return (
		<div className="vacancy">
			<h2 className="jobtitle">{query.job_title}</h2>
			<h3 className="company">{query.name}</h3>
			<p className="paybands">{pay}</p>
			<br />
			<p className="jobdescription">{query.position_description}</p>
			<div className="job_details">
				<ul>
					{query.city && <li>City: {query.city}</li>}
					<li>Position type: {query.fulltime_parttime_contract}</li>
					<li>Remote/onsite: {query.onsite_remote_hybrid}</li>
				</ul>
			</div>
		</div>
	);
}

export default JobPost;

export async function getServerSideProps(req, res) {
	const id = req.params.jobs_id;
	let query = await db({
		query:
			'SELECT Vacancies.id, job_title, company_id, Companies.name, position_description, city, fulltime_parttime_contract, country_code, currency_symbol, lower_pay_threshold, upper_pay_threshold, onsite_remote_hybrid, created, expires_days FROM Vacancies INNER JOIN Companies ON Vacancies.company_id = Companies.id WHERE Vacancies.id = ?',
		values: id,
	});

	return {
		props: {
			query: JSON.parse(JSON.stringify(query[0])),
		},
	};
}