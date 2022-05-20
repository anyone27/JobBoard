import { useEffect, useMemo, useState } from 'react';
import CreateCompany from '../components/CreateCompany';
import PostVacancy from '../components/PostVacancy';
import { useRouter } from 'next/router';
import Vacancies from '../components/Vacancies';
import Icons from '../components/Icons';

function DashboardPage() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [displayJobPosting, setDisplayJobPosting] = useState(false);
	const [displayCreateCompany, setDisplayCreateCompany] = useState(false);
	const [userCompanies, setUserCompanies] = useState([]);
	const [postArray, setPostArray] = useState([]);
	const [applicationArray, setApplicationArray] = useState([]);
	const [displayVacancies, setDisplayVacancies] = useState(false);
	const [displayApplications, setDisplayApplications] = useState(false);

	const router = useRouter();

	function verifyLoggedIn() {
		if (localStorage.getItem('loggedIn') === 'true') {
			setLoggedIn(true);
			setUserId(localStorage.getItem('userId'));
			setUserName(localStorage.getItem('userName'));
		} else {
			router.push('/');
		}
	}
	useEffect(() => {
		verifyLoggedIn();
	}, []);

	useEffect(() => {
		recentApplications();
		recentPostings();
		fetchCompanies();
	}, [userId]);

	const recentApplications = async () => {
		if (!userId) {
			verifyLoggedIn();
		}
		if (userId !== '') {
			const res = await fetch(`/api/applications/${userId}`);
			let data = await res.json();
			console.log('data', data);
			// setApplicationArray(
			// 	data.map(function (element) {
			// 		return (
			// 			<div className="application-card" key={element.id}>
			// 				<h2>{element.user_id}</h2>
			// 				<h3>{element.vacancy_id}</h3>
			// 				{/* <p>{element.position_description}</p> */}
			// 			</div>
			// 		);
			// 	})
			// );
			console.log(applicationArray);
		}
	};

	const recentPostings = async () => {
		if (!userId) {
			verifyLoggedIn();
		}
		if (userId !== '') {
			const res = await fetch(`/api/vacancies/${userId}`);
			let data = await res.json();
			setPostArray(data);
		}
	};

	async function fetchCompanies() {
		let linkedCompanies = [];
		let companyArray = [];

		const result = await fetch(`/api/companies/${userId}`);
		let data = await result.json();

		for (let [key, value] of Object.entries(data)) {
			linkedCompanies.push(data[key]);
		}
		// populate company selection drop down from user associated companies
		if (data) {
			companyArray = linkedCompanies.map(function (element) {
				return (
					<option key={element.company_id} value={element.company_id}>
						{element.name}
					</option>
				);
			});
		}
		setUserCompanies(companyArray);
	}

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

	const handleDropDown = (reference) => {
		if (reference === 'posts') {
			if (displayVacancies) {
				setDisplayVacancies(false);
			} else {
				setDisplayVacancies(true);
			}
		} else if (reference === 'applications') {
			if (displayApplications) {
				setDisplayApplications(false);
			} else {
				setDisplayApplications(true);
			}
		}
	};

	return (
		<section className="main-container">
			<h1>{userName}&apos;s Dashboard</h1>
			<button onClick={postJobForm}>Post Vacancy</button>
			<button onClick={createCompanyForm}>Register Company</button>
			{displayJobPosting && (
				<PostVacancy companyArray={userCompanies} userId={userId} />
			)}
			{displayCreateCompany && <CreateCompany userId={userId} />}

			{applicationArray.length > 0 && (
				<>
					<h2
						className="toggle-collapse"
						onClick={handleDropDown('applications')}
					>
						Jobs Applied to
						<Icons direction={displayApplications} />
					</h2>
					{displayApplications && { applicationArray }}
				</>
			)}
			{postArray.length > 0 && (
				<>
					<h2
						className="toggle-collapse"
						onClick={() => handleDropDown('posts')}
					>
						{userName}&apos;s Job Posts
						<Icons direction={displayVacancies} />
					</h2>
					{displayVacancies && <Vacancies vacancies={postArray} />}
				</>
			)}
		</section>
	);
}

export default DashboardPage;
