import Image from 'next/image';
import HomeComponent from '../components/Home';
import Dashboard from '../components/Dashboard';
import { useState, useEffect } from 'react';

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');

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
		// console.log('verifyLoggedIn', loggedIn);
	});

	if (loggedIn) {
		return (
			<>
				<Dashboard userName={userName} userId={userId} />
			</>
		);
	} else if (!loggedIn) {
		return (
			<>
				<HomeComponent />
			</>
		);
	}
}
