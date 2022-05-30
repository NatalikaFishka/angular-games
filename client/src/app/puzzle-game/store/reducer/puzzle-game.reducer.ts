import { createReducer, on } from "@ngrx/store";
import * as puzzleGameActions from "../actions/puzzle-game.actions";

export interface PuzzleGameState {
    loading: boolean;
    isGameOn: boolean;
    finishedWithSuccess: boolean;
}

const initialState: PuzzleGameState = {
    loading: false,
    isGameOn: false,
    finishedWithSuccess: false,
}

export const PuzzleGameReducer = createReducer<any>(
    initialState,
    on(puzzleGameActions.gameIsOn, () => ({
        ...initialState,
        isGameOn: true 
    })),
    on(puzzleGameActions.gameFinishedWithSuccess, (state) => ({
        ...state,
        isGameOn: false,
        finishedWithSuccess: true
    })),
    on(puzzleGameActions.gameIsOff, () => ({
        ...initialState
    })),
)