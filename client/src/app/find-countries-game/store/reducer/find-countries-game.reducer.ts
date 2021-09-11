import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import * as findCountriesGameActions from '../actions/find-countries-game.actions'

export interface FindCountriesGameState {
    loading: boolean;
    currentMap: string;
    mapData: Array<string>;
}

const initialState: FindCountriesGameState = {
    loading: true,
    currentMap: "",
    mapData: []
}

export const FindCountriesGameReducer = createReducer<any>(
    initialState,
    on(findCountriesGameActions.setMapConfig, (state, action) => ({
        ...state,
        mapData: action.payload,
        loading: false
    }))
)

