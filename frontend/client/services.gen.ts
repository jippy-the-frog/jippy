// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
  urlSearchParamsBodySerializer,
} from "./client";
import { categoryIdsSerializer } from "./core/utils";
import type {
  AskGpQuestionUserQuestionsAskGpQuestionGetData,
  AskGpQuestionUserQuestionsAskGpQuestionGetError,
  AskGpQuestionUserQuestionsAskGpQuestionGetResponse,
  AuthGoogleAuthGoogleGetData,
  AuthGoogleAuthGoogleGetError,
  AuthGoogleAuthGoogleGetResponse,
  ChangePasswordAuthChangePasswordPutData,
  ChangePasswordAuthChangePasswordPutError,
  ChangePasswordAuthChangePasswordPutResponse,
  CompletePasswordResetAuthPasswordResetPutData,
  CompletePasswordResetAuthPasswordResetPutError,
  CompletePasswordResetAuthPasswordResetPutResponse,
  CreateNoteNotesPostData,
  CreateNoteNotesPostError,
  CreateNoteNotesPostResponse,
  CreateUserQuestionUserQuestionsPostData,
  CreateUserQuestionUserQuestionsPostError,
  CreateUserQuestionUserQuestionsPostResponse,
  DeleteNoteNotesIdDeleteData,
  DeleteNoteNotesIdDeleteError,
  DeleteNoteNotesIdDeleteResponse,
  GetAllNotesNotesGetData,
  GetAllNotesNotesGetError,
  GetAllNotesNotesGetResponse,
  GetCategoriesCategoriesGetError,
  GetCategoriesCategoriesGetResponse,
  GetEventEventsIdGetData,
  GetEventEventsIdGetError,
  GetEventEventsIdGetResponse,
  GetEventNotesEventsIdNotesGetData,
  GetEventNotesEventsIdNotesGetError,
  GetEventNotesEventsIdNotesGetResponse,
  GetEventsEventsGetData,
  GetEventsEventsGetError,
  GetEventsEventsGetResponse,
  GetPointNotesPointsIdNotesGetData,
  GetPointNotesPointsIdNotesGetError,
  GetPointNotesPointsIdNotesGetResponse,
  GetUserAuthSessionGetData,
  GetUserAuthSessionGetError,
  GetUserAuthSessionGetResponse,
  GetUserQuestionsUserQuestionsGetData,
  GetUserQuestionsUserQuestionsGetError,
  GetUserQuestionsUserQuestionsGetResponse,
  GetUserQuestionUserQuestionsIdGetData,
  GetUserQuestionUserQuestionsIdGetError,
  GetUserQuestionUserQuestionsIdGetResponse,
  LogInAuthLoginPostData,
  LogInAuthLoginPostError,
  LogInAuthLoginPostResponse,
  LoginGoogleAuthLoginGoogleGetError,
  LoginGoogleAuthLoginGoogleGetResponse,
  LogoutAuthLogoutGetError,
  LogoutAuthLogoutGetResponse,
  ReadEventEventsIdReadPostData,
  ReadEventEventsIdReadPostError,
  ReadEventEventsIdReadPostResponse,
  RequestPasswordResetAuthPasswordResetPostData,
  RequestPasswordResetAuthPasswordResetPostError,
  RequestPasswordResetAuthPasswordResetPostResponse,
  SearchWhateverEventsSearchGetData,
  SearchWhateverEventsSearchGetError,
  SearchWhateverEventsSearchGetResponse,
  SignUpAuthSignupPostData,
  SignUpAuthSignupPostError,
  SignUpAuthSignupPostResponse,
  UpdateNoteNotesIdPutData,
  UpdateNoteNotesIdPutError,
  UpdateNoteNotesIdPutResponse,
  UpdateProfileProfilePutData,
  UpdateProfileProfilePutError,
  UpdateProfileProfilePutResponse,
} from "./types.gen";

export const client = createClient(createConfig());

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

/**
 * Logout
 */
export const logoutAuthLogoutGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    LogoutAuthLogoutGetResponse,
    LogoutAuthLogoutGetError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/logout",
  });
};

/**
 * Request Password Reset
 */
export const requestPasswordResetAuthPasswordResetPost = <
  ThrowOnError extends boolean = false,
>(
  options: Options<RequestPasswordResetAuthPasswordResetPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    RequestPasswordResetAuthPasswordResetPostResponse,
    RequestPasswordResetAuthPasswordResetPostError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/password-reset",
  });
};

/**
 * Complete Password Reset
 */
export const completePasswordResetAuthPasswordResetPut = <
  ThrowOnError extends boolean = false,
>(
  options: Options<CompletePasswordResetAuthPasswordResetPutData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    CompletePasswordResetAuthPasswordResetPutResponse,
    CompletePasswordResetAuthPasswordResetPutError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/password-reset",
  });
};

/**
 * Change Password
 */
export const changePasswordAuthChangePasswordPut = <
  ThrowOnError extends boolean = false,
>(
  options: Options<ChangePasswordAuthChangePasswordPutData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    ChangePasswordAuthChangePasswordPutResponse,
    ChangePasswordAuthChangePasswordPutError,
    ThrowOnError
  >({
    ...options,
    url: "/auth/change-password",
  });
};

/**
 * Get Categories
 */
