/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import PostMetaBlock from 'components/ui/post-meta-block';

export default class PostTerms extends Component {
	static propTypes = {
		taxonomy: PropTypes.string.isRequired,
		terms: PropTypes.array,
		icon: PropTypes.string,
		className: PropTypes.string
	}

	static defaultProps = {
		terms: Object.freeze( [] )
	}

	render() {
		const { taxonomy, terms, icon, className } = this.props;

		const children = terms.map( ( term ) => {
			return (
				<li key={ term.slug } className="post-terms__term">
					<Link to={ `/${ taxonomy }/${ encodeURIComponent( term.slug ) }` }>
						{ term.name }
					</Link>
				</li>
			);
		} );

		const classes = classNames( 'post-terms', className, 'is-' + taxonomy );

		return (
			<PostMetaBlock icon={ icon } className={ classes }>
				<ul className="post-terms__terms">
					{ children }
				</ul>
			</PostMetaBlock>
		);
	}
}
