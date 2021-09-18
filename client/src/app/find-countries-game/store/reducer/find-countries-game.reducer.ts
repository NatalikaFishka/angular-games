import { createReducer, on } from "@ngrx/store";
import * as findCountriesGameActions from '../actions/find-countries-game.actions'

export interface FindCountriesGameState {
    loading: boolean;
    currentMap: string;
    mapData: Array<string>;
    isGameOn: boolean;
    gameOnState: GameOnState
}

export interface GameOnState {
    countriesLeftToFind: Array<string>;
    countryToFindNow: string;
    isGameFinished: boolean;
    currentUserSelection: {
        countryName: string;
        countryId: string
    },
    foundCountriesIds: Array<string>
}

const gameOnInitialSate: GameOnState = {
    countriesLeftToFind: [],
    countryToFindNow: "",
    isGameFinished: false,
    currentUserSelection: {
        countryName: '',
        countryId: ''
    },
    foundCountriesIds: []
}

const initialState: FindCountriesGameState = {
    loading: true,
    currentMap: "",
    mapData: [],
    isGameOn: false,
    gameOnState: gameOnInitialSate
}

export const FindCountriesGameReducer = createReducer<any>(
    initialState,
    on(findCountriesGameActions.setMapSelection, (state, action) => ({
        ...state,
        currentMap: action.payload
    })),
    on(findCountriesGameActions.setMapCountries, (state, action) => ({
        ...state,
        mapData: action.payload,
        loading: false        
    })),
    on(findCountriesGameActions.startGame, (state) => {
        
        let allCountries = [...state.mapData];
        let countryToFind = allCountries.pop();

        return {
        ...state,
        isGameOn: true,
        gameOnState: {
            ...gameOnInitialSate,
            countriesLeftToFind: allCountries,
            countryToFindNow: countryToFind
        }
    }}),
    on(findCountriesGameActions.setUserSelectionCountry, (state, action) => ({
        ...state,
        gameOnState: {
            ...state.gameOnState,
            currentUserSelection: {
                countryName: action.payload.name,
                countryId: action.payload.id
            }
        }
    })),
    on(findCountriesGameActions.changeCountryToFind, (state) => {
        
        let foundCountriesIds = [...state.gameOnState.foundCountriesIds, state.gameOnState.currentUserSelection.countryId];
        let allCountriesLeft = [...state.gameOnState.countriesLeftToFind];
        let countryToFindNow = allCountriesLeft.pop();

        return {
            ...state,
            gameOnState: {
                ...state.gameOnState,
                foundCountriesIds: foundCountriesIds,
                countriesLeftToFind: allCountriesLeft,
                countryToFindNow: countryToFindNow,
                currentUserSelection: {
                    countryName: '',
                    countryId: ''
                }
            }
        }
    }),
    on(findCountriesGameActions.gameFinished, (state) => ({
        ...state,
        // isGameOn: false,
        // gameOnState: gameOnInitialSate
        gameOnState: {
            ...state.gameOnState,
            isGameFinished: true
        }
    })),
    on(findCountriesGameActions.reStartGame, (state, action) => ({
        ...initialState,
        currentMap: action.payload,
        gameOnState: gameOnInitialSate
    }))
)

