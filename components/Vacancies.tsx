import currencyCodes from '../currencycodes.json';

function Vacancies({ vacancies }) {
	let vacancyArray = [];
	let currencySymbol = '';
	for (let entry in vacancies) {
		for (let currency in currencyCodes) {
			if (currencyCodes[currency].code === vacancies[entry].currency_symbol) {
				currencySymbol = currencyCodes[currency].symbol;
			}
		}
		if (vacancies[entry].upper_pay_threshold != 0) {
			vacancyArray.push(
				<div className="vacancy" key={entry}>
					<a href="#">
						<h1 className="jobtitle">{vacancies[entry].job_title}</h1>
						<p className="company">{vacancies[entry].name}</p>
						<p className="jobdescription">
							{vacancies[entry].position_description}
						</p>
						<p className="paybands">
							{currencySymbol}
							{vacancies[entry].lower_pay_threshold} -{' '}
							{vacancies[entry].upper_pay_threshold}
						</p>
					</a>
				</div>
			);
		} else {
			vacancyArray.push(
				<div className="vacancy" key={entry}>
					<a href="#">
						<h2 className="jobtitle">{vacancies[entry].job_title}</h2>
						<h3 className="company">{vacancies[entry].name}</h3>
						<p className="jobdescription">
							{vacancies[entry].position_description}
						</p>
						<p className="paybands">
							{currencySymbol}
							{vacancies[entry].lower_pay_threshold}
						</p>
					</a>
				</div>
			);
		}
	}
	return vacancyArray;
}

export default Vacancies;
