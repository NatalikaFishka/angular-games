import {Dino} from '../models/index';

/**
 * Multyplies passed configuration (of Dinosoures) and returns new array
 * @param dinoConfig 
 * @param times 
 */

export function multiply(dinoConfig: Array<Dino>, times: number = 2): Array<Dino> {
    const result: Array<Dino> = [];
    
    dinoConfig.forEach((dino: Dino) => {
        
        for(let i = 0; i < times; i++) {
            result.push(dino)
        }
    })
   
    return result;
  }