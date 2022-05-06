import PostVacancy from './PostVacancy';
import CreateCompany from './CreateCompany';
import { useState, useEffect } from 'react';

function Dashboard({ userId, userName }) {
	const [displayJobPosting, setDisplayJobPosting] = useState(false);
	const [displayCreateCompany, setDisplayCreateCompany] = useState(false);
	const [userCompanies, setUserCompanies] = useState([]);

	const recentApplications = async () => {
		const res = await fetch(`./api/applications/${userId}`);
		let data = await res.json();
		console.log(data);
	};

	let linkedCompanies = [];
	let companyArray = [];

	const fetchCompanies = async () => {
		const res = await fetch(`./api/companies/${userId}`);
		let data = await res.json();
		for (let [key, value] of Object.entries(data)) {
			linkedCompanies.push(data[key]);
		}
		// populate company selection drop down from user associated companies
		if (data) {
			for (let entry in linkedCompanies) {
				companyArray.push(
					<option key={entry} value={linkedCompanies[entry].company_id}>
						{linkedCompanies[entry].name}
					</option>
				);
			}
		}
	};

	fetchCompanies();
	useEffect(() => {
		setUserCompanies(companyArray);
	}, []);

	function postJobForm() {
		if (displayJobPosting) {
			setDisplayJobPosting(false);
		} else {
			setDisplayCreateCompany(false);
			setDisplayJobPosting(true);
		}
	}

	function createCompanyForm() {
		if (displayCreateCompany) {
			setDisplayCreateCompany(false);
		} else {
			setDisplayJobPosting(false);
			setDisplayCreateCompany(true);
		}
	}

	return (
		<section className="main-container">
			{/* eslint-disable-next-line react/no-unescaped-entities */}
			<h1>{userName}'s Dashboard</h1>
			<button onClick={postJobForm}>Post Vacancy</button>
			<button onClick={createCompanyForm}>Register Company</button>
			{displayJobPosting && (
				<PostVacancy companyArray={userCompanies} userId={userId} />
			)}
			{displayCreateCompany && <CreateCompany userId={userId} />}
			<h2>Jobs Applied to</h2>
		</section>
	);
}

export default Dashboard;
