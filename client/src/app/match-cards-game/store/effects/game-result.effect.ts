import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createSelector } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, switchMapTo } from "rxjs/operators";
import { GameResultService } from "../../services/game-result.service";
import { getGameResults, getGameResultsSuccess, getGameResultsFailure, saveGameResult, saveGameResultFailure, saveGameResultSuccess, updateGameResultSuccess, updateGameResult, updateGameResultFailure } from "../actions/game-result.actions";

@Injectable()
export class GameResultEffects {

    constructor(
        private actions$: Actions,
        private gameResultService: GameResultService
    ) {}
    

    saveGameResults$ = createEffect(() => this.actions$.pipe(
        ofType(saveGameResult),
        switchMap((action) => this.gameResultService.saveResult(action.payload).pipe(
                map((response) => saveGameResultSuccess({payload: response })),
                catchError(() => of(saveGameResultFailure()))
            )
        )
    ));

    getGameResults$ = createEffect(() => this.actions$.pipe(
        ofType(getGameResults),
        switchMap(() => this.gameResultService.getUserResults().pipe(
                map((response) => getGameResultsSuccess({payload: response })),
                catchError(() => of(getGameResultsFailure()))
            )
        )
    ));

    updateGameResult$ = createEffect(() => this.actions$.pipe(
        ofType(updateGameResult),
        switchMap((action) => this.gameResultService.updateResult(action.payload).pipe(
            map((response) => updateGameResultSuccess({payload: response})),
            catchError(() => of(updateGameResultFailure()))
        ))
    ))
}