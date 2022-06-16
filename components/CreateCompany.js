import Router from 'next/router';

function CreateCompany({ userId }) {
	const createCompany = async (event) => {
		event.preventDefault();
		const res = await fetch('./api/companies', {
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
			alert('Company Created');
			console.log('successfully created company');
			Router.reload();
		}
	};

	return (
		<section>
			<form onSubmit={createCompany}>
				<h2>Create Company</h2>
				<div className="form-item required-item">
					<input
						id="companyname"
						type="text"
						placeholder="Company Name"
						required
					/>
				</div>
				<div className="form-item required-item">
					<input
						id="companywebsite"
						type="text"
						placeholder="Website"
						required
					/>
				</div>
				<div className="form-item required-item">
					<textarea
						name="companydescription"
						id="companydescription"
						cols={120}
						rows={10}
						placeholder="Description of Company"
						required
					></textarea>
				</div>
				<div className="form-item required-item">
					<input
						id="employeeposition"
						type="text"
						placeholder="What is your position at this company?"
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</section>
	);
}

export default CreateCompany;
