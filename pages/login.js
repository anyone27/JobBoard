import { signIn } from 'next-auth/react';

function loginPage() {
	const handleLogin = async (event) => {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		signIn('credentials', {
			email,
			password,
			callbackUrl: `http://localhost:3000/dashboard`,
		});
	};

	return (
		<section className="main-container">
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
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

export default loginPage;
