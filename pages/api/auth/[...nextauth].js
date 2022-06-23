import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Email & Password',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)

				const res = await fetch('http://localhost:3000/api/auth/loginuser', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' },
				});
				const user = await res.json();

				// If no error and we have user data, return it
				if (res.ok && user) {
					return {
						name: user.name,
						id: user.id,
					};
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			if (token) {
				session.id = token.id;
			}
			return session;
		},
		secret: process.env.NEXTAUTH_SECRET,
		// jwt: {
		// 	secret: process.env.NEXTAUTH_SECRET,
		// 	encryption: true,
		// },
	},
	async signIn() {
		const isAllowedToSignIn = true;
		if (isAllowedToSignIn) {
			return '/dashboard';
		} else {
			// Return false to display a default error message
			return '/';
			// Or you can return a URL to redirect to:
			// return '/unauthorized'
		}
	},
	pages: {
		signIn: '/login',
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	},
});
