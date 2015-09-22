/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import get from 'lodash/object/get';
import { encode } from 'he';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */

import { GA_ACCOUNT_ID } from 'constants/config';

export default class Post extends Component {
	static propTypes = {
		site: PropTypes.object,
		hydrator: PropTypes.object,
		version: PropTypes.string,
		children: PropTypes.node
	}

	static defaultProps = {
		hydrator: Object.freeze( {} )
	}

	document() {
		const head = Helmet.rewind();

		if ( ! head ) {
			return '';
		}

		return `<title>${ head.title }</title>` + head.meta;
	}

	rss() {
		const { site } = this.props;

		if ( ! site ) {
			return '';
		}

		const title = `${ encode( site.name ) } Feed`;
		const url = `${ site.URL.replace( /\/$/, '' ) }/feed/`;

		return `<link rel="alternate" type="application/rss+xml" title="${ title }" href="${ url }" />`;
	}

	icon() {
		const ico = get( this.props.site, 'icon.ico' );

		if ( ! ico ) {
			return '';
		}

		return `<link rel="icon" href="${ ico }" />`;
	}

	analytics() {
		if ( ! GA_ACCOUNT_ID ) {
			return '';
		}

		return (
			`<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', ${ JSON.stringify( GA_ACCOUNT_ID ) }, 'auto');
			</script>`
		);
	}

	render() {
		const { hydrator, version, children } = this.props;

		return (
			<html>
				<head dangerouslySetInnerHTML={ { __html: `
					${ this.document() }
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Merriweather:400,400italic,700,700italic|Open+Sans:400,400italic,700,700italic" />
					<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
					<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/obsidian.min.css" />
					<link rel="stylesheet" href="/bundle.css?${ version || '' }" />
					${ this.rss() }
					${ this.icon() }
					${ this.analytics() }
				` } } />
				<body>
					<div id="app" dangerouslySetInnerHTML={ { __html: children } } />
					<script dangerouslySetInnerHTML={ {
						__html: `window.__hydrator__ = ${ JSON.stringify( hydrator ) };`
					} } />
					<script src={ '/bundle.js?' + ( version || '' ) }></script>
				</body>
			</html>

		);
	}
}
