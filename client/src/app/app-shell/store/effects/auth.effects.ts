import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { getAuthenticatedUser, getAuthenticatedUserFailure, getAuthenticatedUserSuccess, login, loginFailure, loginSuccess, registration, registrationFailure, registrationSuccess } from "../actions/auth.actions";

@Injectable()
export class AuthUserEffects {

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        mergeMap(() => this.authService.getAuthenticatedUser().pipe(
            map(response => getAuthenticatedUserSuccess({payload: response})),
            catchError(() => EMPTY)
        ))        
    ));

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((action) => this.authService.login(action.payload).pipe(
            map((response) => { 
                this.authService.setUserDataToLocalStorage(response);
                this.showToast(response.message);
                return loginSuccess({payload: response});
            }),
            catchError((error) => { 
                this.showToast(error.error.message);
                return of(loginFailure({payload: error}))
            })
        ))
    ))
            
    registration$ = createEffect(() => this.actions$.pipe(
        ofType(registration),
        switchMap((action) => this.authService.createNewUser(action.payload).pipe(
            map((response) => { 
                this.authService.setUserDataToLocalStorage(response);
                this.showToast(response.message);
                return registrationSuccess({ payload: response });
            }),
            catchError((error) => { 
                this.showToast(error.error.message);
                return of(registrationFailure({payload: error}))
            })
        ))
    ));

    getAuthenticatedUser$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUser),
        switchMap(() => this.authService.getAuthenticatedUser().pipe(
            map((response) => {
                this.showToast(response.message)
                return getAuthenticatedUserSuccess({ payload: response })
            }),
            catchError((error) => { 
                this.showToast(error.error.message);
                return of(getAuthenticatedUserFailure({payload: error}))
            })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private toast: MatSnackBar
    ) {}

    private toastConfig: MatSnackBarConfig = {
        duration: 3000,  
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
    }

    private showToast(message: string) {
        this.toast.open(message, undefined, this.toastConfig);
    }
}