import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import {CardState} from "../../models";

export const CardFlipAnimation = [
    trigger('animateCardFlip', [
        state(CardState.default, style({
          transform: 'rotateY(180deg)'
        })),
        state(CardState.matched, style({
           borderColor: 'green' 
        })),
        transition((`${CardState.default} <=> ${CardState.flipped}`), [
          animate('400ms')
        ]),
        transition((`${CardState.flipped} => ${CardState.matched}`), [
            animate('500ms', keyframes([ 
                style({ borderColor: 'green' }),
                style({ transform: "scale(1)" }),
                style({ transform: "scale(1.15)" }),
                style({ transform: "scale(0.9)" }),
                style({ transform: "scale(1)" })
            ])),
        ])
    ]),
    trigger('cardFlyInOut', [
      transition(':enter', [
        animate('500ms', keyframes([
          style({backgroundColor: 'white', transform: 'translate({{offsetLeft}}px, {{offsetTop}}px)' }),
          style({transform: 'rotateY(180deg)'})
        ]))
      ], {params: {offsetLeft: 0, offsetTop: 0}}
      ),      
      transition(':leave', group([
        animate('700ms 300ms', style({opacity: 0})),
        animate('1000ms', keyframes([               
          style({ transform: "rotate({{angleRight}}deg)", offset: 0 }),
          style({ transform: "rotate(-{{angleLeft}}deg)", offset: 0.15 }),
          style({ transform: "rotate({{angleRight}}deg)", offset: 0.3 }),
          style({ transform: "rotate(-{{angleLeft}}deg)", offset: 0.45 }),
          style({ transform: 'translate({{offsetLeft}}px, {{offsetTop}}px)', offset: 1 })
        ]))
      ]), {params: {offsetLeft: 0, offsetTop: 0, angleRight: 0, angleLeft: 0}}
      ),
    ])
  ]