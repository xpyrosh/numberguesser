// GAME FUNCTION
/*
    - Player must guess a number between a certain range
    - Player gets limited tries
    - Notify of remaining guesses
    - Notify if correct/wrong
    - Ask to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

 // UI Variables
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI Min Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener, event delegation
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Guess BTN Even Listener
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    // NaN = Not a Number
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please Enter a Number Between ${min} and ${max}.`, 'red');
    }
    else {
        // Check if target number
        if(guess === winningNum){
            // Won game
            gameOver(true, `${winningNum} is correct! YOU WIN!`);
        } else {
            // Wrong number
            guessesLeft--;
    
            if(guessesLeft === 0){
    
                // Game Over
                gameOver(false, `${winningNum} Game Over! YOU LOSE! The winning number was ${winningNum}.`);
            }
            else {
                // Continuing Game
    
                // change border
                guessInput.style.borderColor = 'red';
    
                // clear input
                guessInput.value = '';
    
                // Tell user that number is wrong
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
            }
        }

    }

});

// Generate winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent=msg;
}

// Game over
function gameOver(won, msg){
    let color;
    // Defining color
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInput.disabled = true;
            
    // Change border
    guessInput.style.borderColor = color;

    // Set text color
    message.style.color = color;

    // Alert user they won
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}