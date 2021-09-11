import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { AuthServerResponse, UserData } from "../../models";

export const login = createAction('[Auth] Login', props<{payload: UserData}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{payload: AuthServerResponse}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{payload: HttpErrorResponse}>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

export const registration = createAction('[Auth] Registration', props<{payload: UserData}>());
export const registrationSuccess = createAction('[Auth] Registration Success', props<{payload: AuthServerResponse}>());
export const registrationFailure = createAction('[Auth] Registration Failure', props<{payload: HttpErrorResponse}>());

export const getAuthenticatedUser = createAction('[Auth] Get Authenticated User');
export const getAuthenticatedUserSuccess = createAction('[Auth] Get Authenticated User Success', props<{payload: AuthServerResponse}>());
export const getAuthenticatedUserFailure = createAction('[Auth] Get Authenticated User Failure', props<{payload: HttpErrorResponse}>());