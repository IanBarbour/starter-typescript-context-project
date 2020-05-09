import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../home-page';

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/' render={() => <HomePage />} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter;