export const getCategoriesCategoriesGet = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetCategoriesCategoriesGetResponse,
    GetCategoriesCategoriesGetError,
    ThrowOnError
  >({
    ...options,
    url: "/categories/",
  });
};

/**
 * Update Profile
 */
export const updateProfileProfilePut = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProfileProfilePutData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    UpdateProfileProfilePutResponse,
    UpdateProfileProfilePutError,
    ThrowOnError
  >({
    ...options,
    url: "/profile/",
  });
};

/**
 * Get Events
 */
export const getEventsEventsGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetEventsEventsGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetEventsEventsGetResponse,
    GetEventsEventsGetError,
    ThrowOnError
  >({
    ...options,
    paramsSerializer: categoryIdsSerializer,
    url: "/events/",
  });
};

/**
 * Get Event
 */
export const getEventEventsIdGet = <ThrowOnError extends boolean = false>(
  options: Options<GetEventEventsIdGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetEventEventsIdGetResponse,
    GetEventEventsIdGetError,
    ThrowOnError
  >({
    ...options,
    url: "/events/:id",
  });
};

/**
 * Get Event Notes
 */
export const getEventNotesEventsIdNotesGet = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetEventNotesEventsIdNotesGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetEventNotesEventsIdNotesGetResponse,
    GetEventNotesEventsIdNotesGetError,
    ThrowOnError
  >({
    ...options,
    url: "/events/:id/notes",
  });
};

/**
 * Read Event
 */
export const readEventEventsIdReadPost = <ThrowOnError extends boolean = false>(
  options: Options<ReadEventEventsIdReadPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    ReadEventEventsIdReadPostResponse,
    ReadEventEventsIdReadPostError,
    ThrowOnError
  >({
    ...options,
    url: "/events/:id/read",
  });
};

/**
 * Search Whatever
 */
export const searchWhateverEventsSearchGet = <
  ThrowOnError extends boolean = false,
>(
  options: Options<SearchWhateverEventsSearchGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    SearchWhateverEventsSearchGetResponse,
    SearchWhateverEventsSearchGetError,
    ThrowOnError
  >({
    ...options,
    url: "/events/search",
  });
};

/**
 * Get User Questions
 */
export const getUserQuestionsUserQuestionsGet = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetUserQuestionsUserQuestionsGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUserQuestionsUserQuestionsGetResponse,
    GetUserQuestionsUserQuestionsGetError,
    ThrowOnError
  >({
    ...options,
    url: "/user-questions/",
  });
};

/**
 * Create User Question
 */
export const createUserQuestionUserQuestionsPost = <
  ThrowOnError extends boolean = false,
>(
  options: Options<CreateUserQuestionUserQuestionsPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateUserQuestionUserQuestionsPostResponse,
    CreateUserQuestionUserQuestionsPostError,
    ThrowOnError
  >({
    ...options,
    url: "/user-questions/",
  });
};

/**
 * Get User Question
 */
export const getUserQuestionUserQuestionsIdGet = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetUserQuestionUserQuestionsIdGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUserQuestionUserQuestionsIdGetResponse,
    GetUserQuestionUserQuestionsIdGetError,
    ThrowOnError
  >({
    ...options,
    url: "/user-questions/:id",
  });
};

/**
 * Ask Gp Question
 */
export const askGpQuestionUserQuestionsAskGpQuestionGet = <
  ThrowOnError extends boolean = false,
>(
  options: Options<
    AskGpQuestionUserQuestionsAskGpQuestionGetData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).get<
    AskGpQuestionUserQuestionsAskGpQuestionGetResponse,
    AskGpQuestionUserQuestionsAskGpQuestionGetError,
    ThrowOnError
  >({
    ...options,
    url: "/user-questions/ask-gp-question",
  });
};

/**
 * Get All Notes
 */
export const getAllNotesNotesGet = <ThrowOnError extends boolean = false>(
  options?: Options<GetAllNotesNotesGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetAllNotesNotesGetResponse,
    GetAllNotesNotesGetError,
    ThrowOnError
  >({
    ...options,
    url: "/notes/",
  });
};

/**
 * Create Note
 */
export const createNoteNotesPost = <ThrowOnError extends boolean = false>(
  options: Options<CreateNoteNotesPostData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateNoteNotesPostResponse,
    CreateNoteNotesPostError,
    ThrowOnError
  >({
    ...options,
    url: "/notes/",
  });
};

/**
 * Update Note
 */
export const updateNoteNotesIdPut = <ThrowOnError extends boolean = false>(
  options: Options<UpdateNoteNotesIdPutData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    UpdateNoteNotesIdPutResponse,
    UpdateNoteNotesIdPutError,
    ThrowOnError
  >({
    ...options,
    url: "/notes/:id",
  });
};

/**
 * Delete Note
 */
export const deleteNoteNotesIdDelete = <ThrowOnError extends boolean = false>(
  options: Options<DeleteNoteNotesIdDeleteData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteNoteNotesIdDeleteResponse,
    DeleteNoteNotesIdDeleteError,
    ThrowOnError
  >({
    ...options,
    url: "/notes/:id",
  });
};

/**
 * Get Point Notes
 */
export const getPointNotesPointsIdNotesGet = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetPointNotesPointsIdNotesGetData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetPointNotesPointsIdNotesGetResponse,
    GetPointNotesPointsIdNotesGetError,
    ThrowOnError
  >({
    ...options,
    url: "/points/:id/notes",
  });
};
