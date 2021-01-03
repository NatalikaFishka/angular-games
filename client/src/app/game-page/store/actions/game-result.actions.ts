import {createAction, props} from '@ngrx/store';
import { SaveResult } from '../../models';

export const getGameResults = createAction('[GAME RESULT] Get Results');
export const getGameResultsSuccess = createAction('[GAME RESULT] Get Results Success', props<{ payload: SaveResult }>());
export const getGameResultsFailure = createAction('[GAME RESULT] Get Results Failure');

export const saveGameResult = createAction('[GAME RESULT] Save Result', props<{ payload: SaveResult }>());
export const saveGameResultSuccess = createAction('[GAME RESULT] Save Result Success',  props<{ payload: SaveResult }>());
export const saveGameResultFailure = createAction('[GAME RESULT] Save Result Failure');

export const updateGameResult = createAction('[GAME RESULT] Update Result', props<{ payload: any }>());
export const updateGameResultSuccess = createAction('[GAME RESULT] Update Result Success',  props<{ payload: any }>());
export const updateGameResultFailure = createAction('[GAME RESULT] Update Result Failure');


export const clearGameResultsInStore = createAction('[GAME RESULT] Clear');

// not used action yet

export const gameStarted = createAction('[GAME RESULT] Game Started');
export const increaseTimer = createAction('[GAME RESULT] Game Timer Increased', props<{time: number}>());
export const gameFinished = createAction('[GAME RESULT] Game Finished', props<{gameFinalTime: number}>());
export const resetGame = createAction('[GAME RESULT] Reset Game');
export const setGameSettings = createAction('[GAME RESULT] Set Game Settings', props<{payload: any}>());