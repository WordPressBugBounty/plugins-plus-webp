<?php
/**
 * Cli Name:    Plus WebP or AVIF CLI
 * Description: Generate WebP or AVIF by WP-CLI.
 * Version:     4.00
 * Author:      Katsushi Kawamori
 * Author URI:  https://riverforest-wp.info/
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Plus WebP or AVIF
 */

/*
	Copyright (c) 2024- Katsushi Kawamori (email : dodesyoswift312@gmail.com)
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; version 2 of the License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$pluswebpavifcli = new PlusWebpAVIFCLI();

/** ==================================================
 * Main
 */
class PlusWebpAVIFCLI {

	/** ==================================================
	 * Construct
	 *
	 * @since 1.00
	 */
	public function __construct() {

		WP_CLI::add_command( 'pluswebpavif', array( $this, 'pluswebpavif_cli_command' ) );
	}

	/** ==================================================
	 * Settings change
	 *
	 * @param string $output  output type.
	 * @param bool   $replace  Replace.
	 * @param bool   $addext  Add ext.
	 * @param array  $assoc_args  optional arguments.
	 * @param array  $pluswebp_settings  settings.
	 * @since 2.00
	 */
	private function settings_change( $output, $replace, $addext, $assoc_args, $pluswebp_settings ) {

		switch ( $output ) {
			case 'webp':
				$pluswebp_settings['output_mime'] = 'image/webp';
				break;
			case 'avif':
				$pluswebp_settings['output_mime'] = 'image/avif';
				break;
		}

		$pluswebp_settings['replace'] = $replace;
		$pluswebp_settings['addext'] = $addext;

		if ( array_key_exists( 'quality', $assoc_args ) ) {
			$pluswebp_settings['quality'] = intval( $assoc_args['quality'] );
			if ( 0 === $pluswebp_settings['quality'] || 100 < $pluswebp_settings['quality'] ) {
				WP_CLI::error( __( 'optional argument quality(int) : Invalid value.', 'plus-webp' ) );
			}
		}
		if ( array_key_exists( 'types', $assoc_args ) ) {
			$mime_types = array(
				'image/jpeg',
				'image/png',
				'image/bmp',
				'image/gif',
			);
			$types_str = strtolower( sanitize_text_field( wp_unslash( $assoc_args['types'] ) ) );
			$types = explode( ',', $types_str );
			$find = false;
			foreach ( $types as $value ) {
				if ( in_array( $value, $mime_types ) ) {
					$find = true;
					break;
				}
			}
			if ( $find ) {
				$pluswebp_settings['types'] = $types;
			} else {
				WP_CLI::error( __( 'optional argument types(string) : Invalid value.', 'plus-webp' ) );
			}
		}

		return $pluswebp_settings;
	}

