export interface Dictionary<T> {
    [key: string]: T;
}

export enum COMPLEXITY {
    HARD = 0.5,
    MEDIUM = 1,
    EASY = 2
}

export const ComplexityReadable: Dictionary<string> = {
    [COMPLEXITY.HARD]: "Hard",
    [COMPLEXITY.MEDIUM]: "Medium",
    [COMPLEXITY.EASY]: "Easy",
}