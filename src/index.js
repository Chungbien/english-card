import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./services/redux";
import { createStore } from "redux";
import App from "./containers/app";
import AddWord from "./containers/add-word";
import NotFound from "./containers/not-found";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={`/`} exact={true} component={App} />
        <Route path={`/unit/:unitId`} exact={true} component={App} />
        <Route path={`/add`} exact={true} component={AddWord} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
