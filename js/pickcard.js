


var cards = [];
var xOffset = 0;
var yOffset = -800;
var card_type = "";

var chanceIndex;
var communityChestIndex;

const cardanimationDuration = 200; // in milliseconds
const cardGap = 400;

var deckDiv = document.getElementById('deck');

// Function to create a single card element
const createCard = (card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('an-card');
    
    const cardText = document.createElement('div');
    cardText.classList.add('an-card-text');
    cardText.textContent = card.text;
    
    
    cardElement.appendChild(cardText);
    return cardElement;
};


function animate(element, targetX, targetY, duration) {
    const startX = element.offsetLeft;
    const startTime = performance.now();
    duration = duration + Math.random() * 300;

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
            element.style.transform = `translate(${targetX}px, ${targetY}px)`;
            return;
        }
        const ease = easeOutQuart(elapsedTime, 0, 1, duration);
        const newX = startX + (targetX - startX) * ease;
        const newY = targetY;
        element.style.transform = `translate(${newX}px, ${newY}px)`;
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function spreadApart() {
    for (let i = 0; i < cards.length; i++) {
        yOffset = cards[i].y;
        if (Math.random() < 0.5) {
            xOffset = cards[i].x - cardGap;
            animate(cards[i].element, xOffset, yOffset, cardanimationDuration);
        } else {
            xOffset = cards[i].x + cardGap;
            animate(cards[i].element, xOffset, yOffset, cardanimationDuration);
        }
    }
}

function returnCards() {
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        animate(cards[i].element, cards[i].x, cards[i].y, cardanimationDuration);
    }
}

shuffleAnimation = async () => {
    for (let i = 0; i < 4; i++) {
        spreadApart();
        await new Promise(resolve => setTimeout(resolve, cardanimationDuration));
    }
    returnCards();
    await new Promise(resolve => setTimeout(resolve, cardanimationDuration));
    returnCards();
}

function pickCard() {
    for (let i = 0; i < cards.length-1; i++) {
        animate(cards[i].element, cards[i].x, cards[i].y+800, cardanimationDuration);
    }

    cards[cards.length-1].element.classList.add('animate__animated', 'animate__flip'); // flip the card
    $('.shuffle-icon').hide();
    
    // Delay between flips
    const flipDelay = 500; // in milliseconds
    
    setTimeout(() => {
        cards[cards.length-1].element.querySelector('.an-card-text').style.display = 'block';
        $('.card-close').fadeIn();
        
    }, flipDelay);
    
    
    
}

function closeCards(){
    
    $("#anChanceCards").removeClass('animate__zoomInDown');
    $("#anChanceCards").addClass('animate__bounceOut');
    setTimeout(function(){
        $(".animation-layer").hide();
        cards = [];
        deckDiv.innerHTML = '';
        $('.card-close').hide();
        $('.shuffle-icon').show();
        
        if(card_type == "chance"){
            chanceAction(chanceIndex);
        }
        if(card_type == "communityChest"){
            communityChestAction(communityChestIndex);
        }
        card_type = "";
    }, 500);
}

function openCards(){
    if(card_type != ""){
        $(".animation-layer").show();
        $("#anChanceCards").removeClass('animate__bounceOut');
        $("#anChanceCards").addClass('animate__zoomInDown');
        $("#pickCardBtn").hide();
        setTimeout(() => {
            cardsAnimation();
        }, 700);
    }
}



function cardsAnimation(){
    // Array to hold the cards
    cards = [];

    // Offset variables for positioning
    xOffset = 0;
    yOffset = -800;

    
    if(card_type == "chance"){
        
        chanceCards.forEach((card, index) => {
            const cardElement = createCard(card);
            
            // Apply offset to each card
            cardElement.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            cardElement.style.backgroundColor = '#fff';
            cardElement.style.backgroundImage = 'url("images/card-back.png")';
            cardElement.style.backgroundSize = `cover`;
            
            // Increase offset for the next card
            xOffset -= 2;
            yOffset -= 2;
            
            deckDiv.appendChild(cardElement);
            
            // Store the created card for later animations
            cards.push({
                element: cardElement,
                x: xOffset,
                y: yOffset+800
            });
        });

        // chanceIndex = chanceCards[chanceCards.index];
        cards[cards.length-1].element.querySelector('.an-card-text').innerHTML =  chanceCards[chanceIndex].text;
    }
    
    if(card_type == "communityChest"){

        communityChestCards.forEach((card, index) => {
            const cardElement = createCard(card);
            
            // Apply offset to each card
            cardElement.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            cardElement.style.backgroundColor = '#F4BC51';
            cardElement.style.backgroundImage = 'url("images/card-back-community.png")';
            cardElement.style.backgroundSize = `cover`;
            
            // Increase offset for the next card
            xOffset -= 2;
            yOffset -= 2;
            
            deckDiv.appendChild(cardElement);
            
            // Store the created card for later animations
            cards.push({
                element: cardElement,
                x: xOffset,
                y: yOffset+800
            });
        });
        
        // communityChestIndex = communityChestCards.deck[communityChestCards.index];
        cards[cards.length-1].element.querySelector('.an-card-text').innerHTML =  communityChestCards[communityChestIndex].text;
    }

    // Add onclick to last cards element
    cards[cards.length - 1].element.addEventListener('click', function() {
        pickCard();
    });


    returnCards();

}


// card_type = 'communityChest';
		
// openCards();