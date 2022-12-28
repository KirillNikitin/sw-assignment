import { describe, expect, test, it, beforeAll, jest } from '@jest/globals';
import { SWCharacter, getSwCharacter } from './SWTrivia';

const swCharacterResponseMock = {
    name: "Luke Skywalker",
    height: "123",
    films: ["1"],
    homeworld: "https://swapi.dev/api/planets/1/",
    firstFilmTitle: "https://swapi.dev/api/films/1/"
}

describe("Test Starwars trivia", () => {
    it("Gets the character name", async () => {
        const swCharacterFetchMock = () => Promise.resolve({
            ok: true,
            status: 200,
            json: async () => swCharacterResponseMock
        } as Response);
        global.fetch = swCharacterFetchMock;
        const data: SWCharacter = await getSwCharacter();
        expect(data.name).toBe("Luke Skywalker")
    }),
        it("Calculates the films character appeared in", () => {
            const data: SWCharacter = swCharacterResponseMock;
            const luke = new SWCharacter(data);
            expect(luke.calculateFilms()).toBe(1)
        }),
        it("Gets the character home world", () => {
            const data: SWCharacter = swCharacterResponseMock;
            const luke = new SWCharacter(data);
            expect(luke.getHomeWorldName()).resolves.toBe("Tatooine")
        }),
        it("Gets the character First Film", () => {
            const data: SWCharacter = swCharacterResponseMock;
            const luke = new SWCharacter(data);
            expect(luke.getFirstFilmTitle()).resolves.toBe("A New Hope")
        })
})