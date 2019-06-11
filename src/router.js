import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import login from "./routes/Login"
import Main from "./layouts/MainLayout/index"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={login}></Route>
        <Route path="/main" render={()=><Redirect to="/main/addquestions"></Redirect>} exact></Route>
        <Route path="/main" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
