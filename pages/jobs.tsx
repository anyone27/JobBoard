import Loading from '../components/Loading';
import { useState } from 'react';

function JobBoard() {
	const [loading, setLoading] = useState(true);

	return (
		<section className="main-container">
			<h1>Jobs</h1>
			<span>
				<input type="search" name="Search" id="search" />
				<button type="submit">Search</button>
			</span>
			<div>{loading && <Loading />}</div>
		</section>
	);
}

export default JobBoard;
