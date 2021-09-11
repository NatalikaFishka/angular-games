import { createReducer, on } from "@ngrx/store";
import { getAuthenticatedUserSuccess, loginSuccess, logoutSuccess, registrationSuccess } from "../actions/auth.actions";

export interface AuthUserState {
    isAuthenticated: boolean;
    email: string | undefined;
    loading: boolean;
    error: Error | undefined;
};

const initialState: AuthUserState = {
    isAuthenticated: false,
    email: undefined,
    loading: false,
    error: undefined
};

export const AuthUserReducer = createReducer<any>(
    initialState,
    on(loginSuccess, (state, action) => ({...state, isAuthenticated: true, email: action.payload.email})),
    on(registrationSuccess, (state, action) => ({...state, isAuthenticated: true, email: action.payload.email})),
    on(getAuthenticatedUserSuccess, (state, action) => ({...state, isAuthenticated: true, email: action.payload.email})),
    on(logoutSuccess, (state) => ({...state, isAuthenticated: false, email: undefined}))
)