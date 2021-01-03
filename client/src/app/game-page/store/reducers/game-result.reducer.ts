import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { GAME_SETTINGS } from "../../config";
import { GameState, MemoryGameResult } from "../../models";
import * as memoryGameActions from '../actions/game-result.actions';

// not used store date commented below

export interface GameResultState {
    bestPreviousResults: Array<MemoryGameResult>;
    loading: boolean;
    error: Error | undefined;
    cardsInGame: number | undefined;
    matchesPerCard: number | undefined;
    // countMatchedCards: number;
    // gameState: GameState;
    // gameTimer: number;
}

const initialState: GameResultState = {
    bestPreviousResults: [],
    loading: false,
    error: undefined,
    cardsInGame: undefined,
    matchesPerCard: undefined,
    // countMatchedCards: 0,
    // gameState: GameState.notStarted,
    // gameTimer: 0
};

export const GameResultReducer = createReducer<any>(
    initialState,
    
    on(memoryGameActions.saveGameResult, (state) => ({
        ...state, 
        loading: true
    })),
    on(memoryGameActions.saveGameResultSuccess, (state, action) => ({
        ...state, 
        bestPreviousResults: [...state.bestPreviousResults , action.payload], 
        loading: false
    })),
    on(memoryGameActions.saveGameResultFailure, (state) => ({
        ...state, 
        loading: false
    })),



    on(memoryGameActions.getGameResults, (state) => ({
        ...state, 
        loading: true
    })),
    on(memoryGameActions.getGameResultsSuccess, (state, action) => ({
        ...state, 
        bestPreviousResults: action.payload, 
        loading: false
    })),
    on(memoryGameActions.getGameResultsFailure, (state) => ({
        ...state, 
        loading: false
    })),



    on(memoryGameActions.updateGameResult, (state) => ({
        ...state, 
        loading: true
    })),
    on(memoryGameActions.updateGameResultSuccess, (state, action) => ({
        ...state, 
        bestPreviousResults: action.payload, 
        loading: false
    })),
    on(memoryGameActions.updateGameResultFailure, (state) => ({
        ...state, 
        loading: false
    })),



    on(memoryGameActions.clearGameResultsInStore, (state) => ({
        ...state, 
        bestPreviousResults: []
    })),

    on(memoryGameActions.setGameSettings, (state, action) => ({
        ...state,
        cardsInGame: action.payload.cardsInGame,
        matchesPerCard: action.payload.matchesPerCard
    }))

);
