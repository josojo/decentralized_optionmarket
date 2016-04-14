import React from 'react';
import {Link} from 'react-router';
import {Nav, Navbar} from 'react-bootstrap';

let NavBar = React.createClass({
  render() {
    return (
	<nav className="navbar navbar-default navbar-fixed-top">
		<div className="container">
			<div className="navbar-header page-scroll">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href="#page-top"></a>
			</div>

			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul className="nav navbar-nav navbar-right">
					<li className="hidden">
						<a href="#page-top"></a>
					</li>
					<li className="page-scroll">
						<Link to="/oracles">
							Oracles
						</Link>
					</li>
					<li className="page-scroll">
						<a href="#page-2">Page 2</a>
					</li>
					<li className="page-scroll">
						<a href="#page-3">Page 3</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
    );
  }
});

module.exports = NavBar;
