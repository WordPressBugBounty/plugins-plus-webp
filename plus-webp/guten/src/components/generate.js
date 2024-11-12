import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';
import ProgressBar from './progress-bar';

import {
	useRef,
	useState,
	useEffect
} from '@wordpress/element';

const Generate = () => {

	const post_ids = JSON.parse( pluswebpgenerate_data.post_ids );

	const [ currentGenerateprogress, updatecurrentGenerateprogress ] = useState( 0 );
	const [ currentSubmitgenerate, updatecurrentSubmitgenerate ] = useState( false );

	const max_count = post_ids.length;

	const firstUpdateGenerate = useRef( true );
	useEffect( () => {
		if ( firstUpdateGenerate.current ) {
			firstUpdateGenerate.current = false;
			return;
		}
		const result_generate = async () => {
			for ( let i = 0;  i < max_count;  i++  ) {
				await apiFetch( {
					path: 'rf/plus-webp-generate_api/token',
					method: 'POST',
					data: {
						post_id: post_ids[ i ],
						count: i + 1,
						max_count: max_count,
						generate: currentSubmitgenerate,
					}
				} ).then( ( response ) => {
					//console.log( response );
					if ( response['generate'] ) {
						//console.log( i + 1 );
						updatecurrentGenerateprogress( i + 1 );
					} else {
						window.location.reload();
					}
				} );
			}
		}
		try {
			result_generate();
		} catch ( err ) {
			console.log(err);
		}
	}, [ currentSubmitgenerate ] );

	const items_description = [];
	const items_generate_progress = [];
	const items_generate_button = [];
	const items_stop_button = [];
	const items_check_button = [];
	const onclick_submitgenerate = () => {
		updatecurrentSubmitgenerate( true );
	};
	const onclick_submitstop = () => {
		updatecurrentSubmitgenerate( false );
	};
	const onclick_submitcheck = () => {
		window.location.reload();
	};

	if ( currentSubmitgenerate ) {
		items_generate_progress.push(
			<ProgressBar
				p_count = { currentGenerateprogress }
				max_count = { max_count }
				text = { __( 'Generation has been completed.', 'plus-webp' ) }
				updatecurrentProgress = { updatecurrentGenerateprogress }
				updatecurrentSubmit = { updatecurrentSubmitgenerate }
			/>
		);
		if ( 0 < currentGenerateprogress && currentGenerateprogress < max_count ) {
			items_stop_button.push(
				<Button
					className = { 'button button-large' }
					onClick = { onclick_submitstop }
				>
				{ __( 'Stop', 'plus-webp' ) }
				</Button>
			);
		}
	} else {
		if ( max_count !== currentGenerateprogress ) {
			items_description.push(
				<>
					<p className="description">
						{ pluswebpgenerate_data.generate_description }
					</p>
					<p className="description">
						{ pluswebpgenerate_data.non_generate_description }
					</p>
				</>
			);
			items_generate_button.push(
				<Button
					className = { 'button button-large' }
					onClick = { onclick_submitgenerate }
				>
				{ __( 'Generate', 'plus-webp' ) }
				</Button>
			);
		} else {
			items_description.push(
				<p className="description">
					{ __( 'Cannot find any media that can be generated.', 'plus-webp' ) }
				</p>
			);
		}
	}

	items_check_button.push(
		<Button
			className = { 'button button-large' }
			onClick = { onclick_submitcheck }
		>
		{ __( 'Check', 'plus-webp' ) }
		</Button>
	);

	return (
		<>
			<h2>{ __( 'Bulk Generate', 'plus-webp' ) }</h2>
			<b><li>{ __( 'Notified by email with details of the generate results.', 'plus-webp' ) }</li></b>
			<b><li>{ __( 'To perform "Bulk Generate" after changing the following settings, press "Check" and then press "Generate".', 'plus-webp' ) }</li></b>
			<b><li>{ __( 'WP-CLI commands are available. If you have a large number of files, WP-CLI commands is more reliable. Command line option allows the user to specify whether to send e-mail, the media ID of the sender and the settings.', 'plus-webp' ) }</li></b>
			<div className="settings">
				<strong>WP-CLI</strong>
				<code>wp pluswebpavif</code>
			</div>
			{ items_description }
			{ items_generate_button } &nbsp;&nbsp;&nbsp;
			{ items_stop_button } &nbsp;&nbsp;&nbsp;
			{ items_check_button }
			{ items_generate_progress }
		</>
	);

};

export default Generate;
