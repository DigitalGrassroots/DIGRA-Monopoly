


const NUMBER_OF_DICE = 2;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
var dices = new Array();
dices[0] = 1;
dices[1] = 1;

function createDice(number) {
  const dotPositionMatrix = {
    1: [
      [50, 50]
    ],
    2: [
      [20, 20],
      [80, 80]
    ],
    3: [
      [20, 20],
      [50, 50],
      [80, 80]
    ],
    4: [
      [20, 20],
      [20, 80],
      [80, 20],
      [80, 80]
    ],
    5: [
      [20, 20],
      [20, 80],
      [50, 50],
      [80, 20],
      [80, 80]
    ],
    6: [
      [20, 20],
      [20, 80],
      [50, 20],
      [50, 80],
      [80, 20],
      [80, 80]
    ]
  };

  const dice = document.createElement("div");

  // dice.classList.add("dice");
  dice.classList.add("dice", "animate__animated", "animate__headShake", "animate__duration-1s");

  for (const dotPosition of dotPositionMatrix[number]) {
    const dot = document.createElement("div");

    dot.classList.add("dice-dot");
    dot.style.setProperty("--top", dotPosition[0] + "%");
    dot.style.setProperty("--left", dotPosition[1] + "%");
    dice.appendChild(dot);
  }

  return dice;
}

function randomizeDice(diceContainer, numberOfDice) {
  diceContainer.innerHTML = "";

  for (let i = 0; i < numberOfDice; i++) {
    // setTimeout(function(){
    var random = Math.floor((Math.random() * 6) + 1);
    
    if(typeof player !== 'undefined'){
      if(i==1 && player[turn].avatar==2 && studentFirstRow){
        random = dices[0];
      }
    }

    const dice = createDice(random);
    dices[i] = random;

    diceContainer.appendChild(dice);
      
    // }, 500);
  }
}

randomizeDice(diceContainer, NUMBER_OF_DICE);



function roller() {
  $('.dice-container').css("transform", "translate(-50%, 0)")
  $('.dice-container').css("opacity", 1)

  if (sfx) {  shakeDice.play(); }
  interval = setInterval(() => {
    randomizeDice(diceContainer, NUMBER_OF_DICE);
  }, 100);

  setTimeout(function() {
    clearInterval(interval);

    if (sfx) {  shakeDice.pause(); shakeDice.currentTime = 0; }

    // console.log('Rolling stopped');
    // console.log(dices);
    setTimeout(function() {
      $('.dice-container').css("transform", "translate(-50%, -10px)")
      $('.dice-container').css("opacity", 0)
      // $('.dice').remove("animate__animated", "animate__shakeX", "animate__slow");
    }, 1000);
  }, 3000);
}
