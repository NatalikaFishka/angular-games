import { AuthUserState } from "./app-shell/store/reducer/auth.reducer";
import { GameResultState } from "./match-cards-game/store/reducers/game-result.reducer";

export interface AppStore {
    authUser: AuthUserState;
    memoryGameResults: GameResultState;
}