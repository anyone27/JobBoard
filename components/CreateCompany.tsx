import Router from 'next/router';

function CreateCompany({ userId }) {
	const createCompany = async (event) => {
		// event.preventDefault();
		const res = await fetch('./api/companies/', {
			body: JSON.stringify({
				company_name: event.target.companyname.value,
				company_website: event.target.companywebsite.value,
				company_description: event.target.companydescription.value,
				employee_position: event.target.employeeposition.value,
				user_id: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (res.ok) {
			Router.push('/');
		}
	};

	return (
		<section className="createcompany-form">
			<form onSubmit={createCompany}>
				<h2>Create Company</h2>
				<div className="form-item">
					<label className="required-item" htmlFor="companyname">
						Company Name
					</label>
					<input id="companyname" type="text" required />
				</div>
				<div className="form-item">
					<label className="required-item" htmlFor="companywebsite">
						Website
					</label>
					<input id="companywebsite" type="text" required />
				</div>
				<div className="form-item">
					<label className="required-item" htmlFor="companydescription">
						Description of Company
					</label>
					<textarea
						name="companydescription"
						id="companydescription"
						cols={120}
						rows={10}
						required
					></textarea>
				</div>
				<div className="form-item">
					<label className="required-item" htmlFor="employeeposition">
						Employee Position
					</label>
					<input id="employeeposition" type="text" required />
				</div>
				<button type="submit">Register</button>
			</form>
		</section>
	);
}

export default CreateCompany;