	/**
	 * Plus WebP or AVIF command
	 *
	 * ## OPTIONS
	 *
	 * <string>
	 * : webp -> Generated WebP, avif -> Generated AVIF, help -> Specification of this command.
	 *
	 * [<string>]
	 * : Optional argument - mail -> Send results via email.
	 *
	 * [<string>]
	 * : Optional argument - replace -> WebP or AVIF replacement of images and contents.
	 *
	 * [<string>]
	 * : Optional argument - addext -> Append the webp or avif extension to the original filename.
	 *
	 * [--pid=<int>]
	 * : Optional argument - --pid=12152 -> Process only specified Media ID(Conversion source ID).
	 *
	 * [--quality=<int>]
	 * : Optional argument - --quality=90 -> Specifies the quality of WebP or AVIF.
	 *
	 * [--types=<string>]
	 * : Optional argument - --types=image/png,image/gif -> MIME type to convert.
	 *
	 * ## EXAMPLES
	 *
	 * wp pluswebpavif webp --pid=12152
	 * // Create WebP. Post ID 12152 only.
	 *
	 * wp pluswebpavif avif mail --quality=90 --types=image/png,image/gif
	 * // Create AVIF. Result email sent. Quality 90%. Convert image/png,image/gif.
	 *
	 * wp pluswebpavif webp replace addext
	 * // Create WebP. WebP or AVIF replacement of images and contents. Append the webp or avif extension to the original filename.
	 *
	 * @when after_wp_load
	 * @param array $args  arguments.
	 * @param array $assoc_args  optional arguments.
	 * @since 1.00
	 */
	public function pluswebpavif_cli_command( $args, $assoc_args ) {

		$output = null;
		$mail = false;
		$replace = false;
		$addext = false;
		if ( ! empty( $args ) ) {
			foreach ( $args as $key => $value ) {
				switch ( $value ) {
					case 'webp':
						$output = 'webp';
						break;
					case 'avif':
						$output = 'avif';
						break;
					case 'help':
						$output = 'help';
						break;
					case 'mail':
						$mail = true;
						break;
					case 'replace':
						$replace = true;
						break;
					case 'addext':
						$addext = true;
						break;
				}
			}
		}

		$input_error_message = __( 'Please enter the arguments.', 'plus-webp' ) . "\n";
		$input_error_message .= __( '1st argument(string) : webp -> Generated WebP, avif -> Generated AVIF, help -> Specification of this command.', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument(string) : mail -> Send results via email.', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument(string) : replace -> WebP or AVIF replacement of images and contents.', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument(string) : addext -> Append the webp or avif extension to the original filename.', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument pid(int) : --pid=12152 -> Process only specified Media ID(Conversion source ID).', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument quality(int) : --quality=90 -> Specifies the quality of WebP or AVIF.', 'plus-webp' ) . "\n";
		$input_error_message .= __( 'optional argument types(string) : --types=image/png,image/gif -> MIME type to convert.', 'plus-webp' ) . "\n";

		if ( 'webp' === $output || 'avif' === $output ) {

			$pid = 0;
			if ( array_key_exists( 'pid', $assoc_args ) ) {
				$pid = intval( $assoc_args['pid'] );
			}

			$pluswebp_settings_default = get_option( 'pluswebp' );
			update_option( 'pluswebp_default', $pluswebp_settings_default );
			$pluswebp_settings = $this->settings_change( $output, $replace, $addext, $assoc_args, $pluswebp_settings_default );
			update_option( 'pluswebp', $pluswebp_settings );

			if ( 0 < $pid ) {
				$metadata_org = wp_get_attachment_metadata( $pid );
				delete_option( 'pluswebp_generate' );
				do_action( 'wp_generate_attachment_metadata', $metadata_org, $pid );
				$webp_id = get_option( 'pluswebp_generate' );
				delete_option( 'pluswebp_generate' );
				delete_option( 'pluswebp_default' );
				update_option( 'pluswebp', $pluswebp_settings_default );
				if ( $webp_id ) {
					$messages = array();
					list( $message, $messages ) = apply_filters( 'pluswebp_mail_messages', $messages, $webp_id );
					WP_CLI::success( $message );
					if ( $mail ) {
						do_action( 'pluswebp_mail_generate_message', $messages, 1 );
					}
				} else {
					$message = 'ID: ' . $pid . "\n";
					$message .= __( 'This media ID has already been converted or is neither an image nor media.', 'plus-webp' ) . "\n";
					$message .= "\n";
					WP_CLI::warning( $message );
				}
			} else {
				list( $post_ids, $no_file_ids ) = apply_filters( 'pluswebp_get_allimages', $pluswebp_settings['types'], $pluswebp_settings['output_mime'] );
				if ( ! empty( $post_ids ) ) {
					$messages = array();
					foreach ( $post_ids as $post_id ) {
						$metadata_org = wp_get_attachment_metadata( $post_id );

						delete_option( 'pluswebp_generate' );
						do_action( 'wp_generate_attachment_metadata', $metadata_org, $post_id );
						$webp_id = get_option( 'pluswebp_generate' );
						delete_option( 'pluswebp_generate' );
						if ( $webp_id ) {
							list( $message, $messages ) = apply_filters( 'pluswebp_mail_messages', $messages, $webp_id );
							WP_CLI::success( $message );
						}
					}
					delete_option( 'pluswebp_default' );
					update_option( 'pluswebp', $pluswebp_settings_default );
					if ( ! empty( $no_file_ids ) ) {
						foreach ( $no_file_ids as $post_id ) {
							$message = 'ID: ' . $post_id . "\n";
							$message .= __( 'Title', 'plus-webp' ) . ': ' . get_the_title( $post_id ) . "\n";
							$message .= __( 'This media exists in the database, but the file does not, so the conversion was not performed.', 'plus-webp' ) . "\n";
							$message .= "\n";
							WP_CLI::warning( $message );
							$messages[] = $message;
						}
					}
					if ( $mail ) {
						do_action( 'pluswebp_mail_generate_message', $messages, count( $post_ids ) );
					}
				} else {
					$message = __( 'No media to convert.', 'plus-webp' ) . "\n";
					$message .= "\n";
					WP_CLI::warning( $message );
				}
			}
		} else {
			WP_CLI::error( $input_error_message );
		}
	}
}
