import { Notice } from '@wordpress/components';
import {
	useState,
	useEffect
} from '@wordpress/element';

const ProgressBar = ( { p_count, max_count, text, updatecurrentSubmitgenerate, updatecurrentGenerateprogress, updatecurrentIds } ) => {

	const [ currentMessage, updatecurrentMessage ] = useState( '' );
	const progress = Math.round( ( p_count / max_count ) * 100 );

	useEffect( () => {
		if ( 100 === progress ) {
			updatecurrentMessage( text );
		}
	}, [ progress, text ] );

	return (
		<div>
			{ 100 > progress && (
				<>
					<progress value={ progress } max="100">
					</progress>&nbsp;&nbsp;{ p_count }&nbsp;/&nbsp;{ max_count }&nbsp;&nbsp;|&nbsp;&nbsp;{ progress } %
				</>
			) }
			{ currentMessage && (
				<Notice
					status = "success"
					onRemove = { () =>
						{
							updatecurrentMessage( '' );
							updatecurrentSubmitgenerate( false );
							updatecurrentGenerateprogress( 0 );
							updatecurrentIds( [] );
						}
					}
				>
					{ currentMessage }
				</Notice>
			) }
		</div>
	);

};

export default ProgressBar;
