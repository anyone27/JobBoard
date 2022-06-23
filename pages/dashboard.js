import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import CreateCompany from '../components/CreateCompany';
import PostVacancy from '../components/PostVacancy';
import Vacancies from '../components/Vacancies';
import Icons from '../components/Icons';

function DashboardPage() {
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [displayJobPosting, setDisplayJobPosting] = useState(false);
	const [displayCreateCompany, setDisplayCreateCompany] = useState(false);
	const [userCompanies, setUserCompanies] = useState([]);
	const [postArray, setPostArray] = useState([]);
	const [applicationArray, setApplicationArray] = useState([]);
	const [displayVacancies, setDisplayVacancies] = useState(true);
	const [displayApplications, setDisplayApplications] = useState(true);
	const limitDesc = 250;

	const { data: session, status } = useSession();

	useEffect(() => {
		setUserName(session.user.name);
		setUserId(session.id);
	}, [session.id]);

	useEffect(() => {
		recentPostings();
		recentApplication();
		fetchUserCompanies();
	}, [userId]);

	async function recentApplication() {
		setApplicationArray([]);

		if (session.user.id) {
			const res = await fetch(`/api/applications/${session.user.id}`);
			let data = await res.json();
			setApplicationArray(data);
		}
	}

	async function recentPostings() {
		setPostArray([]);
		if (userId != '') {
			const res = await fetch(`/api/vacancies/${userId}`);
			let data = await res.json();
			setPostArray(data);
		}
	}

	async function fetchUserCompanies() {
		setPostArray([]);
		if (userId != '') {
			const result = await fetch(`/api/companies/${userId}`);
			let companyData = await result.json();
			setUserCompanies(companyData);
		}
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

	if (status === 'authenticated') {
		return (
			<section className="main-container">
				<h1>{userName}&apos;s Dashboard</h1>
				<button onClick={postJobForm}>Post Vacancy</button>
				<button onClick={createCompanyForm}>Register Company</button>
				{displayJobPosting && (
					<PostVacancy companyData={userCompanies} userId={userId} />
				)}
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

						{displayApplications && (
							<Vacancies vacancies={applicationArray} limitDesc={limitDesc} />
						)}
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
						{displayVacancies && (
							<Vacancies vacancies={postArray} limitDesc={limitDesc} />
						)}
					</>
				)}
			</section>
		);
	}
}

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}
	return {
		props: {
			session: session,
		},
	};
}

export default DashboardPage;
