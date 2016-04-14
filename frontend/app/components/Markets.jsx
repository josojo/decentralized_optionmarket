import React from 'react';
import {StoreWatchMixin} from 'fluxxor';

import Fluxxor from 'fluxxor';

let Markets = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React), StoreWatchMixin("markets")
    ],

    componentWillMount() {},

    componentDidMount() {
        this.props.flux.actions.config.initializeState();

    },

    componentWillReceiveProps(nextProps) {},

    getStateFromFlux: function() {
    console.log("getStateFromFlux");
        var store = this.props.flux.store("markets").getState();

        console.log(store.markets[0]);
        return {
            markets: _.values(store.markets)
        };
    },
    update:function(){
    this.props.flux.actions.config.initializeData();
    },
    render: function() {
        return (
            <div>
                <h1>Markets</h1>
                <table >
								<tbody>
                    <tr>
                        <td>Name</td>
                        <td>addresses</td>
                    </tr>
                    {this.state.markets.map(function(market) {
                        return <tr>
                            <td>
                                {market.name}
                            </td>
                            <td>
                                {market.address}
                            </td>
                        </tr>;
                    })}
										</tbody>
                </table>
            </div>
        );
    }

});

module.exports = Markets;
