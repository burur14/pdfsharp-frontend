import { Action, createAction, props } from '@ngrx/store';
import { AUTH_ACTION_KEY } from './auth.store';
import { UserModel } from '../../features/authentication/models/user-model';
import { MessageModel } from 'src/app/shared/models/message-model';
import { ResetPassword } from 'src/app/features/authentication/services/models/reset-password.model';

export const SIGNIN_USER = `${AUTH_ACTION_KEY} SignIn user`;
export const SIGNIN_USER_SUCCESS_TYPE = `${AUTH_ACTION_KEY} SignIn user Success`;
export const SIGNIN_USER_FAIL_TYPE = `${AUTH_ACTION_KEY} SignIn user Fail`;

export const signInUserAction = createAction(
    SIGNIN_USER,
    props<{ user: UserModel }>()
);

export const signInUserSuccessAction = createAction(
    SIGNIN_USER_SUCCESS_TYPE,
    props<{ user: UserModel }>()
);

export const signInUserFailAction = createAction(
    SIGNIN_USER_FAIL_TYPE,
    props<{ message: MessageModel }>()
);

export const LOGIN_USER = `${AUTH_ACTION_KEY} LogIn user`;
export const LOGIN_USER_SUCCESS_TYPE = `${AUTH_ACTION_KEY} LogIn user Success`;
export const LOGIN_USER_FAIL_TYPE = `${AUTH_ACTION_KEY} LogIn user Fail`;

export const logInUserAction = createAction(
    LOGIN_USER,
    props<{ user: UserModel }>()
);

export const logInUserSuccessAction = createAction(
    LOGIN_USER_SUCCESS_TYPE
);

export const logInUserFailAction = createAction(
    LOGIN_USER_FAIL_TYPE,
    props<{ message: MessageModel }>()
);

export const TOGGLE_LOGIN_POPUP = `${AUTH_ACTION_KEY} toggle popup`;

export const toggleLoginPopupAction = createAction(
    TOGGLE_LOGIN_POPUP,
    props<{ isLoadingPage: boolean }>()
);

export const ADD_MESSAGES_TYPE = `${AUTH_ACTION_KEY} Add Message`;

export const addMessagesAction = createAction(
    ADD_MESSAGES_TYPE,
    props<{ message: MessageModel }>()
);

export const DELETE_MESSAGES_TYPE = `${AUTH_ACTION_KEY} Delete Messages`;

export const deleteMessagesAction = createAction(DELETE_MESSAGES_TYPE);

export const AUTH_INFO_GETUSER = `${AUTH_ACTION_KEY} Get User`;
export const AUTH_INFO_GETUSER_SUCCESS_TYPE = `${AUTH_ACTION_KEY} Get User Success`;
export const AUTH_INFO_GETUSER_FAIL_TYPE = `${AUTH_ACTION_KEY} Get User Fail`;

export const authInfoGetUserAction = createAction(
    AUTH_INFO_GETUSER,
    props<{ upn: string }>()
);

export const authInfoGetUserSuccessAction = createAction(
    AUTH_INFO_GETUSER_SUCCESS_TYPE,
    props<{ user: UserModel }>()
);

export const authInfoGetUserFailAction = createAction(
    AUTH_INFO_GETUSER_FAIL_TYPE,
    props<{ message: MessageModel }>()
);


export const GETUSERS = `${AUTH_ACTION_KEY} Get Userss`;
export const GETUSERSSUCCESS = `${AUTH_ACTION_KEY} Get Userss SS`;


export const getUsersAction = createAction(
    GETUSERS,
);
export const getUsersActionSuccess = createAction(
    GETUSERSSUCCESS,
    props<{ users: UserModel[] }>()
);


export const RESET_PASSWORD = `${AUTH_ACTION_KEY} Reset Password`;
export const RESET_PASSWORD_SUCCESS_TYPE = `${AUTH_ACTION_KEY} Reset Password Success`;
export const RESET_PASSWORD_FAIL_TYPE = `${AUTH_ACTION_KEY} Reset Password Fail`;

export const resetPasswordAction = createAction(
    RESET_PASSWORD,
    props<{ upn: string }>()
);

export const resetPasswordSuccessAction = createAction(
    RESET_PASSWORD_SUCCESS_TYPE,
    props<{ message: MessageModel }>()
);

export const resetPasswordFailAction = createAction(
    RESET_PASSWORD_FAIL_TYPE,
    props<{ message: MessageModel }>()
);


export const CONFIRM_RESET_PASSWORD = `${AUTH_ACTION_KEY} Confirm Reset Password`;
export const CONFIRM_RESET_PASSWORD_SUCCESS_TYPE = `${AUTH_ACTION_KEY} Confirm Reset Password Success`;
export const CONFIRM_RESET_PASSWORD_FAIL_TYPE = `${AUTH_ACTION_KEY} Confirm Reset Password Fail`;

export const confirmResetPasswordAction = createAction(
    CONFIRM_RESET_PASSWORD,
    props<{ resetPasswordObj: ResetPassword }>()
);

export const confirmResetPasswordSuccessAction = createAction(
    CONFIRM_RESET_PASSWORD_SUCCESS_TYPE,
    props<{ message: MessageModel }>()
);

export const confirmResetPasswordFailAction = createAction(
    CONFIRM_RESET_PASSWORD_FAIL_TYPE,
    props<{ message: MessageModel }>()
);
