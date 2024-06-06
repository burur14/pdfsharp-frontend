import { createReducer, on } from "@ngrx/store";
import { initialExplorerState } from "./explorer.store";
import { getProjectAction, getProjectFailAction, getProjectSuccessAction, getProjectsAction, getProjectsFailAction, getProjectsSuccessAction } from "./explorer.actions";

export const explorerReducer = createReducer(initialExplorerState,
    on(getProjectsSuccessAction, (state, { projects }) => {
        return {
            ...state,
            projects: projects,
           // isLoginPage: true
        }
    }),
    on(getProjectSuccessAction, (state, { project }) => {
        return {
            ...state,
            project: project,
        }
    }),
    on(getProjectAction, (state) => {
        return {
            ...state,
            isLoadingProject: true
        }
    }),
    on(getProjectSuccessAction, (state) => {
        return {
            ...state,
            isLoadingProject: false
        }
    }),
    on(getProjectFailAction, (state) => {
        return {
            ...state,
            isLoadingProject: false
        }
    }),

    // on(toggleLoginPopupAction, (state, { isLoadingPage }) => {
    //     return {
    //         ...state,
    //         isLoginPage: isLoadingPage
    //     }
    // }),
    // on(signInUserFailAction, (state, { message }) => {
    //     return { ...state, messages: [...state.messages, message] };
    // }),
    // on(logInUserFailAction, (state, { message }) => {
    //     return { ...state, messages: [...state.messages, message] };
    // }),
    // on(deleteMessagesAction, (state) => {
    //     return { ...state, messages: [] };
    // }),
    // on(authInfoGetUserSuccessAction, (state, {user}) => {
    //     return { ...state, user: user };
    // }),
    // on(addMessagesAction, (state, { message }) => {
    //     return { ...state, messages: [...state.messages, message] };
    // }),
    // on(resetPasswordSuccessAction, (state, { message }) => {
    //     return { ...state, messages: [...state.messages, message] };
    // }),
    // on(resetPasswordFailAction, (state, { message }) => {
    //     return { ...state, messages: [...state.messages, message] };
    // }),
    );