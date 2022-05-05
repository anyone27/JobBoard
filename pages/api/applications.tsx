import db from '../../db';

export default async function Applications(req, res) {
	if (req.method === 'GET') {
		const res = await db({
			query: 'SELECT ',
		});
	}

	if (req.method === 'POST') {
	}
}
