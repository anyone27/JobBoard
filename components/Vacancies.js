import currencyCodes from '../currencycodes.json';

function Vacancies({ vacancies }) {
	let vacancyArray = [];
	let currencySymbol = '';
	let pay = '';
	for (let entry in vacancies) {
		for (let currency in currencyCodes) {
			if (currencyCodes[currency].code === vacancies[entry].currency_symbol) {
				currencySymbol = currencyCodes[currency].symbol;
			}
		}

		const lower_pay = vacancies[entry].lower_pay_threshold;
		const upper_pay = vacancies[entry].upper_pay_threshold;
		let vacancyId = vacancies[entry].id;

		if (upper_pay !== 0) {
			pay = currencySymbol.concat(lower_pay, ' - ', upper_pay);
		} else {
			pay = currencySymbol.concat(lower_pay);
		}

		vacancyArray.push(
			<a href={`./jobs/${vacancyId}`} key={vacancyId}>
				<div className="vacancy-card">
					<h1 className="jobtitle">{vacancies[entry].job_title}</h1>
					<p className="company">{vacancies[entry].name}</p>
					<p className="jobdescription short-description">
						{vacancies[entry].position_description}
					</p>
					<p className="paybands">{pay}</p>
				</div>
			</a>
		);
	}
	// console.log('vacancies', vacancyArray);
	return vacancyArray;
}

export default Vacancies;
