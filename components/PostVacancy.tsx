import countrydata from '../countrycodes.json';

function PostJobs({ userId, linkedCompanies }) {
	let countryArray = [];
	let companyArray = [];
	// let linkedCompany = { 1: 'Netflix', 2: 'Microsoft', 3: 'Amazon' };
	// populate country selection dropdown
	for (const key in countrydata) {
		countryArray.push(
			<option key={key} value={key}>
				{countrydata[key]}
			</option>
		);
	}
	// populate company selection drop down from user associated companies
	for (const key in linkedCompanies) {
		companyArray.push(
			<option key={key} value={key}>
				{linkedCompanies[key]}
			</option>
		);
	}

	const postJob = async (event) => {
		event.preventDefault();

		// Validate that the lower pay and upper pay are correlated
		if (event.target.lowerpay.value > event.target.upperpay.value) {
			alert('lowerpay band is greater than upper pay band');
		} else if (event.target.upperpay.value < event.target.lowerpay.value) {
			alert('upperpay band is less than lower pay band');
		} else {
			// submit data to api
			const res = await fetch('./api/vacancies', {
				method: 'POST',
				body: JSON.stringify({
					userId: userId,
					companyId: event.target.company.value,
					jobtitle: event.target.jobtitle.value,
					jobdescription: event.target.jobdescription.value,
					city: event.target.postionlocation.value,
					fulltime: event.target.fulltime.value,
					parttime: event.target.parttime.value,
					contract: event.target.contract.value,
					country: event.target.countryselect.value,
					currency_symbol: event.target.currency.value,
					lowerpay: event.target.lowerpay.value,
					upperpay: event.target.upperpay.value,
					onsite: event.target.onsite.value,
					hybrid: event.target.hybrid.value,
					remote: event.target.remote.value,
					expires: event.target.expires.value,
				}),
			});
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
				<div className="radio-item required-item">
					<label htmlFor="remote">Remote</label>
					<input
						type="radio"
						name="remote"
						value="remote"
						id="remote"
						required
					/>
					<label htmlFor="hybrid">Hybrid</label>
					<input type="radio" name="remote" value="hybrid" id="hybrid" />
					<label htmlFor="onsite">On-site</label>
					<input type="radio" name="remote" value="onsite" id="onsite" />
				</div>

				{/* Select if it is a fulltime, parttime or contract position */}
				<div className="radio-item required-item">
					<label htmlFor="fulltime">Full-Time</label>
					<input
						type="radio"
						name="fulltime"
						value="fulltime"
						id="fulltime"
						required
					/>
					<label htmlFor="parttime">Part-time</label>
					<input type="radio" name="fulltime" value="parttime" id="parttime" />
					<label htmlFor="contract">contract</label>
					<input type="radio" name="fulltime" value="contract" id="contract" />
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
