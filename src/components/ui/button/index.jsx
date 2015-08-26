/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class Button extends Component {
	static propTypes = {
		to: PropTypes.string,
		children: PropTypes.node,
		className: PropTypes.string
	}

	render() {
		const { to, children, className } = this.props;
		const classes = classNames( 'button', className );

		if ( to ) {
			return <Link to={ to } className={ classes }>{ children }</Link>;
		}

		return (
			<button className={ classes }>{ children }</button>
		);
	}
}
