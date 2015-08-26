/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Post extends Component {
	static propTypes = {
		site: PropTypes.object,
		hydrator: PropTypes.object,
		children: PropTypes.node
	}

	static defaultProps = {
		site: Object.freeze( {} ),
		hydrator: Object.freeze( {} )
	}

	render() {
		const { site, hydrator, children } = this.props;
		const head = Helmet.rewind();

		return (
			<html>
				<head dangerouslySetInnerHTML={ { __html: `
					<meta charset="UTF-8" />
					<title>${ head.title }</title>
					${ head.meta }
					<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Merriweather:400,700,700italic|Open+Sans:400,400italic,700,700italic" />
					<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
					<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/obsidian.min.css" />
					<link rel="stylesheet" href="/bundle.css" />
				` } } />
				<body>
					<div id="app" dangerouslySetInnerHTML={ { __html: children } } />
					<script dangerouslySetInnerHTML={ {
						__html: `window.__hydrator__ = ${ JSON.stringify( hydrator ) };`
					} } />
					<script src="/bundle.js"></script>
				</body>
			</html>

		);
	}
}
