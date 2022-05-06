import countrydata from '../countrycodes.json';
import currencycodes from '../currencycodes.json';
import { useEffect } from 'react';
import Router from 'next/router';

function PostJobs({ userId, companyArray }) {
	let countryArray = [];
	let currencyArray = [];

	// populate country selection dropdown
	for (const key in countrydata) {
		countryArray.push(
			<option key={key} value={key}>
				{countrydata[key]}
			</option>
		);
	}

	for (const key in currencycodes) {
		currencyArray.push(
			<option key={key} value={currencycodes[key].code}>
				{currencycodes[key].name}
			</option>
		);
	}

	// console.log(currencycodes[1]);

	const postJob = async (event) => {
		event.preventDefault();

		// Validate that the lower pay and upper pay are correlated
		if (event.target.lowerpay.value > event.target.upperpay.value) {
			alert('lowerpay band is greater than upper pay band');
		} else if (event.target.upperpay.value < event.target.lowerpay.value) {
			alert('upperpay band is less than lower pay band');
		} else {
			console.log('jobtitle', event.target.jobtitle.value);
			// Submit data to api
			const res = await fetch('./api/vacancies', {
				method: 'POST',
				body: JSON.stringify({
					userId: userId,
					companyId: event.target.company.value,
					jobtitle: event.target.jobtitle.value,
					jobdescription: event.target.jobdescription.value,
					city: event.target.positionlocation.value,
					fulltime_parttime_contract:
						event.target.fulltime_parttime_contract.value,
					country: event.target.countryselect.value,
					currency_symbol: event.target.currency.value,
					lowerpay: event.target.lowerpay.value,
					upperpay: event.target.upperpay.value,
					onsite_remote_hybrid: event.target.onsite_remote_hybrid.value,
					expires: event.target.expires.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.ok) {
				console.log('successfully posted vacancy');
				Router.reload();
			}
		}
	};

	return (
		<section className="postJob-form">
			<form onSubmit={postJob}>
				<h2>Post Vacancy</h2>

				{/* select which company the vacancy will be associated with */}
				<div className="form-item">
					<label className="required-item" htmlFor="company">
						Company
					</label>
					<select name="company" id="company" required>
						{companyArray}
					</select>
				</div>

				{/* Enter the title for the job vacancy */}
				<div className="form-item">
					<label htmlFor="jobtitle" className="required-item">
						Job Title
					</label>
					<input id="jobtitle" type="text" required />
				</div>

				{/* Select the currency relevant for the job posting */}
				<div className="form-item">
					<label htmlFor="currency">Select Currency</label>
					<select id="currency" defaultValue="GBP">
						{currencyArray}
					</select>
				</div>

				{/* Enter the lower pay bracket and the upper pay bracket if it is a range */}
				<div className="form-item">
					<label htmlFor="lowerpay" className="required-item">
						Lower payband
					</label>
					<input id="lowerpay" type="number" required />

					<label htmlFor="upperpay">Upper payband</label>
					<input id="upperpay" type="number" />
				</div>

				{/* Enter the description for the vacancy limited to 1000 characters */}
				<div className="form-item">
					<label htmlFor="jobdescription" className="required-item">
						Job Description
					</label>
					<textarea
						id="jobdescription"
						cols={120}
						rows={40}
						required
					></textarea>
				</div>

				{/* Enter the location/city for the job posting if relevant */}
				<div className="form-item">
					<label htmlFor="positionlocation">Location/City</label>
					<input id="positionlocation" type="text" defaultValue="" />

					{/* Select the country relevant for the job posting */}

					<label htmlFor="countryselect">Select Country</label>
					<select id="countryselect" defaultValue="GB">
						{countryArray}
					</select>
				</div>

				{/* Select either remote, hybrid or onsite position */}
				<div className="form-item">
					<label className="required-item" htmlFor="onsite_remote_hybrid">
						Onsite/Remote/Hybrid
					</label>
					<select
						name="onsite_remote_hybrid"
						id="onsite_remote_hybrid"
						required
					>
						<option value="onsite">Onsite</option>
						<option value="remote">Remote</option>
						<option value="hybrid">Hyrbid</option>
					</select>
				</div>

				{/* Select if it is a fulltime, parttime or contract position */}
				<div className="form-item">
					<label className="required-item" htmlFor="fulltime_parttime_contract">
						Fulltime/Parttime/Contract
					</label>
					<select
						name="fulltime_parttime_contract"
						id="fulltime_parttime_contract"
						required
					>
						<option value="fulltime">Fulltime</option>
						<option value="parttime">Parttime</option>
						<option value="contract">Contract</option>
					</select>
				</div>

				{/* Select an expiration time for the job posting from 30/60/90 days */}
				<div className="form-item">
					<label className="required-item" htmlFor="expires">
						job advert expires
					</label>
					<select name="expires" id="expires" required>
						<option value="30">30 days</option>
						<option value="60">60 days</option>
						<option value="90">90 days</option>
					</select>
				</div>

				<div className="form-item">
					<button type="submit">Post Job</button>
				</div>
			</form>
		</section>
	);
}

export default PostJobs;
