import Router from 'next/router';

function Register() {
	const registerUser = async (event) => {
		event.preventDefault();
		const password = event.target.password.value;

		const res = await fetch('./api/auth/registeruser', {
			method: 'POST',
			body: JSON.stringify({
				first_name: event.target.first_name.value,
				surname: event.target.surname.value,
				email: event.target.email.value,
				password: password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			let json = await res.json();
			if (json[0] === false && json[1] === 1) {
				console.log('Email not recognised');
				alert('Email not recognised');
			} else if (json[0] === false && json[1] === 2) {
				console.log('Incorrect Password');
				alert('Incorrect Password');
			} else if (json[0] === true) {
				sessionStorage.setItem('loggedIn', 'true');
				sessionStorage.setItem('userId', json[1].id);
				sessionStorage.setItem('userName', json[1].name);
				Router.push('/dashboard');
			}
		} else {
			alert('HTTP-Error: ' + res.status);
		}
	};

	return (
		<section className="main-container">
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<div className="form-item required-item">
					<input
						id="first_name"
						type="text"
						placeholder="First Name"
						required
					/>
				</div>
				<div className="form-item required-item">
					<input id="surname" type="text" placeholder="Surname" required />
				</div>
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
				<button type="submit">Register</button>
			</form>
		</section>
	);
}

export default Register;
