import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, Spinner, ToggleControl, Notice } from '@wordpress/components';
import ProgressBar from './progress-bar';

import {
	useRef,
	useState,
	useEffect
} from '@wordpress/element';

const Generate = () => {

	const post_ids = [];

	const [ currentGenerateprogress, updatecurrentGenerateprogress ] = useState( 0 );
	const [ currentSubmitgenerate, updatecurrentSubmitgenerate ] = useState( false );
	const [ currentSubmitstop, updatecurrentSubmitstop ] = useState( false );
	const [ currentSubmitconfirm, updatecurrentSubmitconfirm ] = useState( false );

	const [ currentIds, updatecurrentIds ] = useState( [] );
	const [ currentIdsDesc, updatecurrentIdsDesc ] = useState( '' );
	const [ currentNonIdsDesc, updatecurrentNonIdsDesc ] = useState( '' );

	const [ isSentMail, setIsSentMail ] = useState( false );

	const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {

		if ( !currentSubmitconfirm ) return;
		setIsLoading( true );

		apiFetch( {
			path: 'rf/plus-webp-confirm_api/token',
			method: 'POST',
			data: {
				submit: currentSubmitconfirm,
			}
		} ).then( ( response ) => {
			//console.log( response );
			if ( currentSubmitconfirm ) {
				updatecurrentIds( response['post_ids'] );
				updatecurrentIdsDesc( response['ids_desc'] );
				updatecurrentNonIdsDesc( response['non_ids_desc'] );
			}
			updatecurrentSubmitconfirm( false );
		} )
		.catch( ( err ) => {
			console.error(err);
		} )
		.finally( () => {
			setIsLoading( false );
			updatecurrentSubmitconfirm( false );
		} );

	}, [ currentSubmitconfirm ] );

	const firstUpdateGenerate = useRef( true );
	useEffect( () => {
		if ( firstUpdateGenerate.current ) {
			firstUpdateGenerate.current = false;
			return;
		}

		let cancelled = false;

		const result_generate = async () => {
			try {
				for ( let i = 0;  i < currentIds.length;  i++  ) {

					if ( cancelled ) {
						return;
					}

					const response = await apiFetch( {
						path: 'rf/plus-webp-generate_api/token',
						method: 'POST',
						data: {
							post_id: currentIds[ i ],
							count: i + 1,
							max_count: currentIds.length,
							generate: currentSubmitgenerate,
							sent_mail: isSentMail,
							stop: currentSubmitstop,
						}
					} );

					if ( cancelled ) {
						return;
					}

					//console.log( response );
					if ( response.generate ) {
						//console.log( i + 1 );
						updatecurrentGenerateprogress( i + 1 );
					}
				}
			} catch ( err ) {
				if ( ! cancelled ) {
					console.log( err );
				}
			}
		};

		result_generate();

		return () => {
			cancelled = true;
		};

	}, [ currentSubmitgenerate ] );

	return (
		<>
			{ isLoading && (
				<div className="full-screen-overlay">
					<Spinner />
				</div>
			) }
			<h2>{ __( 'Bulk Generate', 'plus-webp' ) }</h2>
			<blockquote className="wp-block-quote-modern">
				<b><li>{ __( 'To perform "Bulk Generate" after changing the following settings, press "Check" and then press "Generate".', 'plus-webp' ) }</li></b>
				<b><li>{ __( 'WP-CLI commands are available. If you have a large number of files, WP-CLI commands is more reliable. Command line option allows the user to specify whether to send e-mail, the media ID of the sender and the settings.', 'plus-webp' ) }</li></b>
				<div className="settings">
					<strong>WP-CLI</strong>
					<code>wp pluswebpavif help</code> <code>wp pluswebpavif --help</code>
				</div>
			</blockquote>
			{ currentIdsDesc && (
				<Notice
					status = "warning"
					onRemove = { () =>
						{
							updatecurrentIdsDesc( '' );
						}
					}
				>
					{ currentIdsDesc }
				</Notice>
			) }
			{ currentNonIdsDesc && (
				<Notice
					status = "warning"
					onRemove = { () =>
						{
							updatecurrentNonIdsDesc( '' );
						}
					}
				>
					{ currentNonIdsDesc }
				</Notice>
			) }
			{ currentSubmitgenerate ? (
				<>
					<ProgressBar
						p_count = { currentGenerateprogress }
						max_count = { currentIds.length }
						text = { __( 'Generation has been completed.', 'plus-webp' ) }
						updatecurrentSubmitgenerate = { updatecurrentSubmitgenerate }
						updatecurrentGenerateprogress = { updatecurrentGenerateprogress }
						updatecurrentIds = { updatecurrentIds }
					/>
					{ 0 < currentGenerateprogress && currentGenerateprogress < currentIds.length && (
						<Button
							className = { 'button button-large' }
							onClick = { () => 
								{
									updatecurrentSubmitstop( true );
									updatecurrentSubmitgenerate( false );
									updatecurrentSubmitconfirm( true );
									updatecurrentGenerateprogress( 0 );
								}
							}
						>
						{ __( 'Stop', 'plus-webp' ) }
						</Button>
					) }
				</>
			) : (
				<>
					<div className="line-margin2">
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Notify via email with details of the generation results', 'plus-webp') }
							help={
								isSentMail
								? __( 'With email notifications', 'plus-webp' )
								: __( 'Without email notifications', 'plus-webp' )
							}
							checked={ isSentMail  }
							onChange={ ( value ) => setIsSentMail( value ) }
						/>
					</div>
					<p className="description">
						{ __( 'When you click the "Confirm" button, the system will calculate the number of media items that can be generated. If the quantity is large, this may take some time.', 'plus-webp' ) }
					</p>
					<div className="button-container">
						<Button
							className = { 'button button-large' }
							onClick = { () => updatecurrentSubmitconfirm( true ) }
						>
							{ __( 'Check', 'plus-webp' ) }
						</Button>
						{ currentIds.length !== currentGenerateprogress && (
							<>
								<Button
									className = { 'button button-large' }
									onClick = { () =>
										{
											updatecurrentSubmitstop( false );
											updatecurrentSubmitgenerate( true );
										}
									}
								>
									{ __( 'Generate', 'plus-webp' ) }
								</Button>
							</>
						) }
					</div>
				</>
			) }
		</>
	);

};

export default Generate;
