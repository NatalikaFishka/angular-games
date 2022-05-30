import { COMPLEXITY } from "./game-complexity.enum";

export interface PuzzleGameSettings {
    isGameStarted: boolean
    puzzleImage: string;
    puzzleComplexity: number;
}