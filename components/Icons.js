function Icons({ direction }) {
	// render a different SVG Icon dependant on the direction passed into the component
	if (!direction) {
		return (
			<svg
				width="24"
				height="24"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 9L12 15L18 9"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	} else {
		return (
			<svg
				width="24"
				height="24"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 15L12 9L18 15"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
}

export default Icons;
