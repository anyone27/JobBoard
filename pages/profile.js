import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';

function Profile() {
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const { data: session, status } = useSession();

	// on page load, and update of status variable, set the user name and id
	useEffect(() => {
		setUserName(session.user.name);
		setUserId(session.id);
	}, [status]);

	return (
		<section className="main-container">
			<h1>Profile</h1>
			<p>Welcome {userName}</p>
		</section>
	);
}

// Intercept before page load and verify user is logged in and user id, if not logged in redirect to login page
export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}
	return {
		props: {
			session: session,
		},
	};
}

export default Profile;
