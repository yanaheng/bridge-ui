import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App';
// import Game from './routes/Game/Index';
function RouterConfig({ history,app }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={App}></Route>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
