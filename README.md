<p align="center"><img src="https://cloud.githubusercontent.com/assets/1779930/10063087/c7ee23a0-6237-11e5-92f0-6bcc4e1974f3.png" alt="Logo" /></p>

Small is a blog application aimed at providing a minimal, fast, and easy-to-use interface for expressing your ideas to the world. Under the hood, it is built as an isomorphic JavaScript application powered by [WordPress.com](https://wordpress.com/).

![Screenshot](https://cloud.githubusercontent.com/assets/1779930/9564279/3db21614-4e6f-11e5-9568-0bea023552a6.png)

## Requirements

- A [WordPress.com](https://wordpress.com) account and blog
- A server with [Node.js](https://nodejs.org/en/) installed for serving the front-end of your site

## Quick Start

If you haven't already, sign up for a free blog at [WordPress.com](https://wordpress.com/). Small uses the WordPress.com interface for drafting blog posts and managing settings for your site. While registering your blog, take note of your chosen domain, as you'll need it when configuring Small.

The easiest way to launch a Small site is using the Heroku deploy button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aduth/small)

Heroku provides a [free hosting tier](https://www.heroku.com/pricing) with the limitation that your app must sleep a minimum of 6 hours per day.

## Configuration

A Small app is configured using environment variables. Whether you choose to host your app using Heroku or with your own Node.js hosting, these variables will need to be available for both the build step and while the server process is running.

A brief description of each configuration variable is found below:

Name | Required | Description
--- | --- | ---
`SITE_ID` | Yes | Hostname of your WordPress.com blog, e.g. "andrewmduthie.wordpress.com"
`AUTHOR_EMAIL` | No | Optional email address associated with your Gravatar profile, used to retrieve connected services and Gravatar image.
`ACCOUNTS` | No | Optional comma-separated set of Gravatar connected services to use. Specify custom services using the syntax "service:url", e.g. "github:https://github.com/aduth". A service must be supported by the FontAwesome web font to be displayed correctly.
`GA_ACCOUNT_ID` | No | Optional Google Analytics account ID for tracking page views. Page views are automatically tracked using WordPress.com stats.

## License

Copyright 2015 Andrew Duthie. Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
