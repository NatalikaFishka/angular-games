import {Dino} from '../models/index';

export function sortConfig(dataConfig: Dino[]): Dino[] {
    return dataConfig.sort(() => 0.5 - Math.random());
}