import mysql from 'serverless-mysql';
const db = mysql({
	config: {
		host: process.env.DB_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
	},
});
export default async function excuteQuery({ query, values }) {
	try {
		const results = await db.query(query, values);
		await db.end();
		return results;
	} catch (error) {
		return { error };
	}
}
