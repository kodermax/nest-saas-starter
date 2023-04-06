import { createContext, useEffect, useReducer, useCallback } from 'react';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
// utils
import axios from '../utils/axios';
// routes
import { PATH_AUTH } from '../routes/paths';
// config
import { COGNITO_API } from '../config';
//
import { ActionMapType, AuthStateType, AuthUserType, AWSCognitoContextType } from './types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  AUTH = 'AUTH',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.AUTH]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

interface UserAttributeType {
  [key: string]: string;
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.AUTH) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<AWSCognitoContextType | null>(null);

// ----------------------------------------------------------------------

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_API.userPoolId || '',
  ClientId: COGNITO_API.clientId || '',
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserAttributes = useCallback(
    (currentUser: CognitoUser): Promise<UserAttributeType> =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((error, attributes) => {
          if (error) {
            reject(error);
            console.error(error);
          } else {
            const results: UserAttributeType = {};

            attributes?.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });

            resolve(results);
          }
        });
      }),
    []
  );

  const getSession = useCallback(
    () =>
      new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
          cognitoUser.getSession(
            async (error: Error | null, session: CognitoUserSession | null) => {
              if (error) {
                reject(error);
                console.error(error);
              }
              const attributes = await getUserAttributes(cognitoUser);

              const token = session?.getIdToken().getJwtToken();

              // use the token or Bearer depend on the wait BE handle, by default amplify API only need to token.
              axios.defaults.headers.common.Authorization = token as string;

              resolve({
                cognitoUser,
                session,
                headers: {
                  Authorization: token,
                },
              });

              dispatch({
                type: Types.AUTH,
                payload: {
                  isAuthenticated: true,
                  user: {
                    ...cognitoUser,
                    ...attributes,
                    displayName: attributes.name,
                    role: 'admin',
                  },
                },
              });
            }
          );
        } else {
          dispatch({
            type: Types.AUTH,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [getUserAttributes]
  );

  const initialize = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: Types.AUTH,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [getSession]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.

  // LOGIN
  const login = useCallback(
    (email: string, password: string) =>
      new Promise((resolve, reject) => {
        const userData = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        userData.authenticateUser(authDetails, {
          onSuccess: (result) => {
            getSession();
            resolve(result);
          },
          onFailure: (error) => {
            reject(error);
          },
        });
      }),
    [getSession]
  );

  // REGISTER
  const register = useCallback(
    (email: string, password: string, firstName: string, lastName: string) =>
      new Promise((resolve, reject) => {
        const newAttributes = [
          new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          }),
          new CognitoUserAttribute({
            Name: 'name',
            Value: `${firstName} ${lastName}`,
          }),
        ];

        userPool.signUp(email, password, newAttributes, [], async (error) => {
          if (error) {
            reject(error);
            console.error(error);
            return;
          }

          resolve(undefined);
          window.location.href = PATH_AUTH.login;
        });
      }),
    []
  );

  // LOGOUT
  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      dispatch({
        type: Types.LOGOUT,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        login,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
