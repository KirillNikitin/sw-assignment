const API_URL = "https://swapi.dev/api/"

/*export interface SWPeople {
    number: Number
}*/

export class SWPeople {
    count: number

    constructor(data: SWPeople) {
        this.count = data.count
    }

    public getNumberOfCharacters() {
        return this._getNumberOfCharacters()
    }
    private async _getNumberOfCharacters() {
        return this.count
    }
}

/*export interface SWCharacter {
    name: string
    films: string[]
    homeworld: string
    firstFilmTitle: string
}*/

export class SWCharacter {
    name: string
    films: string[]
    homeworld: string
    firstFilmTitle: string

    constructor(data: SWCharacter) {
        this.name = data.name
        this.films = data.films
        this.homeworld = data.homeworld
        this.firstFilmTitle = data.firstFilmTitle
    }
    public calculateFilms() {
        return this.films.length
    }
    public getHomeWorldName() {
        return this.getHomeWorldData()
    }
    private async getHomeWorldData() {
        return await fetch(this.homeworld).then((response) => response.json()).then((data) => data.name)
    }
    // Get data about the first film where the character appeared in
    public getFirstFilmTitle() {
        return this.getFirstFilmData()
    }
    private async getFirstFilmData() {
        return await fetch(this.films[0]).then((response) => response.json()).then((data) => data.title)
    }
}

export const getSwPeople = async () => {
    const url = `${API_URL}/people`
    const people = fetch(url).then((response) => response.json()).then((data) => {
        console.log('Characters: ');
        console.log(data);
        return data
    });

    return people
}

export const getSwCharacter = async (id: number) => {
    const url = `${API_URL}/people/${id}`
    const character = fetch(url).then((response) => response.json()).then((data) => {
        // console.log(data.films[0]); // 1st film
        const firstFilmData = fetch(data.films[0]).then((response) => response.json()).then((data) => console.log(data))
        console.log('First Film data: ' + firstFilmData);
        return data
    });

    return character
}
