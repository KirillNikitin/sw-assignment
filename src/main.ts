import { SWCharacter, getSwCharacter, getSwPeople, SWPeople } from "./SWTrivia"
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3100;

app.get('/', async (request: Request, response: Response) => {
    const peopleData = await getSwPeople();
    const swPeople = new SWPeople(peopleData);
    const numberOfCharacters = swPeople.count;
    const characterData = await getSwCharacter(getRandomInt(1, numberOfCharacters));
    const swCharacter = new SWCharacter(characterData);
    const homeWorld = await swCharacter.getHomeWorldName();
    const firstFilmTitle = await swCharacter.getFirstFilmTitle();

    response.send(`
        Total number of characters: ${numberOfCharacters} <br/><br/>
        The character named ${swCharacter.name} 
        appeared in ${swCharacter.calculateFilms()} films. <br/>
        Characters home world in the movies is ${homeWorld}. <br/>
        
        1st film the character appeared in is: "${firstFilmTitle}"`)
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}