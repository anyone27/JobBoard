import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Job Listings</title>
				<meta name="keywords" content="job listings" />
			</Head>
			<Navbar />
			{/* <Sidebar /> */}
			<main>{children}</main>
			<Footer />
		</>
	);
}
