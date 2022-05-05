import { NewtonsCradle } from '@uiball/loaders';
function Loading() {
	return (
		<span className="loading">
			<div className="text">Loading...</div>
			<NewtonsCradle size={55} color="black" />
		</span>
	);
}

export default Loading;
