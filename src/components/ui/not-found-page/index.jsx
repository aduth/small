/**
 * External dependencies
 */

import React, { Component } from 'react';

/**
 * Internal dependencies
 */

import Document from 'components/data/document';
import Button from 'components/ui/button';

export default class NotFoundPage extends Component {
	render() {
		return (
			<Document title="404">
				<h2>Page not found!</h2>
				<p>Sorry, but the page you were looking for could not be found.</p>
				<p><Button to="/">Return Home</Button></p>
			</Document>
		);
	}
}
