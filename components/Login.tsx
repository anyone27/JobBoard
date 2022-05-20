import Router from 'next/router';

function Login() {
	const loginUser = async (event) => {
		event.preventDefault();

		const password = event.target.password.value;

		const response = await fetch('./api/loginuser', {
			method: 'POST',
			body: JSON.stringify({
				// TODO hash password
				email: event.target.email.value,
				password: password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			let json = await response.json();
			if (json[0] === false && json[1] === 1) {
				console.log('Email not recognised');
				alert('Email not recognised');
			} else if (json[0] === false && json[1] === 2) {
				console.log('Incorrect Password');
				alert('Incorrect Password');
			} else if (json[0] === true) {
				console.log('logged in successfully ');
				localStorage.setItem('loggedIn', 'true');
				localStorage.setItem('userId', json[1].id);
				localStorage.setItem('userName', json[1].name);
				Router.push('/');
			}
		} else {
			alert('HTTP-Error: ' + response.status);
		}
	};

	return (
		<section className="main-container">
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<div className="form-item required-item">
					<input id="email" type="email" placeholder="Email" required />
				</div>
				<div className="form-item required-item">
					<input
						id="password"
						type="password"
						placeholder="Password"
						required
					/>
				</div>
				<button type="submit">Log In</button>
			</form>
		</section>
	);
}

export default Login;
