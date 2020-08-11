import React from "react";
import {
  Switch,
  Route,
  Router as ReactRouter,
  Redirect
} from "react-router-dom";
import {history} from "../history";

import Home from '../components/Home';
import Login from '../components/Login'
import SucessView from '../components/SuccessView'
import HistoryTable from '../components/HistoryTable'


const Router = () => {
  return (
    <ReactRouter history={history}>
      <Switch>
        <Route path="/sucessView/:id?" component={SucessView} /> 
        <Route path="/Login" component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/history" exact component={HistoryTable} />
        <Redirect to="/Login" />
      </Switch>
    </ReactRouter>
  );
};


export default Router;
