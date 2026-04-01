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
    return getChoice(choiceIndex);
}

function getHumanChoice()
{
    let choiceIndex = Number(prompt("Please enter your choice:\n1 - Rock\n2 - Paper\n3-Scissors", 1));
    return getChoice(choiceIndex);
}

console.log(getHumanChoice());

