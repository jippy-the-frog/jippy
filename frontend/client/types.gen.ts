// This file is auto-generated by @hey-api/openapi-ts

export type AnalysisDTO = {
    id: number;
    category: CategoryDTO;
    content: string;
};

export type AnswerDTO = {
    id: number;
    points: Array<PointMiniDTO>;
};

export type ArticleDTO = {
    id: number;
    title: string;
    summary: string;
    body: string;
    url: string;
    source: ArticleSource;
    date: string;
    image_url: string;
};

export type ArticleSource = 'CNA' | 'GUARDIAN';

export type Body_log_in_auth_login_post = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
};

export type CategoryDTO = {
    id: number;
    name: string;
};

export type CreateUserQuestion = {
    question: string;
};

export type EventDTO = {
    id: number;
    title: string;
    description: string;
    is_singapore: boolean;
    date: string;
    categories: Array<CategoryDTO>;
    original_article: ArticleDTO;
    reads: Array<ReadDTO>;
    analysises: Array<AnalysisDTO>;
    gp_questions: Array<GPQuestionDTO>;
};

export type EventIndexResponse = {
    total_count: number;
    count: number;
    data: Array<MiniEventDTO>;
};

export type GPQuestionDTO = {
    id: number;
    question: string;
    is_llm_generated: boolean;
    categories: Array<CategoryDTO>;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type MiniEventDTO = {
    id: number;
    title: string;
    description: string;
    is_singapore: boolean;
    date: string;
    categories: Array<CategoryDTO>;
    original_article: ArticleDTO;
    reads: Array<ReadDTO>;
};

export type NoteCreate = {
    content: string;
    start_index: number;
    end_index: number;
    parent_id: number;
    parent_type: NoteType;
};

export type NoteDTO = {
    id: number;
    content: string;
    start_index: number;
    end_index: number;
    parent_id: number;
    parent_type: NoteType;
};

export type NoteType = 'event' | 'article' | 'point';

export type NoteUpdate = {
    content: string;
    start_index: number;
    end_index: number;
};

export type PasswordResetCompleteData = {
    password: string;
    confirm_password: string;
};

export type PasswordResetMoreCompleteData = {
    password: string;
    confirm_password: string;
    old_password: string;
};

export type PasswordResetRequestData = {
    email: string;
};

export type PointMiniDTO = {
    id: number;
    title: string;
    body: string;
    events: Array<EventDTO>;
};

export type ProfileUpdate = {
    category_ids: Array<(number)>;
};

export type ReadDTO = {
    first_read: string;
    last_read: string;
};

export type SignUpData = {
    email: string;
    password: string;
};

export type Token = {
    access_token: string;
    token_type: string;
    user: UserPublic;
};

export type UserPublic = {
    id: number;
    email: string;
    categories: Array<CategoryDTO>;
};

export type UserQuestionMiniDTO = {
    id: number;
    question: string;
    answer: AnswerDTO;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type SignUpAuthSignupPostData = {
    body: SignUpData;
};

export type SignUpAuthSignupPostResponse = (Token);

export type SignUpAuthSignupPostError = (HTTPValidationError);

export type LogInAuthLoginPostData = {
    body: Body_log_in_auth_login_post;
};

export type LogInAuthLoginPostResponse = (Token);

export type LogInAuthLoginPostError = (HTTPValidationError);

export type LoginGoogleAuthLoginGoogleGetResponse = (unknown);

export type LoginGoogleAuthLoginGoogleGetError = unknown;

export type AuthGoogleAuthGoogleGetData = {
    query: {
        code: string;
    };
};

export type AuthGoogleAuthGoogleGetResponse = (Token);

export type AuthGoogleAuthGoogleGetError = (HTTPValidationError);

export type GetUserAuthSessionGetData = unknown;

export type GetUserAuthSessionGetResponse = (UserPublic);

export type GetUserAuthSessionGetError = (HTTPValidationError);

export type LogoutAuthLogoutGetResponse = (unknown);

export type LogoutAuthLogoutGetError = unknown;

export type RequestPasswordResetAuthPasswordResetPostData = {
    body: PasswordResetRequestData;
};

export type RequestPasswordResetAuthPasswordResetPostResponse = (unknown);

export type RequestPasswordResetAuthPasswordResetPostError = (HTTPValidationError);

export type CompletePasswordResetAuthPasswordResetPutData = {
    body: PasswordResetCompleteData;
    query: {
        code: string;
    };
};

export type CompletePasswordResetAuthPasswordResetPutResponse = (unknown);

export type CompletePasswordResetAuthPasswordResetPutError = (HTTPValidationError);

export type ChangePasswordAuthChangePasswordPutData = {
    body: PasswordResetMoreCompleteData;
};

export type ChangePasswordAuthChangePasswordPutResponse = (unknown);

export type ChangePasswordAuthChangePasswordPutError = (HTTPValidationError);

export type GetCategoriesCategoriesGetResponse = (Array<CategoryDTO>);

export type GetCategoriesCategoriesGetError = unknown;

export type UpdateProfileProfilePutData = {
    body: ProfileUpdate;
};

export type UpdateProfileProfilePutResponse = (UserPublic);

export type UpdateProfileProfilePutError = (HTTPValidationError);

export type GetEventsEventsGetData = {
    query?: {
        category_ids?: (Array<(number)> | null);
        end_date?: (string | null);
        limit?: (number | null);
        offset?: (number | null);
        start_date?: (string | null);
    };
};

export type GetEventsEventsGetResponse = (EventIndexResponse);

export type GetEventsEventsGetError = (HTTPValidationError);

export type GetEventEventsIdGetData = {
    query: {
        id: number;
    };
};

export type GetEventEventsIdGetResponse = (EventDTO);

export type GetEventEventsIdGetError = (HTTPValidationError);

export type GetEventNotesEventsIdNotesGetData = {
    query: {
        id: number;
    };
};

export type GetEventNotesEventsIdNotesGetResponse = (Array<NoteDTO>);

export type GetEventNotesEventsIdNotesGetError = (HTTPValidationError);

export type ReadEventEventsIdReadPostData = {
    query: {
        id: number;
    };
};

export type ReadEventEventsIdReadPostResponse = (unknown);

export type ReadEventEventsIdReadPostError = (HTTPValidationError);

export type SearchWhateverEventsSearchGetData = {
    query: {
        query: string;
    };
};

export type SearchWhateverEventsSearchGetResponse = (unknown);

export type SearchWhateverEventsSearchGetError = (HTTPValidationError);

export type GetUserQuestionsUserQuestionsGetData = unknown;

export type GetUserQuestionsUserQuestionsGetResponse = (Array<UserQuestionMiniDTO>);

export type GetUserQuestionsUserQuestionsGetError = (HTTPValidationError);

export type CreateUserQuestionUserQuestionsPostData = {
    body: CreateUserQuestion;
};

export type CreateUserQuestionUserQuestionsPostResponse = (UserQuestionMiniDTO);

export type CreateUserQuestionUserQuestionsPostError = (HTTPValidationError);

export type GetUserQuestionUserQuestionsIdGetData = {
    query: {
        id: number;
    };
};

export type GetUserQuestionUserQuestionsIdGetResponse = (unknown);

export type GetUserQuestionUserQuestionsIdGetError = (HTTPValidationError);

export type AskGpQuestionUserQuestionsAskGpQuestionGetData = {
    query: {
        question: string;
    };
};

export type AskGpQuestionUserQuestionsAskGpQuestionGetResponse = (unknown);

export type AskGpQuestionUserQuestionsAskGpQuestionGetError = (HTTPValidationError);

export type GetAllNotesNotesGetData = unknown;

export type GetAllNotesNotesGetResponse = (Array<NoteDTO>);

export type GetAllNotesNotesGetError = (HTTPValidationError);

export type CreateNoteNotesPostData = {
    body: NoteCreate;
};

export type CreateNoteNotesPostResponse = (NoteDTO);

export type CreateNoteNotesPostError = (HTTPValidationError);

export type UpdateNoteNotesIdPutData = {
    body: NoteUpdate;
    query: {
        id: number;
    };
};

export type UpdateNoteNotesIdPutResponse = (NoteDTO);

export type UpdateNoteNotesIdPutError = (HTTPValidationError);

export type DeleteNoteNotesIdDeleteData = {
    query: {
        id: number;
    };
};

export type DeleteNoteNotesIdDeleteResponse = (unknown);

export type DeleteNoteNotesIdDeleteError = (HTTPValidationError);

export type GetPointNotesPointsIdNotesGetData = unknown;

export type GetPointNotesPointsIdNotesGetResponse = (unknown);

export type GetPointNotesPointsIdNotesGetError = (HTTPValidationError);