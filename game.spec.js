require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

// Verifier que howManyPlayers retourne le bon nombre de joueurs

describe ("When there is 1 player", function() {
   let players = ["Aryana"]

    it ("returns 1", function() {
        let onePlayerGame = new Game()
        onePlayerGame.players = players
        expect(onePlayerGame.howManyPlayers()).toEqual(1)
    });
});
describe ("When there are 2 players", function() {
   let players = ["Aryana", "Megane"]

    it ("returns 2", function() {
        let onePlayerGame = new Game()
        onePlayerGame.players = players
        expect(onePlayerGame.howManyPlayers()).toEqual(2)
    });
});

// Verifier que le jeu se lance entre 2 et 6 joueurs
    // ne se lance pas pour 0 ou 1 joueur
    // ne se lance pas pour plus de 6 joueurs
    // sinon, se lance

// Dans quel cas gagne-t-on ? Tester didPlayerWin

// ? tester les cases et catégories --> en initialisant

// tester que toutes les categories ont bien 50 questions

// Verifier que toutes les valeurs sont bien initialisees quand on ajoute un joueur

// Verifier que le tableau de questions est bien vide pour chaque categorie
    // Que se passe-t-il si le tableau est vide ?

// roll
    // Quand le joueur est dans la penalty box
        // le joueur en sort s'il fait un nombre impair (sinon non)
        // il avance du nombre donne s'il a fait un nombre pair
        // on lui pose une question s'il a fait un nombre pair

    // Quand le nombre est superieur a 11
        // le joueur recule de 12 cases

    // Quand le joueur n'est pas dans la penalty box
        // il avance du nombre donne
        // on lui pose une question


describe ("roll", function() {
    describe ("When the roll is greater than 11", function() {
        let roll = 12

        it ("the player recule de 12 cases", function() {
            let onePlayerGame = new Game()
            onePlayerGame.players = ["toto"]
            onePlayerGame.places[0] = 1
            onePlayerGame.roll(roll)
            expect(onePlayerGame.places[0]).toEqual(1)
        });
    });
});

describe("Add function should add players", function() {
    let one_player_game = new Game()
    expect(one_player_game.howManyPlayers()).toBe(0)

    one_player_game.add("Max")
    expect(one_player_game.howManyPlayers()).toBe(1)
});

/*
describe("Should create rock question", function() {
    let rock_game = new Game()
    rock_game.add('Chet');
    rock_game.add('Pat');
//    rock_game.play()
    //rockQuestions = []

    //rock_question = rock_game.createRockQuestion(0)
    //rockQuestions.push(rock_question)
    //expect(rockQuestions[0]).toBe("Rock Question 0")
    expect(rock_game.rockQuestions[0]).toBe(1)
});
*/
describe("Game is not playable when less than 2 players", function() {
    let one_player_game = new Game()
    one_player_game.add("Max")
    expect(one_player_game.howManyPlayers()).toBe(1)
    expect(one_player_game.isPlayable()).toBe(false)
});
