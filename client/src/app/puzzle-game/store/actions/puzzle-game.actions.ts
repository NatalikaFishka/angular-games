import {createAction, props} from '@ngrx/store';

export const gameIsOn = createAction('[PUZZLE GAME] Game Is Ongoing');
export const gameIsOff = createAction('[PUZZLE GAME] Game Is Off');
export const gameFinishedWithSuccess = createAction('[PUZZLE GAME] Game Finished With Success');