import React, { useState } from 'react';
import './home-page.scss';

const STYLE_BASE = "HOME_PAGE";

interface IHomePage {
  firstName: string;
  lastName: string;
}
const HomePage = ({firstName, lastName}: any): JSX.Element => {
  return (
    <div className={`${STYLE_BASE}-container`}>
      <div>{`${firstName} ${lastName}`}</div>
    </div>
  )
}

export default HomePage;
