import React from 'react';
import HomePage from './home-page';
import { IUserContextValues, useUserContext } from 'contexts/userContext';

const HomePageIndex = (): JSX.Element => {
  const {
    userInfo: { firstName, lastName },
  } = useUserContext() as IUserContextValues;
  return (
    <HomePage firstName={firstName} lastName={lastName} />
  );
}

export default HomePageIndex;
