/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Icon extends Component {
	static propTypes = {
		icon: PropTypes.string.isRequired,
		className: PropTypes.string
	}

	render() {
		const { icon, className } = this.props;
		const classes = classNames( 'icon', 'fa', 'fa-' + icon, className );

		return <span className={ classes } />;
	}
}
