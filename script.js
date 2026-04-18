const WINNING_SCORE = 5;
let humanScore = 0;
let computerScore = 0;

const initialState = document.body.innerHTML;

// Return a random integer value from 0 to upperBound-1
function getRandomInteger(upperBound)
{
    return Math.floor(Math.random() * upperBound);
}
// Return a string, containing a game choice,
// corresponding to a passed index
function getChoice(choiceIndex)
{
    switch(choiceIndex)
    {
    case 0:
        return "Rock";
    case 1:
        return "Paper";
    case 2:
        return "Scissors";
    default:
        return "ERROR::RANDOM NUMBER IS OUT OF BOUNDS [0,2]";
    }
}
// Return computer's choice
function getComputerChoice()
{
    let choiceIndex = getRandomInteger(3);
    return getChoice(choiceIndex);
}

// Return a word corresponding to round result(win, lose, tie)
function getRoundResult(humanChoice, computerChoice)
{
    if (humanChoice === "Rock")
    {
        return generalCase(computerChoice, "Scissors", "Paper");
    }
    else if (humanChoice === "Paper")
    {
        return generalCase(computerChoice, "Rock", "Scissors");
    }
    else
    {
        return generalCase(computerChoice, "Paper", "Rock");
    }
}
// Resolve round result, based on 3 parameters:
// 1) computerChoice - choice that was made by computer
// 2) winningCase - best choice that computer can take
// 3) losingCase - worst choice that computer can take
// winnignCase and losingCase are passed by the caller
// depending on the choice that player made
function generalCase(computerChoice, winningCase, losingCase)
{
    if (computerChoice === winningCase)
    {
        return "won";
    }
    else if (computerChoice === losingCase)
    {
        return "lost";
    }
    else
    {
        return "tied";
    }
}

// Return a round result message, based on the result string
function getRoundMessage(result, humanChoice, computerChoice)
{
    let message = `You ${result} this round!\n\n`;
    if (result === "won")
    {
        message = message.concat(`${humanChoice} beats ${computerChoice}.`);
    }
    else if (result === "lost")
    {
        message = message.concat(`${computerChoice} beats ${humanChoice}.`);
    }
    else
    {
        message = message.concat(`Both chose ${humanChoice}.\n`);
    }

    return message;
}

//Show final result message 
// based on the scores at the end of the game
function declareAWinner()
{
    let message = "";
    if (humanScore > computerScore)
    {
        message = "Congratulations!\nYou won!";
    }
    else
    {
        message = "You lost.\nBetter luck next time!";
    }

    return message;
}

// Increment score based on round result string
function updateScore(result)
{
    if (result === "won")
    {
        ++humanScore;
    }
    else if (result === "lost")
    {
        ++computerScore;
    }
}
// Set round message based on the round results
function setRoundMessage(result, humanChoice, computerChoice)
{
    const resultContainer = document.querySelector(".result");
    resultContainer.textContent = getRoundMessage(result, humanChoice, computerChoice);
}
// Set Post-game message, based on the score 
function setPostGameMessage()
{
    const resultContainer = document.querySelector(".result");
    resultContainer.textContent = declareAWinner();
}
// Return score container. If there isn't one yet - create one and return it
function getScoreContainer()
{
    let score = document.querySelector("#score")
    if (!score)
    {
        score = document.createElement("div");
        score.id = "score";
        score.classList.add("result");
        document.body.appendChild(score);
    }
    return score;
}
// Sets score message. Actually does several things:
// Creates score container if there isn't one yet
// Updates the current score
// Sets the score message based on the updated score
function setScoreMessage(result)
{
    const score = getScoreContainer();
    updateScore(result);
    score.textContent = `Your score: ${humanScore}\n\nOpponent score: ${computerScore}`
}
// Check if player or computer won the game yet
function isPlayable()
{
    return humanScore < WINNING_SCORE && computerScore < WINNING_SCORE;
}
// Remove game choice buttons from the DOM tree
function removeChoiceButtons(buttonContainer)
{
    const buttons = document.querySelectorAll(".choice");
    buttons.forEach((button) => buttonContainer.removeChild(button));
}
// Reset player and computer score back to 0
function resetScore()
{
    humanScore = 0;
    computerScore = 0;
}
// Revert game back to it's initial state
function resetGame()
{
    document.body.innerHTML = initialState;
    resetScore();
    setButtonEvents();
    setButtonContainerEvent();
}
// Add a button that resets the game
function addPlayAgainButton(buttonContainer)
{
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Try again?";
    playAgainButton.classList.add("again");
    playAgainButton.addEventListener("click", resetGame);

    buttonContainer.appendChild(playAgainButton);
}
// Set button container to the post-game state
// Which means all the game buttons are replaced with "Try again?" button 
// that resets the game
function setPostGameButtons()
{
    const buttonContainer = document.querySelector(".choices");
    removeChoiceButtons(buttonContainer);
    addPlayAgainButton(buttonContainer);
}
// Show post-game message and update button container to post-game state
function showPostGame()
{
    setPostGameMessage();
    setPostGameButtons();
}

// Play 1 round of game
function playRound(humanChoiceIndex)
{
    const humanChoice = getChoice(humanChoiceIndex);
    const computerChoice = getComputerChoice();

    let result = getRoundResult(humanChoice, computerChoice);
 
    setRoundMessage(result, humanChoice, computerChoice);
    setScoreMessage(result);
}
// Set game buttons events
function setButtonEvents()
{
    const choices = document.querySelectorAll(".choice");
    for(let i = 0; i < choices.length; ++i)
    {
        choices[i].addEventListener("click",() => playRound(i));
    }
}
// Set button container event
// This event is responsible for game transition
// into the post-game state when winning conditions are met
// It listens to the button clicks and checks them after the button event has fired
// during bubbling stage
function setButtonContainerEvent()
{
    const buttonContainer = document.querySelector(".choices");
    buttonContainer.addEventListener("click", 
    ()=>
    {
        if (isPlayable())
        {
            return;
        }

        showPostGame();
    })
}

setButtonEvents();
setButtonContainerEvent();
