import { AuthUserState } from "./app-shell/store/reducer/auth.reducer";
import { FindCountriesGameState } from "./find-countries-game/store/reducer/find-countries-game.reducer";
import { GameResultState } from "./match-cards-game/store/reducers/game-result.reducer";

export interface AppStore {
    authUser: AuthUserState;
    memoryGameResults: GameResultState;
    findCountriesGame: FindCountriesGameState
}