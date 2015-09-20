/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Button from 'components/ui/button';

export default class Pagination extends Component {
	static propTypes = {
		page: PropTypes.number,
		next: PropTypes.bool
	}

	static defaultProps = {
		page: 1,
		next: false
	}

	renderPrevious() {
		const { page } = this.props;

		if ( 1 === page ) {
			return;
		}

		return (
			<Button to={ `/page/${ page - 1 }`} className="is-previous">
				Previous
			</Button>
		);
	}

	renderNext() {
		const { page, next } = this.props;

		if ( ! next ) {
			return;
		}

		return (
			<Button to={ `/page/${ page + 1 }`} className="is-next">
				Next
			</Button>
		);
	}

	render() {
		const { page, next } = this.props;

		if ( 1 === page && ! next ) {
			return null;
		}

		return (
			<footer className="pagination">
				{ this.renderPrevious() }
				{ this.renderNext() }
			</footer>
		);
	}
}
