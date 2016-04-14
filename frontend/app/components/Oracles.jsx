import React from 'react';
import Oracle from './Oracle';

let Oracles = React.createClass({
        render: function() {
                return (
                        <div>
                                <div className="row">
                                        <div className="col-lg-12">
                                                <h1 className="page-header">Oracles <small>Watch'em</small>
                                                </h1>
                                        </div>
                                </div>

                                <div className="row">
				{Array.apply(0, Array(32)).map(function (x, i) {
					return <Oracle name={'Test ' + i}  description="ss" />;
				})}
				</div>
                        </div>
                );
        }

});

module.exports = Oracles;
