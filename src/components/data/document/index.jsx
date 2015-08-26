/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/**
 * Selectors
 */

function select( { site } ) {
	return { site };
}

/**
 * Constants
 */

const TITLE_SEPARATOR = ' | ';

@connect( select )
export default class Document {
	static propTypes = {
		site: PropTypes.object,
		title: PropTypes.string,
		description: PropTypes.string,
		children: PropTypes.node
	}

	title() {
		const { site, title } = this.props;
		let parts = [];

		if ( title ) {
			parts.push( title );
		}

		if ( site ) {
			parts.push( site.name );
		}

		return parts.join( TITLE_SEPARATOR );
	}

	description() {
		const { site, description } = this.props;

		let content = description;
		if ( ! content && site ) {
			content = site.description;
		}

		if ( content ) {
			return { name: 'description', content: content };
		}
	}

	render() {
		const { children } = this.props;

		return (
			<div>
				<Helmet title={ this.title() } meta={ [ this.description() ].filter( Boolean ) } />
				{ children }
			</div>
		);
	}
}
