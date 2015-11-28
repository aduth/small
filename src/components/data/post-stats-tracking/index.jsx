/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import qs from 'querystring';

/**
 * Selectors
 */

function select( state ) {
	return {
		site: state.site
	};
}

/**
 * Constants
 */

const BASE_STAT_URL = 'https://pixel.wp.com/g.gif';
const REGEXP_WPCOM_SUBDOMAIN = /^https?:\/\/([^\.]+)\.wordpress\.com/;

@connect( select )
export default class PostStatsTracking extends Component {
	static propTypes = {
		site: PropTypes.object,
		post: PropTypes.object,
		children: PropTypes.node
	}

	componentDidMount() {
		const { site, post } = this.props;
		this.trackPageView( site, post );
	}

	componentWillReceiveProps( nextProps ) {
		const { site, post } = this.props;
		const { site: nextSite, post: nextPost } = nextProps;

		if ( site !== nextSite || post !== nextPost ) {
			this.trackPageView( nextSite, nextPost );
		}
	}

	trackPageView( site, post ) {
		if ( ! site || ! post || 'production' !== process.env.NODE_ENV ) {
			return;
		}

		let stat = {
			blog: site.ID,
			v: site.jetpack ? 'ext' : 'wpcom',
			tz: 0,
			user_id: 0,
			post: post.ID,
			host: window.location.hostname,
			rand: Math.random().toString()
		};

		if ( ! site.jetpack && REGEXP_WPCOM_SUBDOMAIN.test( site.URL ) ) {
			stat.subd = site.URL.match( REGEXP_WPCOM_SUBDOMAIN )[ 1 ];
		}

		let tracker = new Image();
		tracker.src = [ BASE_STAT_URL, qs.stringify( stat ) ].join( '?' );
	}

	render() {
		return React.DOM.div( null, React.Children.map( this.props.children, ( child ) => {
			return React.cloneElement( child, this.props );
		} ) );
	}
}
