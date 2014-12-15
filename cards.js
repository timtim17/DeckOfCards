var buttonShuffle = document.getElementById('shuffle'),
    buttonDraw = document.getElementById('draw'),
    successes,
    total,
    cards = []; // get handles on the buttons and create a new array, as well as values for success and fail
try{
successes = localStorage.getItem('successes');
total = localStorage.getItem('total');
if(!(successes && total)){
localStorage.setItem('successes', 0);
localStorage.setItem('total', 0);
successes = localStorage.getItem(0);
total = localStorage.getItem(0);
}
}catch(e){
successes = localStorage.getItem(0);
total = localStorage.getItem(0);
}

// handle the click events
buttonShuffle.addEventListener('click', shuffle);
buttonDraw.addEventListener('click', draw);

shuffle();

function shuffle(){
    cards = []; // clear out the array

    for(var i = 0; i < 4; i++){ // do this four times
        var suite; // create a temp var
        switch(i){ // depending on the itterator, choose the suite
            case 0:
                suite = "Hearts";
                break;
            case 1:
                suite = "Diamonds";
                break;
            case 2:
                suite = "Clubs";
                break;
            case 3:
                suite = "Spades";
                break;
        }
        for(var c = 1; c < 13; c++){ // create the cards, with the various special cases
            var value;
            switch(c){
                case 1:
                    value = "Ace";
                    break;
                case 11:
                    value = "Jack";
                    break;
                case 12:
                    value = "Queen";
                    break;
                case 13:
                    value = "King";
                    break;
                default:
                    value = c;
                    break;
            }
            cards[cards.length] = { // add the card object to the array
                suite: suite,
                value: value
            };
        }
    }
    
    
    for(var a = 0; a < 500; a++){ // shuffle the cards
        var k = Math.floor(Math.random()*cards.length);
        cards[cards.length] = cards[k];
        cards.splice(k, 1);
    }
    
    console.log(cards); // log the array to the console to debug
}
function draw(){
    var chosenCard = cards[Math.floor(Math.random() * cards.length)], suite, value; // choose a random card
    console.log(chosenCard); // log it for debugging

    suite = prompt("Pick a Pick a suite, any suite!").toLowerCase(); // ask for a suite
    while(true){
        if(suite == "diamonds" || suite == "hearts" || suite == "clubs" || suite == "spades") break; // if the input is valid, break out of loop
        suite = prompt('"Hearts", "Clubs", "Spades", or "Diamonds"').toLowerCase(); // ask again if the input is invalid
    }

    value = prompt("Pick a Pick a value, any value!").toLowerCase(); // ask for a value
    while(true){
        if((value < 11 && value > 1) || value == "ace" || value == "jack" || value == "queen" || value == "king") break; // if the input is valid, break out of loop
        value = prompt('"Ace", "Jack", "Queen", "King", or a number 2 - 10').toLowerCase(); // ask again if the input is invalid
    }

    total++;

    if(chosenCard.suite.toLowerCase() == suite && chosenCard.value.toString().toLowerCase() == value){ // if the suite and value match, log it as a success
        successes++;
        alert("Yes! It was the " + chosenCard.value + " of " + chosenCard.suite + "!");
    }else{ // otherwise, log it as a failure
        alert("Sorry, it was the " + chosenCard.value + " of " + chosenCard.suite + ".");
    }

try{
localStorage.setItem('successes', successes);
localStorage.setItem('total', total);
}catch(e){}

    alert("You are curently " + successes + " for " + total);
}
