import {createAction, props} from '@ngrx/store';

export const setMapConfig = createAction('[FIND COUNTRIES GAME] Set Map Config', props<{ payload: Array<string>}>());