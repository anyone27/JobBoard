import { useEffect, useMemo, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
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
	const [displayVacancies, setDisplayVacancies] = useState(true);
	const [displayApplications, setDisplayApplications] = useState(true);

	const router = useRouter();

	const { data: session, status } = useSession();

	if (status === 'authenticated') {
		useEffect(() => {
			setUserName(session.user.name);
			recentPostings();
			recentApplication();
			fetchUserCompanies();
		}, [session.user.id]);

		async function recentApplication() {
			setApplicationArray([]);

			if (session.user.id) {
				const res = await fetch(`/api/applications/${session.user.id}`);
				let data = await res.json();
				setApplicationArray(data);
			}
		}

		const recentPostings = async () => {
			setPostArray([]);
			if (userId != '') {
				const res = await fetch(`/api/vacancies/${userId}`);
				let data = await res.json();
				setPostArray(data);
			}
		};

		const fetchUserCompanies = async () => {
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
}

export async function getServerSideProps(ctx) {
	return {
		props: {
			session: await getSession(ctx),
		},
	};
}

export default DashboardPage;
