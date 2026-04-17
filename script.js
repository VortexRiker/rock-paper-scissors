const NUMBER_OF_ROUNDS = 5;
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
let resultMessage = "";

const humanAnswers = [ "Rock", "Paper", "Scissors"];

const resultContainer = document.querySelector(".result");
const choices = document.querySelectorAll(".choice");


// Return a random integer value from 1 to upperBound
function getRandomInteger(upperBound)
{
    return Math.floor(Math.random() * upperBound + 1);
}
// Return a string, containing a game choice,
// corresponding to a passed integer
function getChoice(choiceIndex)
{
    switch(choiceIndex)
    {
    case 1:
        return "Rock";
    case 2:
        return "Paper";
    case 3:
        return "Scissors";
    default:
        return "ERROR::RANDOM NUMBER IS OUT OF BOUNDS [1,3]";
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
        return "lose";
    }
    else
    {
        return "tied";
    }
}

// Return a round result message, based on the result string
function getRoundMessage(result, humanChoice, computerChoice)
{
    let message = `You ${result}! `;
    if (result === "won")
    {
        message = message.concat(`${humanChoice} beats ${computerChoice}.`);
    }
    else if (result === "lose")
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
        message = "Congratulations! You won!";
    }
    else
    {
        message = "You lost. Better luck next time!";
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
    else if (result === "lose")
    {
        ++computerScore;
    }
}

function setResultMessage(message)
{
    if (humanScore > 5 || computerScore > 5)
    {
        message = declareAWinner();
    }

    resultContainer.textContent = message;
}
function setScoreMessage()
{
    let score = document.querySelector("#score")
    if (!score)
    {
        score = document.createElement("div");
        score.id = "score";
        score.className = "result";
        document.body.appendChild(score);
    }
    
    score.textContent = `Your score: ${humanScore} \n Opponent score: ${computerScore}`
}

function isPlayable()
{
    return humanScore < 5 && computerScore < 5;
}

function playGame(humanChoice)
{
    if (isPlayable())
    {
        playRound(humanChoice);
    }

}

// Play 1 round of game
function playRound(humanChoice)
{
    const computerChoice = getComputerChoice();
    let result = getRoundResult(humanChoice, computerChoice);
    let roundMessage = getRoundMessage(result, humanChoice, computerChoice);
    updateScore(result);
    setResultMessage(roundMessage);
    setScoreMessage();
}

for(let i = 0; i < choices.length; ++i)
{
    choices[i].addEventListener("click",() => playGame(humanAnswers[i]));
}





// // Play game of "Rock Paper Scissors" against computer
// // Consisting of numberOfRounds rounds specified by the caller
// function playGame(numberOfRounds)
// {
//     // Play numberOfRounds rounds of game
//     // Just a wrapper around the loop
//     function playNumberOfRounds(numbeOfRounds)
//     {
//         for (let i = 0; i < numberOfRounds; ++i)
//         {
//             const humanSelection = getHumanChoice();
//             const computerSelection = getComputerChoice();

//             playRound(humanSelection, computerSelection);
//         }
//     }
//     

//     playNumberOfRounds(numberOfRounds);
//     declareAWinner();
// }

// playGame(NUMBER_OF_ROUNDS);