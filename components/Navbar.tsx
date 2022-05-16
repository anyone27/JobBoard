import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const router = useRouter();

	function verifyLoggedIn() {
		let temp1 = localStorage.getItem('loggedIn');
		if (temp1 === 'true') {
			setLoggedIn(true);
		}

		let temp2 = localStorage.getItem('userId');
		setUserId(temp2);

		let temp3 = localStorage.getItem('userName');
		setUserName(temp3);
	}

	useEffect(() => {
		verifyLoggedIn();
	});

	function signOut() {
		localStorage.clear();
		setLoggedIn(false);
		router.reload();
	}

	return (
		<nav>
			<section className="heading-left">
				<Link href="/">
					<a className="logo">JobListings</a>
				</Link>
				{loggedIn && (
					<Link href="/">
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
					<Link href="/about">
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
