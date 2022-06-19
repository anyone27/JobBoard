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
		if (sessionStorage.getItem('loggedIn') === 'true') {
			setLoggedIn(true);
			setUserId(sessionStorage.getItem('userId'));
			setUserName(sessionStorage.getItem('userName'));
		} else {
			setLoggedIn(false);
			setUserId('');
			setUserName('');
			router.push('/');
		}
	}

	useEffect(() => {
		verifyLoggedIn();
	}, []);

	useEffect(() => {
		recentPostings();
		recentApplication();
		fetchUserCompanies();
	}, [userId]);

	async function recentApplication() {
		verifyLoggedIn();
		setApplicationArray([]);

		if (userId != '') {
			const res = await fetch(`/api/applications/${userId}`);
			let data = await res.json();
			setApplicationArray(data);
		}
	}

	const recentPostings = async () => {
		verifyLoggedIn();

		setPostArray([]);
		if (userId != '') {
			const res = await fetch(`/api/vacancies/${userId}`);
			let data = await res.json();
			setPostArray(data);
		}
	};

	const fetchUserCompanies = async () => {
		verifyLoggedIn();

		setPostArray([]);
		if (userId != '') {
			const result = await fetch(`/api/companies/${userId}`);
			let companyData = await result.json();
			setUserCompanies(companyData);
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
			{displayJobPosting && <PostVacancy companyData={userCompanies} />}
			{displayCreateCompany && <CreateCompany userId={userId} />}

			{applicationArray.length > 0 && (
				<>
					<h2
						className="toggle-collapse"
						onClick={() => handleDropDown('applications')}
					>
						Jobs Applied to
						<Icons direction={displayApplications} />
					</h2>

					{displayApplications && <Vacancies vacancies={applicationArray} />}
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
