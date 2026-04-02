let humanScore = 0;
let computerScore = 0;

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
// Return user's choice based on provided input
function getHumanChoice()
{
    let choiceIndex = Number(prompt("Please enter your choice:\n1) Rock\n2) Paper\n3) Scissors", 1));
    return getChoice(choiceIndex);
}

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
        return "tie";
    }
}


function playRound(humanChoice, computerChoice)
{
    let result = getRoundResult(humanChoice, computerChoice);
    let roundMessage = getRoundMessage(result);
}



