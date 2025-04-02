import './settings.css';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, RadioControl, RangeControl, ToggleControl } from '@wordpress/components';
import {
	useState,
	useEffect
} from '@wordpress/element';

const Settings = () => {

	const pluswebp_options = JSON.parse( pluswebpsettings_data.settings );

	const [ currentOptions, updatecurrentOptions ] = useState( pluswebp_options );

	useEffect( () => {
		apiFetch( {
			path: 'rf/plus-webp-settings_api/token',
			method: 'POST',
			data: {
				output_mime: currentOptions['output_mime'],
				quality: currentOptions['quality'],
				types: currentOptions['types'],
				replace: currentOptions['replace'],
				addext: currentOptions['addext'],
			}
		} ).then( ( response ) => {
			//console.log( response );
		} );
	}, [ currentOptions ] );

	const items_output_mime = [];
	if( typeof currentOptions !== 'undefined' ) {
		items_output_mime.push(
			<RadioControl
				selected = { currentOptions['output_mime'] }
				options = { [
					{ label: 'WebP', value: 'image/webp' },
					{ label: 'AVIF', value: 'image/avif' },
				] }
				onChange={ ( value ) => 
					{
						currentOptions['output_mime'] = value;
						let data = Object.assign( {}, currentOptions );
						updatecurrentOptions( data );
					}
				}
			/>
		);
	}

	const items_quality = [];
	if( typeof currentOptions !== 'undefined' ) {
		items_quality.push(
			<RangeControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				max = { 100 }
				min = { 1 }
				value = { currentOptions['quality'] }
				className = "range_width"
				onChange={ ( value ) => 
					{
						currentOptions['quality'] = value;
						let data = Object.assign( {}, currentOptions );
						updatecurrentOptions( data );
					}
				}
			/>
		);
	}

	const items_types = [];
	if( typeof currentOptions !== 'undefined' ) {
		let is_jpeg = false;
		if ( currentOptions['types'].includes('image/jpeg') ) {
			is_jpeg = true;
		}
		items_types.push(
			<div className="line-margin">
				<ToggleControl
					__nextHasNoMarginBottom
					label = 'image/jpeg'
					checked = { is_jpeg }
					onChange = { ( value ) =>
						{
							if ( value ) {
								currentOptions['types'].push('image/jpeg');
							} else {
								let val = 'image/jpeg';
								let index = currentOptions['types'].indexOf( val );
								currentOptions['types'].splice( index, 1 )
							}
							let data = Object.assign( {}, currentOptions );
							updatecurrentOptions( data );
						}
					}
				/>
			</div>
		);
		let is_png = false;
		if ( currentOptions['types'].includes('image/png') ) {
			is_png = true;
		}
		items_types.push(
			<div className="line-margin">
				<ToggleControl
					__nextHasNoMarginBottom
					label = 'image/png'
					checked = { is_png }
					onChange = { ( value ) =>
						{
							if ( value ) {
								currentOptions['types'].push('image/png');
							} else {
								let val = 'image/png';
								let index = currentOptions['types'].indexOf( val );
								currentOptions['types'].splice( index, 1 )
							}
							let data = Object.assign( {}, currentOptions );
							updatecurrentOptions( data );
						}
					}
				/>
			</div>
		);
		let is_bmp = false;
		if ( currentOptions['types'].includes('image/bmp') ) {
			is_bmp = true;
		}
		items_types.push(
			<div className="line-margin">
				<ToggleControl
					__nextHasNoMarginBottom
					label = 'image/bmp'
					checked = { is_bmp }
					onChange = { ( value ) =>
						{
							if ( value ) {
								currentOptions['types'].push('image/bmp');
							} else {
								let val = 'image/bmp';
								let index = currentOptions['types'].indexOf( val );
								currentOptions['types'].splice( index, 1 )
							}
							let data = Object.assign( {}, currentOptions );
							updatecurrentOptions( data );
						}
					}
				/>
			</div>
		);
		let is_gif = false;
		if ( currentOptions['types'].includes('image/gif') ) {
			is_gif = true;
		}
		items_types.push(
			<div className="line-margin">
				<ToggleControl
					__nextHasNoMarginBottom
					label = 'image/gif'
					checked = { is_gif }
					onChange = { ( value ) =>
						{
							if ( value ) {
								currentOptions['types'].push('image/gif');
							} else {
								let val = 'image/gif';
								let index = currentOptions['types'].indexOf( val );
								currentOptions['types'].splice( index, 1 )
							}
							let data = Object.assign( {}, currentOptions );
							updatecurrentOptions( data );
						}
					}
				/>
			</div>
		);
	}

	const items_addext = [];
	if( typeof currentOptions !== 'undefined' ) {
		items_addext.push(
			<ToggleControl
				__nextHasNoMarginBottom
				label = { __( 'Apply', 'plus-webp' ) }
				checked = { currentOptions['addext'] }
				onChange = { ( value ) =>
					{
						currentOptions['addext'] = value;
						let data = Object.assign( {}, currentOptions );
						updatecurrentOptions( data );
					}
				}
			/>
		);
	}

	const items_replace = [];
	if( typeof currentOptions !== 'undefined' ) {
		items_replace.push(
			<ToggleControl
				__nextHasNoMarginBottom
				label = { __( 'Apply', 'plus-webp' ) }
				checked = { currentOptions['replace'] }
				onChange = { ( value ) =>
					{
						currentOptions['replace'] = value;
						let data = Object.assign( {}, currentOptions );
						updatecurrentOptions( data );
					}
				}
			/>
		);
	}

	return (
		<>
			<h2>{ __( 'Settings', 'plus-webp' ) }</h2>
			<div className="settings">
				<h3>{ __( 'Generated images', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ items_output_mime }
					<p className="description">
						{ __( 'Specifies the file type to be output after conversion.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Quality', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ items_quality }
					<p className="description">
						{ __( 'Specifies the quality of generated images. The higher the number, the better the quality and the larger the file size.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Type', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ items_types }
					<p className="description">
						{ __( 'Check the type of source image to be converted.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'Append the generated images extension(webp,avif) to the original filename', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ items_addext }
					<p className="description">
						{ __( 'Checking this setting, the generated images extension(webp,avif) will be appended to the name of the file, including the extension. Not checking, only the extension is changed.', 'plus-webp' ) }
					</p>
				</div>
			</div>
			<div className="settings">
				<h3>{ __( 'WebP or AVIF replacement of images and contents', 'plus-webp' ) }</h3>
				<div className="settings2">
					{ items_replace }
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
