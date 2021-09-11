import {CardImageData} from '../models/index';

export function sortConfig(dataConfig: CardImageData[]): CardImageData[] {
    return dataConfig.sort(() => 0.5 - Math.random());
}