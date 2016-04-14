import _ from 'lodash';
import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import {IntlProvider, FormattedMessage} from 'react-intl';
import flatten from 'flat';

import NavBar from '../components/NavBar';

// Load Intl data
let localesSupported = require('intl-locales-supported');
let i18n = {
        locales: ['en-US']
};

if (window.Intl) {
        // Determine if the built-in `Intl` has the locale data we need.
        if (!localesSupported(i18n.locales)) {
                // `Intl` exists, but it doesn't have the data we need, so load the
                // polyfill and replace the constructors with need with the polyfill's.
                window.IntlPolyfill = require('intl/dist/Intl').IntlPolyfill;
                window.Intl.NumberFormat = window.IntlPolyfill.NumberFormat;
                window.Intl.DateTimeFormat = window.IntlPolyfill.DateTimeFormat;
        }
} else {
        // No `Intl`, so use and load the polyfill.
        window.Intl = require("intl/dist/Intl").Intl;
        window.IntlPolyfill = require("intl/dist/Intl").IntlPolyfill;
        window.Intl.NumberFormat = window.IntlPolyfill.NumberFormat;
        window.Intl.DateTimeFormat = window.IntlPolyfill.DateTimeFormat;
        require("intl/locale-data/jsonp/en-US");
}

let intlData = require('../utils/intlData');
let messages = flatten(intlData.messages);

let BaseApp = React.createClass({
        mixins: [StoreWatchMixin("config", "oracle")],
        getInitialState() {
                return {
		nameX: "Test"
		};
        },

        componentWillMount() {},

        componentDidMount() {
                this.props.flux.actions.config.initializeState();
        },

        componentWillReceiveProps(nextProps) {},

        getStateFromFlux() {
                return {flux: this.props.flux, config: this.props.flux.stores.config.getState(), oracle: this.props.flux.stores.oracle.getState()};
        },

        render() {
                return (
		<div>
			<NavBar flux={this.state.flux} />
			<header>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="intro-text">
								<span className="name">Verieth</span>
								<hr className="star-light" />
								<span className="skills">A Decentralized Security Marketplace Based on 									Ethereum.</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="container">
				{
				React.cloneElement(this.props.children, {
					flux: this.state.flux,
					config: this.state.config,
					oracle: this.state.oracle
				})
				}

			</div>

			<footer className="text-center">
				<div className="footer-above">
					<div className="container">
						<div className="row">
							<div className="footer-col col-md-4">
								<h3>Footer Left Column</h3>
								<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 							eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
							</div>
							<div className="footer-col col-md-4">
								<h3>Footer Center Column</h3>
								<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 							eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
							</div>
							<div className="footer-col col-md-4">
								<h3>Footer Right Column</h3>
								<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 							eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
                );
        }

});

module.exports = BaseApp;
