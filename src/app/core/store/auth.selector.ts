import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AUTH_ACTION_KEY, AuthState } from "./auth.store";


export const selectAuthState = createFeatureSelector<AuthState>(AUTH_ACTION_KEY);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

export const selectIsLoginPage = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoginPage
);

export const selectIsForgotPasswordModelOpen = createSelector(
    selectAuthState,
    (state: AuthState) => state.isForgotPasswordModelOpen
  );
export const selectMessages = createSelector(
    selectAuthState,
    (state: AuthState) => state.messages
  );

// export const selectImageItems = createSelector(
//     selectPdfEditState,
//     (state: PdfEditState) => state.imageItems
// );

// export const selectPageNum = createSelector(
//     selectPdfEditState,
//     (state: PdfEditState) => state.pageNum
//);