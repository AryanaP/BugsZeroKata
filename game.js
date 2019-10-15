exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  this.players = new Array();

  this.places           = new Array(6);

  this.purses           = new Array(6);

  this.inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  this.currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  this.didPlayerWin = function(){
    return !(this.purses[this.currentPlayer] == 6)
  };
  // rename this.purses
  // bug ?
  // refacto this.didPlayerWin

   this.currentCategory = function(){
  // pour les cases mais pas précisé ? Beaucoup de if
  // magic number
  // rename this.places
  // enum ?
    if(this.places[this.currentPlayer] == 0)
      return 'Pop';
    if(this.places[this.currentPlayer] == 4)
      return 'Pop';
    if(this.places[this.currentPlayer] == 8)
      return 'Pop';
    if(this.places[this.currentPlayer] == 1)
      return 'Science';
    if(this.places[this.currentPlayer] == 5)
      return 'Science';
    if(this.places[this.currentPlayer] == 9)
      return 'Science';
    if(this.places[this.currentPlayer] == 2)
      return 'Sports';
    if(this.places[this.currentPlayer] == 6)
      return 'Sports';
    if(this.places[this.currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };
  // que pour le rock ?

  for(var i = 0; i < 50; i++){
  // magic numbers
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };
  // pas clair, mais je suppose remplissage de base de questions

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

// renommer la fonction
  this.add = function(playerName){
    this.players.push(playerName);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;
    // je ne sais pas ce que ça fait

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  };
  // always returns true

  this.howManyPlayers = function(){
    return this.players.length;
  };


   this.askQuestion = function(){
    if(this.currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(this.currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(this.currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(this.currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };
  // vide le tableau --> si vide ?

  this.roll = function(roll){
  // découper
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(this.inPenaltyBox[this.currentPlayer]){
    // tout en negation
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;
        // magic number

        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if(this.places[this.currentPlayer] > 11){
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }
        // calcul pour recommencer je suppose

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      }else{
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if(this.places[this.currentPlayer] > 11){
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }
        // extraire deplacement
      console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  };
  // complexité cyclomatique

  this.wasCorrectlyAnswered = function(){
    if(this.inPenaltyBox[this.currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer] + " now has " +
                    this.purses[this.currentPlayer]  + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if(this.currentPlayer == this.players.length)
          this.currentPlayer = 0;
          // extraire

        return winner;
      }else{
        this.currentPlayer += 1;
        if(this.currentPlayer == this.players.length)
          this.currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " +
                  this.purses[this.currentPlayer]  + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if(this.currentPlayer == this.players.length)
        this.currentPlayer = 0;

      return winner;
    }
    // extraire
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
		this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if(this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
		return true;
  };

  this.play = function() {
   // if (this.isPlayable) {
        do{
          game.roll(Math.floor(Math.random()*6) + 1);
          if(Math.floor(Math.random()*10) == 7){
            notAWinner = game.wrongAnswer();
          }else{
            notAWinner = game.wasCorrectlyAnswered();
          }
        }while(notAWinner);
  //  }else{
    //    return "Not enough players!"
   // }
  };

};

var notAWinner = false;
// j'aurais inversé --> parle de l'ensemble du jeu, pas d'un perso XD


var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');
console.log("ROCK QUESTIONS = " + game.rockQuestions);
game.play();

