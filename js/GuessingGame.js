var generateWinningNumber = function () {
    return Math.floor(Math.random()*100)+1;
}

var shuffle = function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var Game = function (){

    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();


}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}
//-----------
Game.prototype.playersGuessSubmission = function(guess){
  
    if(guess>100||guess<1||typeof guess !== 'number'){
        throw 'That is an invalid guess.';
    }

    this.playersGuess = guess;

    return this.checkGuess();
}
//-----------
Game.prototype.checkGuess = function(){
    if(this.playersGuess===this.winningNumber){
        return 'You Win!';
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length===5){
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(diff<10){
                    return 'You\'re burning up!';
                }
                if(diff<25){
                    return 'You\'re lukewarm.';
                }
                if(diff<50){
                    return 'You\'re a bit chilly.';
                }
                if(diff<100){
                    return 'You\'re ice cold!';
                }
            }
        }
    }
}

Game.prototype.provideHint = function(){

    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}

var newGame = function() {
    return new Game;
}