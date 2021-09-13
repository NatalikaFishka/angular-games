import { createReducer, on } from "@ngrx/store";
import * as findCountriesGameActions from '../actions/find-countries-game.actions'

export interface FindCountriesGameState {
    loading: boolean;
    currentMap: string;
    mapData: Array<string>;
    regionsToFind: number | undefined;
    countryToFind: string;
    isGameOn: boolean;
    userSelection: {
        countryName: string;
        countryId: string
    },
    foundCountry: Array<string>
}

const initialState: FindCountriesGameState = {
    loading: true,
    currentMap: "",
    mapData: [],
    regionsToFind: undefined,
    countryToFind: "",
    isGameOn: false,
    userSelection: {
        countryName: '',
        countryId: ''
    },
    foundCountry: []
}

export const FindCountriesGameReducer = createReducer<any>(
    initialState,
    on(findCountriesGameActions.setMapSelection, (state, action) => ({
        ...state,
        currentMap: action.payload
    })),
    on(findCountriesGameActions.setMapCountries, (state, action) => {

        let allCountries = [...action.payload];
        let countryToFind = allCountries.pop();

        return {
                ...state,
                mapData: allCountries,
                regionsToFind: action.payload.length,
                countryToFind: countryToFind,
                loading: false
        }
    }),
    on(findCountriesGameActions.startGame, (state) => ({
        ...state,
        isGameOn: true
    })),
    on(findCountriesGameActions.setUserSelectionCountry, (state, action) => ({
        ...state,
        userSelection: {
            countryName: action.payload.name,
            countryId: action.payload.id
        }
    })),
    on(findCountriesGameActions.changeCountryToFind, (state) => {

        let foundCountry = [...state.foundCountry, state.userSelection.countryId];
        let allCountries = [...state.mapData];
        let countryToFind = allCountries.pop();

        return {
            ...state,
            foundCountry: foundCountry,
            mapData: allCountries,
            countryToFind: countryToFind,
            userSelection: {
                countryName: "",
                countryId: ""
            }
        }
    }),
    on(findCountriesGameActions.gameFinished, (state) => ({
        ...state,
        isGameOn: false
    })),
    on(findCountriesGameActions.reStartGame, (state, action) => ({
        ...initialState,
        currentMap: action.payload
    }))
)

