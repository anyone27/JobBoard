import countrydata from '../countrycodes.json';
import currencycodes from '../currencycodes.json';
import { useState, useEffect } from 'react';
import Router from 'next/router';

function PostJobs({ companyData, userId }) {
	const [isPayRange, setIsPayRange] = useState(false);

	let countryArray = [];
	let currencyArray = [];
	let companyArray = [];

	for (const key in companyData) {
		companyArray.push(
			<option
				key={companyData[key].company_id}
				value={companyData[key].company_id}
			>
				{companyData[key].name}
			</option>
		);
	}

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

	const handlePayRange = () => {
		if (isPayRange) {
			setIsPayRange(false);
		} else {
			setIsPayRange(true);
		}
	};

	const postJob = async (event) => {
		event.preventDefault();
		console.log('userId', userId);

		// Validate that the lower pay and upper pay are correlated
		if (
			isPayRange &&
			event.target.lowerpay.value > event.target.upperpay.value
		) {
			alert('lowerpay band is greater than upper pay band');
		} else {
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
				alert('Vacancy Posted');
				console.log('successfully posted vacancy');
				Router.reload();
			}
		}
	};

	if (companyArray) {
		return (
			<section>
				<form onSubmit={postJob}>
					<h2>Post Vacancy</h2>

					{/* select which company the vacancy will be associated with */}
					<div className="form-item required-item">
						<select name="company" id="company" required>
							<option key="null" value="" disabled selected>
								Choose a company
							</option>
							{companyArray}
						</select>
					</div>

					{/* Enter the title for the job vacancy */}
					<div className="form-item required-item">
						<input id="jobtitle" type="text" placeholder="Job Title" required />
					</div>

					{/* Select the currency relevant for the job posting */}
					<div className="form-item">
						<select id="currency">
							<option key="null" value="" disabled selected>
								Choose a currency
							</option>
							{currencyArray}
						</select>
					</div>

					{/* Enter the lower pay bracket and the upper pay bracket if it is a range */}
					<div className="form-item required-item">
						{isPayRange && (
							<>
								<input
									id="lowerpay"
									type="number"
									placeholder="Lower Payband"
									required
								/>
								<input
									id="upperpay"
									type="number"
									placeholder="Upper Payband"
								/>
							</>
						)}
						{!isPayRange && (
							<>
								<input
									id="lowerpay"
									type="number"
									placeholder="Salary/hourly pay"
									required
								/>
								<input
									id="upperpay"
									type="number"
									placeholder="Upper Payband"
									defaultValue={0}
									hidden
								/>
							</>
						)}

						<div className="checkbox">
							<label className="checkbox" htmlFor="payrange">
								Is Offered Salary a Range?
							</label>
							<input
								type="checkbox"
								name="payrange"
								id="payrange"
								onClick={handlePayRange}
							/>
						</div>
					</div>

					{/* Enter the description for the vacancy limited to 1000 characters */}
					<div className="form-item required-item">
						<textarea
							id="jobdescription"
							cols={120}
							rows={40}
							placeholder="Job Description"
							required
						></textarea>
					</div>

					{/* Enter the location/city for the job posting if relevant */}
					<div className="form-item">
						<input
							id="positionlocation"
							type="text"
							placeholder="Location/City"
						/>

						{/* Select the country relevant for the job posting */}
					</div>
					<div className="form-item">
						<select id="countryselect">
							<option key="null" value="" disabled selected>
								Select Country
							</option>
							{countryArray}
						</select>
					</div>

					{/* Select either remote, hybrid or onsite position */}
					<div className="form-item required-item">
						<select
							name="onsite_remote_hybrid"
							id="onsite_remote_hybrid"
							required
						>
							<option key="0" value="" disabled selected>
								is this role Onsite, Remote or Hybrid?
							</option>
							<option key="1" value="On Site">
								Onsite
							</option>
							<option key="2" value="Remote">
								Remote
							</option>
							<option key="3" value="Hybrid">
								Hybrid
							</option>
						</select>
					</div>

					{/* Select if it is a fulltime, parttime or contract position */}
					<div className="form-item required-item">
						<select
							name="fulltime_parttime_contract"
							id="fulltime_parttime_contract"
							required
						>
							<option key="0" value="" disabled selected>
								is this role Fulltime, Parttime or Contract?
							</option>
							<option key="1" value="Full Time">
								Full time
							</option>
							<option key="2" value="Part Time">
								Part time
							</option>
							<option key="3" value="Contract">
								Contract
							</option>
						</select>
					</div>

					{/* Select an expiration time for the job posting from 30/60/90 days */}
					<div className="form-item required-item">
						<select name="expires" id="expires" required>
							<option key="0" value="" disabled selected>
								When should this advert expire?
							</option>
							<option key="1" value="30">
								30 days
							</option>
							<option key="2" value="60">
								60 days
							</option>
							<option key="3" value="90">
								90 days
							</option>
						</select>
					</div>

					<div className="form-item">
						<button type="submit">Post Job</button>
					</div>
				</form>
			</section>
		);
	}
}

export default PostJobs;
