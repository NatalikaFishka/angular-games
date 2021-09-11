import { Game } from './game.model'

const CardMemoryGame: Game = {
    name: "Match cards", 
    image: 'https://res.cloudinary.com/dkqohzqus/image/upload/v1610100714/AngularGames/CardMemoryGame/dino_home_d5ray7.jpg',
    path: 'match-cards-game'
}

const CountriesGame: Game = {
    name: "Find countries on map", 
    image: 'https://res.cloudinary.com/dkqohzqus/image/upload/v1610100714/AngularGames/CardMemoryGame/dino_home_d5ray7.jpg',
    path: 'find-countries-on-map-game'
}

export const GamesConfig: Game[] = [
    CardMemoryGame,
    CountriesGame
]
