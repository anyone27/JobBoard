import { useState, useEffect } from 'react';

function Profile() {
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

	return (
		<section className="main-container">
			<h1>Profile</h1>
			<p>Welcome {userName}</p>
		</section>
	);
}

export default Profile;
