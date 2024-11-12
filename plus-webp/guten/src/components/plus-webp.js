import Credit from './credit';
import Generate from './generate';
import Settings from './settings';

const PlusWebp = () => {

	return (
		<div className="wrap">
			<h2>Plus WebP or AVIF</h2>
			<Credit />
			<hr />
			<Generate />
			<hr />
			<Settings />
		</div>
	);

};

export default PlusWebp;
