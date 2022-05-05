import { ApiError } from 'next/dist/server/api-utils';
import Router from 'next/router';

function Register() {
	const registerUser = async (event) => {
		event.preventDefault();

		const res = await fetch('./api/registeruser', {
			body: JSON.stringify({
				first_name: event.target.first_name.value,
				surname: event.target.surname.value,
				email: event.target.email.value,
				password: event.target.password.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
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
				localStorage.setItem('loggedIn', 'true');
				localStorage.setItem('userId', json[1].id);
				localStorage.setItem('userName', json[1].name);
				Router.push('/');
			}
		} else {
			alert('HTTP-Error: ' + res.status);
		}
	};

	return (
		<section className="main-container">
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<div className="form-item">
					<label htmlFor="first_name">First Name</label>
					<input id="first_name" type="text" required={true} />
				</div>
				<div className="form-item">
					<label htmlFor="surname">Surname</label>
					<input id="surname" type="text" required={true} />
				</div>
				<div className="form-item">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" required={true} />
				</div>
				<div className="form-item">
					<label htmlFor="password">Password</label>
					<input id="password" type="password" required={true} />
				</div>
				<button type="submit">Register</button>
			</form>
		</section>
	);
}

export default Register;
