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

	// on page load and update of session, set user name and id
	useEffect(() => {
		setUserName(session.user.name);
		setUserId(session.id);
	}, [session]);

	// on page load and update of user id, reset and fetch user posts, applications and registered companies
	useEffect(() => {
		recentPostings();
		recentApplication();
		fetchUserCompanies();
	}, [userId]);

	// reset user applications, in case of switched user
	async function recentApplication() {
		setApplicationArray([]);

		// if user logged in, fetch user applications and set their current state
		if (session.user.id) {
			const res = await fetch(`/api/applications/${session.user.id}`);
			let data = await res.json();
			setApplicationArray(data);
		}
	}

	// reset user posts in case of switched user
	async function recentPostings() {
		setPostArray([]);

		// if user logged in, fetch their posts and set current state
		if (userId != '') {
			const res = await fetch(`/api/vacancies/${userId}`);
			let data = await res.json();
			setPostArray(data);
		}
	}

	// reset user companies
	async function fetchUserCompanies() {
		setUserCompanies([]);

		// if user logged in, fetch related companies and update state
		if (userId != '') {
			const result = await fetch(`/api/companies/${userId}`);
			let companyData = await result.json();
			setUserCompanies(companyData);
		}
	}

	// toggle whether job posting component is displayed and hide company creation component
	function postJobForm() {
		if (displayJobPosting) {
			setDisplayJobPosting(false);
		} else {
			setDisplayCreateCompany(false);
			setDisplayJobPosting(true);
		}
	}

	// toggle whether company creation component is displayed and hide job posting component
	function createCompanyForm() {
		if (displayCreateCompany) {
			setDisplayCreateCompany(false);
		} else {
			setDisplayJobPosting(false);
			setDisplayCreateCompany(true);
		}
	}

	// handle the onClick logic for displaying both user vacancies and applications
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

	// if logged in then display user related information
	if (status === 'authenticated') {
		return (
			<section className="main-container">
				<h1>{userName}&apos;s Dashboard</h1>
				<button onClick={postJobForm}>Post Vacancy</button>
				<button onClick={createCompanyForm}>Register Company</button>

				{/* if selected, display PostVacancy component and render user companies */}
				{displayJobPosting && (
					<PostVacancy companyData={userCompanies} userId={userId} />
				)}

				{/* if selected, display Create Company component */}
				{displayCreateCompany && <CreateCompany userId={userId} />}

				{/* if there are any relevant applications, display them here as a drop down */}
				{applicationArray.length > 0 && (
					<>
						<h2
							className="toggle-collapse"
							onClick={() => handleDropDown('applications')}
						>
							{/* alternate the icon dependent on whether the item is displayed or not */}
							Jobs Applied to
							<Icons direction={displayApplications} />
						</h2>

						{/* if applications exist for current user, render them using the Vacancies component and limit the description to a set number of characters */}
						{displayApplications && (
							<Vacancies vacancies={applicationArray} limitDesc={limitDesc} />
						)}
					</>
				)}

				{/* if posts exist for current user, display them here */}
				{postArray.length > 0 && (
					<>
						<h2
							className="toggle-collapse"
							onClick={() => handleDropDown('posts')}
						>
							{userName}&apos;s Job Posts
							{/* render different icon depending on whether vacancies are displayed or not */}
							<Icons direction={displayVacancies} />
						</h2>
						{/* if vacancies exist, render them using the Vacancies component and limit description */}
						{displayVacancies && (
							<Vacancies vacancies={postArray} limitDesc={limitDesc} />
						)}
					</>
				)}
			</section>
		);
	}
}

// Before page load, query server for session status and redirect if no valid session exists
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
