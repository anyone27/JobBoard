import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const router = useRouter();

	function verifyLoggedIn() {
		let verifyStatus = sessionStorage.getItem('loggedIn');
		if (verifyStatus === 'true') {
			setLoggedIn(true);
		}

		setUserId(sessionStorage.getItem('userId'));

		setUserName(sessionStorage.getItem('userName'));
	}

	useEffect(() => {
		verifyLoggedIn();
	});

	async function signOut() {
		const logOut = await fetch('./api/logout', {
			method: 'POST',
			body: JSON.stringify({
				user_id: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		sessionStorage.removeItem('loggedIn');
		sessionStorage.removeItem('userId');
		sessionStorage.removeItem('userName');
		setLoggedIn(false);
		setUserId('');
		setUserName('');
		router.push('/');
	}

	return (
		<nav>
			<section className="heading-left">
				<Link href="/">
					<a className="logo">JobListings</a>
				</Link>
				{loggedIn && (
					<Link href="/dashboard">
						<a>Dashboard</a>
					</Link>
				)}
				{!loggedIn && (
					<Link href="/">
						<a>Home</a>
					</Link>
				)}
				<Link href="/jobs">
					<a>Jobs</a>
				</Link>
				{loggedIn && (
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				)}
				{loggedIn && (
					<Link href="/">
						<a>About</a>
					</Link>
				)}
			</section>
			<section className="heading-right">
				{!loggedIn && (
					<>
						<Link href="/login">
							<a>Login</a>
						</Link>
						<Link href="/register">
							<a>Register</a>
						</Link>
					</>
				)}
				{loggedIn && (
					<Link href="/">
						<a onClick={signOut}>Logout</a>
					</Link>
				)}
			</section>
		</nav>
	);
}

export default Navbar;
