import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession, signOut } from 'next-auth/react';

function Navbar() {
	const { data: session, status } = useSession();

	const router = useRouter();

	// if signout, reroute to home page
	function handleSignOut() {
		signOut({ callbackUrl: 'http://localhost:3000' });
	}

	// render specific routes if the user is logged in or not
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
