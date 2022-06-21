import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession, signOut } from 'next-auth/react';

function Navbar() {
	// const [loggedIn, setLoggedIn] = useState(false);
	// const [userName, setUserName] = useState('');
	// const [userId, setUserId] = useState('');
	const { data: session, status } = useSession();

	const router = useRouter();

	// function verifyLoggedIn() {
	// 	let verifyStatus = sessionStorage.getItem('loggedIn');
	// 	if (verifyStatus === 'true') {
	// 		setLoggedIn(true);
	// 	}

	// 	setUserId(sessionStorage.getItem('userId'));

	// 	setUserName(sessionStorage.getItem('userName'));
	// }

	// useEffect(() => {
	// 	verifyLoggedIn();
	// });

	// async function signOut() {
	// 	const logOut = await fetch('./api/auth/logout', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			user_id: userId,
	// 		}),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});
	// 	sessionStorage.removeItem('loggedIn');
	// 	sessionStorage.removeItem('userId');
	// 	sessionStorage.removeItem('userName');
	// 	setLoggedIn(false);
	// 	setUserId('');
	// 	setUserName('');
	// 	router.push('/');
	// }

	function handleSignOut() {
		signOut({ callbackUrl: 'http://localhost:3000' });
	}

	return (
		<nav>
			<section className="heading-left">
				<Link href="/jobs">
					<a className="logo">JobListings</a>
				</Link>
				{session && (
					<Link href="/dashboard">
						<a>Dashboard</a>
					</Link>
				)}
				{!session && (
					<Link href="/">
						<a>Home</a>
					</Link>
				)}
				<Link href="/jobs">
					<a>Jobs</a>
				</Link>
				{session && (
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				)}
				{session && (
					<Link href="/">
						<a>About</a>
					</Link>
				)}
			</section>
			<section className="heading-right">
				{!session && (
					<>
						<Link href="/login">
							<a>Login</a>
						</Link>
						<Link href="/register">
							<a>Register</a>
						</Link>
					</>
				)}
				{session && (
					<Link href="/">
						<a onClick={handleSignOut}>Logout</a>
					</Link>
				)}
			</section>
		</nav>
	);
}

export default Navbar;
