import { useState, useEffect } from 'react';

function Profile() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');

	function verifyLoggedIn() {
		if (localStorage.getItem('loggedIn') === 'true') {
			setLoggedIn(true);
		}
		setUserId(localStorage.getItem('userId'));
		setUserName(localStorage.getItem('userName'));
	}

	useEffect(() => {
		verifyLoggedIn();
	});

	return (
		<section className="main-container">
			<h1>Profile</h1>
			<p>Welcome {userName}</p>
		</section>
	);
}

export default Profile;
