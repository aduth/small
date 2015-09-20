/**
 * External dependencies
 */

import React, { Component } from 'react/addons';

/**
 * Internal dependencies
 */

import Post from 'components/ui/post';

/**
 * Constants
 */

const PLACEHOLDER_POST = {
	URL: '/',
	title: '',
	content: '',
	date: ( new Date() ).toISOString(),
	tags: {},
	categories: {}
};

export default class PostPlaceholder extends Component {
	render() {
		return (
			<Post post={ PLACEHOLDER_POST } className="post-placeholder" />
		);
	}
}
