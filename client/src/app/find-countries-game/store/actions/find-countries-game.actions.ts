import {createAction, props} from '@ngrx/store';

export const setMapCountries = createAction('[FIND COUNTRIES GAME] Set Map Countries', props<{ payload: Array<string>}>());

export const setMapSelection = createAction('[FIND COUNTRIES GAME] Set Map Selection', props<{ payload: string}>());

export const startGame = createAction('[FIND COUNTRIES GAME] Game Started');
export const reStartGame = createAction('[FIND COUNTRIES GAME] Game Restart', props<{payload: string}>());
export const gameFinished = createAction('[FIND COUNTRIES GAME] Game Finished');

export const setUserSelectionCountry = createAction('[FIND COUNTRIES GAME] Set User Selection Country', props<{ payload: any}>());

export const changeCountryToFind = createAction('[FIND COUNTRIES GAME] Change Country To Find');