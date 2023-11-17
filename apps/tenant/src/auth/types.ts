import { IsEmail, MinLength } from 'class-validator';
import { UserCredential } from 'firebase/auth';
import { User } from 'src/@core/services/user.types';

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: 'jwt';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};

export type FirebaseContextType = {
  method: 'firebase';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle?: () => Promise<UserCredential>;
  loginWithGithub?: () => Promise<UserCredential>;
  loginWithTwitter?: () => Promise<UserCredential>;
};

export type AWSCognitoContextType = {
  method: 'cognito';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>;
  logout: VoidFunction;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};

export type Auth0ContextType = {
  method: 'auth0';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;

  // login: () => Promise<void>;
  logout: VoidFunction;

  // To avoid conflicts between types this is just a temporary declaration.
  // Remove below when you choose to authenticate with Auth0.
  login: (email?: string, password?: string) => Promise<void>;
  register?: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};

export type AuthValuesType = {
  isAuthenticated: boolean
  isInitialized: boolean
  loading: boolean
  method: string
  logout: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams) => Promise<void>
  register: (params: RegisterInput, errorCallback?: ErrCallbackType) => void
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export class RegisterInput {
  @MinLength(2)
  firstName: string;

  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string
}

