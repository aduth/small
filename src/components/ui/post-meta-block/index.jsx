/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Icon from 'components/ui/icon';

export default class PostMetaBlock extends Component {
	static propTypes = {
		icon: PropTypes.string.isRequired,
		className: PropTypes.string,
		children: PropTypes.node
	}

	render() {
		const { icon, className, children } = this.props;
		const classes = classNames( 'post-meta-block', className );

		return (
			<div className={ classes }>
				<Icon icon={ icon } className="post-meta-block__icon" />
				<span className="post-meta-block__label">
					{ children }
				</span>
			</div>
		);
	}
}
