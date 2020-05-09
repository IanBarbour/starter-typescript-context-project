import React, { Component, createContext, useContext } from 'react';
import axios from 'axios';
import get from 'lodash/get';

export interface IUserContextValues {
  userActionFailed: boolean,
  userActionMessage: string,
  userActionPending: boolean,
  userInfo: {
    firstName: string;
    lastName: string;
  },
}

export const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const UserConsumer = UserContext.Consumer;

const defaultState = {
  userActionFailed: false,
  userActionMessage: '',
  userActionPending: false,
  userInfo: {
    firstName: 'Ian',
    lastName: 'Barbour',
  }
};

interface IState {
  userActionFailed: boolean,
  userActionMessage: string,
  userActionPending: boolean,
  userInfo: {
    firstName: string;
    lastName: string;
  },
}

export default class UserProvider extends Component<{}, IState> {
  state = defaultState;

  callFailed = (failureMessage: string) => {
    this.setState({
      userActionFailed: true,
      userActionMessage: failureMessage,
      userActionPending: false,
    });
  };

  callStart = () => {
    this.setState({
      userActionMessage: '',
      userActionPending: true,
    });
  };

  callSuccess = () => {
    this.setState({
      userActionFailed: false,
      userActionPending: false,
    });
  };

  checkForSingleUserSKUs = async (orgCustomerId: string): Promise<void> => {
    this.callStart();
    try {
      const response = await axios.get(`/accounts/isLegacySingleUser/${orgCustomerId}`);
      const success = get(response, 'data.success');

      if (success) {
        this.callSuccess();
      } else {
        this.callFailed('');
      }
    } catch (e) {
      this.callFailed('');
    }
  };

  clearUserActionState = () => {
    this.setState({
      userActionFailed: false,
      userActionMessage: '',
      userActionPending: false,
    });
  };

  resetAccountData = () => {
    this.setState({
      ...defaultState,
    });
  };

  render(): JSX.Element {
    const {
      userActionFailed,
      userActionMessage,
      userActionPending,
    } = this.state;

    return (
      <UserContext.Provider
        value={{
          clearUserActionState: this.clearUserActionState,
          userActionFailed,
          userActionMessage,
          userActionPending,
          userInfo: this.state.userInfo,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
