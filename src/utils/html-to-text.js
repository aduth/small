/**
 * External dependencies
 */

import he from 'he';

/**
 * Constants
 */

const REGEXP_HTML_TAGS = /<(?:.|\n)*?>/gm;

export default function( html ) {
	return he.unescape( html ).replace( REGEXP_HTML_TAGS, '' );
}
