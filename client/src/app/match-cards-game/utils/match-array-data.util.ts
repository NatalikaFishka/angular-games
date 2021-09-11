export function allMatch(arr: string[]): boolean {

    const refValue = arr[0];

    return arr.every( value => value === refValue );
}