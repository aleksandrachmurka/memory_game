// variables
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const restart = document.querySelectorAll('.restart');
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const stars = document.querySelectorAll('.fa-star');
const time = document.querySelector('.time');
const table = document.querySelector('table');
const moveCount = document.querySelector('.moves');

let results = JSON.parse(localStorage.getItem('results'));

let player;
let minutes;
let seconds;
let moves;
let starsCount;
let openCards = [];

// get new game deck with shuffled cards, reset stats and results table
function newGame() {
	player = null;
	minutes = 0;
	seconds = 0;
	moves = 0;
	starsCount = "three stars"

	deck.innerHTML = '';
	time.textContent ='00:00';
	moveCount.textContent = '0';
	player = prompt('Please enter your name');

	let addedResults = table.querySelectorAll('.result');
	addedResults.forEach(result=> result.remove());

	let starsArray = Array.from(stars);
	for (star of starsArray){
		star.style.display = "inline-block";
	}

	let cardsArray = Array.from(cards);
	shuffle(cardsArray);
	for (card of cardsArray) {
		card.classList.value = ('card');
		deck.appendChild(card);
	}

	deck.addEventListener('click', timer);
}

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
	deck.removeEventListener('click', timer);
}

// show clicked card
function showCard(element) {
	if (!(openCards.includes(element))) {
		element.classList.add('open');
		openCards.push(element);
	}
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
		moves++;
		openCards=[];
	}
}

// function sets move counter and stars
// if all cards are matched function winners modal is run
function checkScore(moves) {
	moveCount.textContent = moves;

	switch (moves) {
	case 12:
		stars[0].style.display = "none"
		starsCount = "2 stars";
		break;
	case 20:
		stars[1].style.display = "none"
		starsCount = "1 star";
		break;
	}

	const matched = document.querySelectorAll('.match');

	if (matched.length == 16) {
		if (!results || results === null) {
			results = [];
		}

		let date = new Date;
		let result = [player, date.toLocaleDateString(), moves, time.textContent];
		results.push(result);
		localStorage.setItem('results', JSON.stringify(results));
		scoresTable();
		winModal();
	}
}

// create table with tops scores
function scoresTable() {
	let row;
	let data;

	let topFive = results.sort(function(x,y){
		return x[2] < y [2] ? -1 : 1;
	}).slice(0, 5);

	topFive.forEach(function(result){
		row = document.createElement('tr');
		row.classList.add('result');
		result.forEach(function (element){
			data = document.createElement('td');
			data.textContent = element;
			row.appendChild(data)
		});
		table.appendChild(row);
	});
}

//shows modal with stats
function winModal() {
	const timeTaken = document.querySelector('.timeTaken');
	const movesDone = document.querySelector('.movesDone');
	const starsEarned = document.querySelector('.starsEarned');
	modal.style.display = 'block';
	timeTaken.textContent = time.textContent;
	movesDone.textContent = moves;
	starsEarned.textContent = '* ' + starsCount + ' *';
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

// start
newGame();