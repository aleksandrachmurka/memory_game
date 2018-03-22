// variables
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const restart = document.querySelectorAll('.restart');
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const time = document.querySelector('.time');
let openCards = [];

// get new game deck with cards
function newGame() {
	minutes = 0;
	moves = 0;
	seconds = 0;
	starsCount = 3;
	deck.innerHTML = '';
	let cardsArray = Array.from(cards);
	shuffle(cardsArray);
	for (card of cardsArray) {
		card.classList.value = ('card');
		deck.appendChild(card);
	}
	timer();
}

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//timer function from https://jsfiddle.net/Daniel_Hug/pvk6p/
function addTime() {
	seconds++;
	if (seconds >= 60) {
	    seconds = 0;
	    minutes++;
    }

    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
}

function timer() {
	t = setInterval(addTime,1000);
}

// show clicked card
function showCard(element) {
	element.classList.add('open');
	openCards.push(element);
	moves++;
}

// hide card when cards do not match
function hideCard(element) {
	setTimeout(function(){
		element.classList.remove('open');
	}, 1000);
}

// function checks if cards match
function matchCards(array) {
	if (openCards.length == 2) {
		if (openCards[0].childNodes[1].className === openCards[1].childNodes[1].className) {
			for (card of openCards) {
				card.classList.add('match');
			}
		}
		else {
			for (card of openCards) {
				hideCard(card);
			}
		}
		openCards=[];
	}
}

// function sets move counter and stars
// if all cards are matched function opening modal in run
function checkScore(moves) {
	let moveCount = document.querySelector('.moves');
	let matched = document.querySelectorAll('.match');
	let stars = document.querySelector('.stars');
	let star = document.querySelector('li');

	moveCount.textContent = moves;

	switch (moves) {
	case 20:
		stars.removeChild(star);
		starsCount = 2;
		break;
	case 25:
		stars.removeChild(star);
		starsCount = 1;
		break;
	case 36:
		stars.removeChild(star);
		starsCount = 'zero';
		break;
	}

	if (matched.length == 16) {
		winModal();
	}
}

//shows modal with stats
function winModal() {
	const timeTaken = document.querySelector('.timeTaken');
	const movesDone = document.querySelector('.movesDone');
	const starsEarned = document.querySelector('.starsEarned');
	modal.style.display = 'block';
	timeTaken.textContent = time.textContent;
	movesDone.textContent = moves;
	starsEarned.textContent = '*' + starsCount + ' stars' + '*';
	clearInterval(t);
}

//hide modal with stats
function closeModal() {
	modal.style.display = 'none';
}


// event listeners
deck.addEventListener('click', function(event) {
	showCard(event.target);
	matchCards(openCards);
	checkScore(moves);
});

restart[0].addEventListener('click', function() {
	clearInterval(t);
	newGame();
});

restart[1].addEventListener('click', function() {
	closeModal();
	clearInterval(t);
	newGame();
});

close.addEventListener('click', closeModal);


// let's play!
newGame();


//TO DO
// deklarowanie zmiennych
// All application components are usable across modern desktop, tablet, and phone browsers.
// Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
// Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, etc.)
// Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).
// zbudować karty każdy src obrazka po 2 razy i rozmieścić randomowo - css grid
// do wyboru ilość kart 3x3, 5x5




