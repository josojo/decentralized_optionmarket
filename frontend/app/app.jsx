import React from 'react';
import ReactDOM from 'react-dom';

import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';

import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

// Containers
import BaseApp from './containers/BaseApp';

// Components
import Oracles from './components/Oracles';
import Volatile from './components/Volatile';
import Markets from './components/Markets';

// Stores
import ConfigStore from './stores/ConfigStore';
import OracleStore from './stores/OracleStore';
import MarketpairStore from './stores/MarketpairStore';

// Actions
import ConfigActions from './actions/ConfigActions';
import OracleActions from './actions/OracleActions';

let stores = {
        config: new ConfigStore(),
        oracle: new OracleStore(),
	       markets: new MarketpairStore()
};

let actions = {
        config: new ConfigActions(),
        oracle: new OracleActions()
};

let flux = new Fluxxor.Flux(stores, actions);

let createFluxComponent = function(Component, props) {
        return <Component {...props} flux={flux}/>;
};

flux.setDispatchInterceptor(function(action, dispatch) {
        ReactDOM.unstable_batchedUpdates(function() {
                dispatch(action);
        });
});


// Router initialization
const appHistory = useRouterHistory(createHashHistory)({queryKey: false})

let routes = (
        <Router history={appHistory} createElement={createFluxComponent}>
                <Route path="/" component={BaseApp}>
                        <IndexRoute component={Oracles}/>
                        <Route path="oracles" component={Oracles}/>
			                     <Route path="markets" component={Markets}/>
                        <Route path="*" component={Volatile}/>
                </Route>
        </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
