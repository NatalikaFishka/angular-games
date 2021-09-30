import {CardImageData} from '../models/index';

/**
 * Multyplies passed configuration (of Dinosoures) and returns new array
 * @param dinoConfig 
 * @param times 
 */

export function multiply(dinoConfig: Array<CardImageData>, times: number = 2): Array<CardImageData> {
    const result: Array<CardImageData> = [];
    
    dinoConfig.forEach((dino: CardImageData) => {
        
        for(let i = 0; i < times; i++) {
            result.push(dino)
        }
    })
   
    return result;
  }