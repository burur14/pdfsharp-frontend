import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.store";
import { addMessagesAction, authInfoGetUserSuccessAction, deleteMessagesAction, logInUserFailAction, resetPasswordFailAction, resetPasswordSuccessAction, signInUserFailAction, signInUserSuccessAction, toggleLoginPopupAction } from "./auth.actions";

export const authReducer = createReducer(initialAuthState,
    on(signInUserSuccessAction, (state, { user }) => {
        return {
            ...state,
            user: user,
            isLoginPage: true
        }
    }),

    on(toggleLoginPopupAction, (state, { isLoadingPage }) => {
        return {
            ...state,
            isLoginPage: isLoadingPage
        }
    }),
    on(signInUserFailAction, (state, { message }) => {
        return { ...state, messages: [...state.messages, message] };
    }),
    on(logInUserFailAction, (state, { message }) => {
        return { ...state, messages: [...state.messages, message] };
    }),
    on(deleteMessagesAction, (state) => {
        return { ...state, messages: [] };
    }),
    on(authInfoGetUserSuccessAction, (state, {user}) => {
        return { ...state, user: user };
    }),
    on(addMessagesAction, (state, { message }) => {
        return { ...state, messages: [...state.messages, message] };
    }),
    on(resetPasswordSuccessAction, (state, { message }) => {
        return { ...state, messages: [...state.messages, message] };
    }),
    on(resetPasswordFailAction, (state, { message }) => {
        return { ...state, messages: [...state.messages, message] };
    }),
    );