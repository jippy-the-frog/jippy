// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
  urlSearchParamsBodySerializer,
} from "@hey-api/client-axios";

import type {
  AuthGoogleAuthGoogleGetData,
  AuthGoogleAuthGoogleGetError,
  AuthGoogleAuthGoogleGetResponse,
  GetUserAuthSessionGetData,
  GetUserAuthSessionGetError,
  GetUserAuthSessionGetResponse,
  LogInAuthLoginPostData,
  LogInAuthLoginPostError,
  LogInAuthLoginPostResponse,
  LoginGoogleAuthLoginGoogleGetError,
  LoginGoogleAuthLoginGoogleGetResponse,
  SignUpAuthSignupPostData,
  SignUpAuthSignupPostError,
  SignUpAuthSignupPostResponse,
} from "./types.gen";

export const client = createClient(
  createConfig({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL }),
);

/**
 * Sign Up
 */
export const signUpAuthSignupPost = <ThrowOnError extends boolean = false>(
  options: Options<SignUpAuthSignupPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    SignUpAuthSignupPostResponse,
    SignUpAuthSignupPostError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/signup",
  });
};

/**
 * Log In
 */
export const logInAuthLoginPost = <ThrowOnError extends boolean = false>(
  options: Options<LogInAuthLoginPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    LogInAuthLoginPostResponse,
    LogInAuthLoginPostError,
    ThrowOnError
  >({
    ...options,
    ...urlSearchParamsBodySerializer,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options?.headers,
    },
    url: "/auth/login",
  });
};

/**
 * Login Google
 */
export const loginGoogleAuthLoginGoogleGet = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    LoginGoogleAuthLoginGoogleGetResponse,
    LoginGoogleAuthLoginGoogleGetError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/login/google",
  });
};

/**
 * Auth Google
 */
export const authGoogleAuthGoogleGet = <ThrowOnError extends boolean = false>(
  options: Options<AuthGoogleAuthGoogleGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    AuthGoogleAuthGoogleGetResponse,
    AuthGoogleAuthGoogleGetError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/google",
  });
};

/**
 * Get User
 */
export const getUserAuthSessionGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetUserAuthSessionGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUserAuthSessionGetResponse,
    GetUserAuthSessionGetError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/session",
  });
};
