import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Topic from './component/topic/topic'
import reducers from './reducer'
import './config'
import './index.css'

// import {withRouter} from 'react-router';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// boss genius me msg 4个页面
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute>
				</AuthRoute>
                <Switch>
                    <Route path='/topic/:web_id' component={Topic}>
                    </Route>
                    <Route path='/topic' component={Topic}>
                    </Route>
                    <Route path='/bossinfo' component={BossInfo}>
					</Route>
                    <Route path='/geniusinfo' component={GeniusInfo}>
					</Route>
                    <Route path='/login' component={Login}>
					</Route>
                    <Route path='/register' component={Register}>
					</Route>

                    <Route component={Dashboard}>
					</Route>
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

