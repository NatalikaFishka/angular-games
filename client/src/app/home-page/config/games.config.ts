import { Game } from './game.model'

const CardMemoryGame: Game = {
    name: "Match cards", 
    image: 'https://res.cloudinary.com/dkqohzqus/image/upload/v1633033464/AngularGames/find_cards_home_lalj8b.png',
    path: 'match-cards-game'
}

const CountriesGame: Game = {
    name: "Find countries", 
    image: 'https://res.cloudinary.com/dkqohzqus/image/upload/v1633033143/AngularGames/find_country_home_a5cnlj.png',
    path: 'find-countries-game'
}

const PuzzleGame: Game = {
    name: "Puzzles", 
    image: 'https://res.cloudinary.com/dkqohzqus/image/upload/v1653899111/AngularGames/puzzle-game-home_uichff.jpg',
    path: 'puzzle-game'
}

export const GamesConfig: Game[] = [
    CardMemoryGame,
    CountriesGame,
    PuzzleGame
]
