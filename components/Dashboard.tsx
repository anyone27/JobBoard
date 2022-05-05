import PostVacancy from './PostVacancy';
import CreateCompany from './CreateCompany';
import { useState } from 'react';

function Dashboard({ userId, userName }) {
	const [displayJobPosting, setDisplayJobPosting] = useState(false);
	const [displayCreateCompany, setDisplayCreateCompany] = useState(false);

	const recentApplications = async () => {
		const res = await fetch('./api/applications', {
			method: 'GET',
			body: JSON.stringify({
				userId: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res) {
			return res;
		}
	};

	const linkedCompanies = async () => {
		const res = await fetch('./api/companies', {
			method: 'GET',
			body: JSON.stringify({
				userId: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res) {
			return res;
		}
	};

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
				<PostVacancy linkedCompanies={linkedCompanies} userId={userId} />
			)}
			{displayCreateCompany && <CreateCompany userId={userId} />}
			<h2>Jobs Applied to</h2>
		</section>
	);
}

export default Dashboard;
