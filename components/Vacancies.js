import currencyCodes from '../helpers/currencycodes.json';

function Vacancies({ vacancies, limitDesc }) {
	let vacancyArray = [];
	let currencySymbol = '';
	let pay = '';

	// for each vacancy, render a card displaying the vacancies details and make this a clickable link which routes to a more detailed page for each vacancy
	for (let entry in vacancies) {
		// for each vacancy, iterate through the currency codes and match the currency code with the symbol to display
		for (let currency in currencyCodes) {
			if (currencyCodes[currency].code === vacancies[entry].currency_symbol) {
				currencySymbol = currencyCodes[currency].symbol;
			}
		}

		// set the upper and lower pay brackets
		const lower_pay = vacancies[entry].lower_pay_threshold;
		const upper_pay = vacancies[entry].upper_pay_threshold;
		let vacancyId = vacancies[entry].id;

		// if there is an upper pay, display the pay range
		if (upper_pay !== 0) {
			pay = currencySymbol.concat(lower_pay, ' - ', upper_pay);
			// if there is only a lower pay then display that on it's own
		} else {
			pay = currencySymbol.concat(lower_pay);
		}

		// if there is a limit passed into this component, truncate the displayed description to that many characters
		let truncatedDescription = vacancies[entry].position_description;

		if (limitDesc) {
			truncatedDescription =
				vacancies[entry].position_description.substring(0, limitDesc) + '...';
		}

		// push HTML elements to an array to be procedurally rendered
		vacancyArray.push(
			<a href={`./job/${vacancyId}`} key={vacancyId}>
				<div className="vacancy-card">
					<h1 className="jobtitle">{vacancies[entry].job_title}</h1>
					<p className="company">{vacancies[entry].name}</p>
					<p className="jobdescription">{truncatedDescription}</p>
					<p className="paybands">{pay}</p>
				</div>
			</a>
		);
	}

	return vacancyArray;
}

export default Vacancies;
