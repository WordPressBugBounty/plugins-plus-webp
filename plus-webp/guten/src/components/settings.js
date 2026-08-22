import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, RadioControl, RangeControl, ToggleControl } from '@wordpress/components';
import {
	useState,
	useEffect
} from '@wordpress/element';

const Settings = () => {

	const [ currentOptions, updatecurrentOptions ] = useState( pluswebpsettings_data.settings );

	useEffect( () => {
		apiFetch( {
			path: 'rf/plus-webp-settings_api/token',
			method: 'POST',
			data: {
				settings: currentOptions,
			}
		} ).then( ( response ) => {
			//console.log( response );
		} );
	}, [ currentOptions ] );

	return (
		<>
			<h2>{ __( 'Settings', 'plus-webp' ) }</h2>
			<div className="settings">
				<h3>{ __( 'Generated images', 'plus-webp' ) }</h3>
				<div className="settings2">
					<RadioControl
						selected = { currentOptions.output_mime }
						options = { [
							{ label: 'WebP', value: 'image/webp' },
							{ label: 'AVIF', value: 'image/avif' },
						] }
						onChange={ ( value ) => 
							{
								updatecurrentOptions( prev => ( {
									...prev,
									output_mime: value,
								} ) );
							}
						}
					/>
					<p className="description">
						{ __( 'Specifies the file type to be output after conversion.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Quality', 'plus-webp' ) }</h3>
				<div className="settings2">
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						max = { 100 }
						min = { 1 }
						value = { currentOptions.quality }
						className = "range_width"
						onChange={ ( value ) => 
							{
								updatecurrentOptions( prev => ( {
									...prev,
									quality: value,
								} ) );
							}
						}
					/>
					<p className="description">
						{ __( 'Specifies the quality of generated images. The higher the number, the better the quality and the larger the file size.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Type', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ [
						'image/jpeg',
						'image/png',
						'image/bmp',
						'image/gif',
					].map( ( type ) => (
						<div className="line-margin">
							<ToggleControl
								__nextHasNoMarginBottom
								key={ type }
								label={ type }
								checked={ currentOptions.types.includes( type ) }
								onChange={ ( checked ) => {
									updatecurrentOptions( prev => ( {
										...prev,
										types: checked
											? [ ...prev.types, type ]
											: prev.types.filter( item => item !== type ),
									} ) );
								} }
							/>
						</div>
					) ) }
					<p className="description">
						{ __( 'Check the type of source image to be converted.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Append the generated images extension(webp,avif) to the original filename', 'plus-webp' ) }</h3>
				<div className="settings2">
					<ToggleControl
						__nextHasNoMarginBottom
						label = { __( 'Apply', 'plus-webp' ) }
						checked = { currentOptions.addext }
						onChange = { ( value ) =>
							{
								updatecurrentOptions( prev => ( {
									...prev,
									addext: value,
								} ) );
							}
						}
					/>
					<p className="description">
						{ __( 'Checking this setting, the generated images extension(webp,avif) will be appended to the name of the file, including the extension. Not checking, only the extension is changed.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'WebP or AVIF replacement of images and contents', 'plus-webp' ) }</h3>
				<div className="settings2">
					<ToggleControl
						__nextHasNoMarginBottom
						label = { __( 'Apply', 'plus-webp' ) }
						checked = { currentOptions.replace }
						onChange = { ( value ) =>
							{
								updatecurrentOptions( prev => ( {
									...prev,
									replace: value,
								} ) );
							}
						}
					/>
					<p className="description">
						{ __( 'Checking this setting will replace image files with WebP or AVIF when adding new media, and delete the original image file. Also, when generating all images, the original image file ID will be overwritten as WebP or AVIF and the original image file will be deleted. All URLs in the content are also replaced.', 'plus-webp' ) }
						{ __( 'If you want to replace other databases besides content, use the "plus_webp_advanced_change_db" filter hook.', 'plus-webp' ) }
						<Button
							href = { __( 'https://wordpress.org/plugins/plus-webp/', 'plus-webp' ) }
							variant = "secondary"
							target = "_blank"
						>
						{ __( '"plus_webp_advanced_change_db" filter hook', 'plus-webp' ) }
						</Button>
					</p>
				</div>
			</div>
		</>
	);

};

export default Settings;
