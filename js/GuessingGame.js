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
    this.hintCount = 0;


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
        $('#subtitle').text("Click the reset button to win again!");
        $('#hint, #submit').prop('disabled', true);
        return 'You Win!';
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+this.pastGuesses.length+')').text(this.playersGuess);
            if(this.pastGuesses.length===5){
                $('#subtitle').text("Click the reset button to try again.");
                $('#hint, #submit').prop('disabled', true);
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
    
    if(this.hintCount>0){
        return "Only one hint per round!";
    }
    else{
        this.hintCount++;
        return "Hint: " + shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
    }
}

var newGame = function() {
    return new Game;
}



var submitGuess = function(game){
    var submission = $('#player-input').val(); //grabs submission value
    $('#player-input').val(""); //sets entry field top blank
    var output = game.playersGuessSubmission(parseInt(submission,10)); //runs value through method
    $('#title').text(output);
    console.log(output);
}

$(document).ready(function() {

    var game = new Game();

    $('#submit').on('click', function(e){
        submitGuess(game);
    });
    $('#reset').on('click', function(e){
        game = new Game();
        $('#title').text("Guessing Game!");
        $('#subtitle').text("Guess a number between 1 and 100");
        $('#hint, #submit').prop('disabled', false);
        $('#guess-list').children().text("-");
    });
    $('#hint').on('click', function(e){
        $("#title").text(game.provideHint());
    });
    $('#player-input').keypress(function(e){
        if(e.keyCode == 13){
            submitGuess(game);
        }
    });
});