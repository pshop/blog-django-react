import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from "./Home";
import Log from "./Log";
import Header from "./Header";
import UserPage from "./UserPage";
import GeographyPage from "./GeographyPage";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Header/>

        <Switch>
          <Route exact path={'/log'}>
            <Log/>
          </Route>
          <Route exact path={'/UserPage'}>
            <UserPage/>
          </Route>
          <Route exact path={'/geography/:type'} component={GeographyPage}/>
          <Route exact path={''}>
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;