import React from 'react';
import UserProvider from 'contexts/userContext';
import AppRouter from '../app-router';

const App = (): JSX.Element => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default App;
