/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';
import { Link } from 'react-router';
import Highlight from 'react-highlight';
import { parse } from 'url';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import PostMeta from 'components/ui/post-meta';
import Button from 'components/ui/button';

export default class Post extends Component {
	static propTypes = {
		post: PropTypes.object,
		excerpt: PropTypes.bool
	}

	static defaultProps = {
		excerpt: false
	}

	postLink() {
		const { post } = this.props;
		return parse( post.URL ).pathname;
	}

	renderReadMore() {
		const { post, excerpt } = this.props;

		if ( ! excerpt ) {
			return;
		}

		return (
			<footer className="post__read-more">
				<Button to={ this.postLink() }>Continue Reading</Button>
			</footer>
		);
	}

	render() {
		const { post, excerpt } = this.props;
		const classes = classNames( 'post', this.props.className );

		return (
			<article className={ classes }>
				<header className="post__header">
					<Link to={ this.postLink() } className="post__title-link">
						<h1 className="post__title" dangerouslySetInnerHTML={ {
							__html: post.title
						} } />
					</Link>
					<PostMeta post={ post } />
				</header>
				<Highlight innerHTML className="post__content">
					{ excerpt ? post.excerpt : post.content }
				</Highlight>
				{ this.renderReadMore() }
			</article>
		);
	}
}
