/**
 * External dependencies
 */

import { parse } from 'url';

/**
 * Internal dependencies
 */

import manifest from '../../package';

export const SITE_ID = process.env.SITE_ID || parse( manifest.author.url ).hostname;
export const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL || manifest.author.email;
export const CACHE_BUST_KEY = process.env.CACHE_BUST_KEY;
export const ACCOUNTS = process.env.ACCOUNTS;
export const GA_ACCOUNT_ID = process.env.GA_ACCOUNT_ID;
export const POSTS_PER_PAGE = process.env.POSTS_PER_PAGE || 10;
