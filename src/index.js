import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './ducks/store.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './App';
import './normalize.css';
import './index.css';


import { routes } from './router.js';

console.log(routes)
const routesList = routes.map(route => {
  return (
    <Route exact={route.exact} path={route.path} component={route.component}></Route>
  )
})

const Nothing = () => {
  return <h1>SHITS BROKE</h1>
}
ReactDOM.render(
  <Provider store={store}>
    <Router component={App}>
      <div>
        <Route exact path="/" component={App}></Route>
        <Switch>
          {routesList}
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
