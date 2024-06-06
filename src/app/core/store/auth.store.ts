import { MessageModel } from "src/app/shared/models/message-model";
import { UserModel } from "../../features/authentication/models/user-model";

export const AUTH_ACTION_KEY = '[AUTH]';

export interface AuthState {
    user: UserModel,
    isLoginPage: boolean,
    isForgotPasswordModelOpen: boolean,
    messages: MessageModel[]
}

export const initialAuthState: AuthState = {
    user: new UserModel(),
    isLoginPage: true,
    isForgotPasswordModelOpen: true,
    messages: <MessageModel[]>[]
}