import { AuthUserState } from "./app-shell/store/reducer/auth.reducer";
import { GameResultState } from "./game-page/store/reducers/game-result.reducer";

export interface AppStore {
    authUser: AuthUserState;
    memoryGameResults: GameResultState;
}