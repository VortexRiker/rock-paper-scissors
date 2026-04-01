// Return a random integer value from 0 to upperBound - 1
function getRandomInteger(upperBound)
{
    return Math.floor(Math.random() * upperBound);
}

function getComputerChoice()
{
    switch(getRandomInteger(3))
    {
    case 0:
        return "Rock";
    case 1:
        return "Paper";
    case 2:
        return "Scissors";
    }
}
console.log(getComputerChoice());