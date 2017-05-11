// 2. When user clicks on a box, the click will mark the square.
// 	- Need to create a marksquare function
//	 - Two ways to do it:
// 		1. Put an onclick directly on the square
// 		2. Add event listener

// 	Return an array of the square button HTML tags.
var numberOfPlayers = prompt("How many players?")
var onePlayerGame = true;
var squares = document.getElementsByClassName('square');
var whoseTurn = 1;
var player1Squares = [];
var player2Squares = [];
var endOfGame = false;
// var winningSquareColor
// var xSquare
//
// var defaultSquareColor = squares.style.color;
var squareArray = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
var winningCombos = [
	['A1', 'B1', 'C1'],
	['A2', 'B2', 'C2'],
	['A3', 'B3', 'C3'],
	['A1', 'A2', 'A3'],
	['B1', 'B2', 'B3'],
	['C1', 'C2', 'C3'],
	['A1', 'B2', 'C3'],
	['A3', 'B2', 'C1']
]



// MAIN LOOP//


if (numberOfPlayers == 2) {
	onePlayerGame = false;
}

console.log(squares)

for(i=0; i < squares.length; i++) {
	squares[i].addEventListener('click', function(event) {
		if(!endOfGame) {
			markSquare(this)
		}
	});
}


function markSquare(currentSquare) {
	var squareResult ="";
	if((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")) {
		squareResult = "This square is already taken!"
	} else if(whoseTurn == 1) {
		currentSquare.innerHTML = "X";
		currentSquare.className += ' selectedX'
		whoseTurn = 2;
		player1Squares.push(currentSquare.id);
		checkWin(player1Squares, 1);
		if((onePlayerGame) && (!endOfGame)) {
			computerMove();
		}
	} else if (whoseTurn == 2) {
		currentSquare.innerHTML = "O";
		currentSquare.className += ' selectedO'
		whoseTurn = 1;
		player2Squares.push(currentSquare.id);
		checkWin(player2Squares, 2);
	}

	var messageElement = document.getElementById('message');
	messageElement.innerHTML = squareResult;
}

function computerMove() {
	var randomSquareId = squareArray[Math.floor(Math.random()*8)];
	var randomSquare = document.getElementById(randomSquareId)
	if((randomSquare.innerHTML != "X") && (randomSquare.innerHTML != "O")) {
		randomSquare.innerHTML = "O";
		randomSquare.className += ' selectedO'
		whoseTurn = 1;
		player2Squares.push(randomSquare.id);
		checkWin(player2Squares, 2);
	} else {
		computerMove();
	}

	// Find a random square.
	// Check if square is empty.
	// 	If square is empty, mark the square.
	// 	If not, keep looking.
}


function checkWin(currentPlayerSquares, whoJustWent) {
	// Outer loop (winning combos)
	for(i = 0; i < winningCombos.length; i++) {
		// Inner loop (square inside a winning combo)
		var squareCount = 0;
		for(j = 0; j < winningCombos[i].length; j++) {
			var winningSquare = winningCombos[i][j];
			if (currentPlayerSquares.indexOf(winningSquare) > -1) {
				// The index is > -1, which means the player has this square at some index in the array.
				squareCount++;
			}
		}
		// if squareCount = 3, the user had all 3 [j]'s for this [i]. Win!
		if(squareCount == 3) {
			console.log("Player " + whoJustWent + " won the game!");
			var message = ("Player " + whoJustWent + " won the game!");
			document.getElementById('message').innerHTML = message;
			gameOver(whoJustWent, winningCombos[i])
			break;
		}
	}
}


function gameOver(whoJustWon, winningCombo) {
	// var message = "Congratulations to player" + whoJustWon + ". You won with";
	// messageElement.innerHTML = message;
	// document.getElementById('message').innerHTML = message;
	console.log(winningCombo);
	for (i = 0; i < winningCombo.length; i++) {
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	endOfGame = true;
	// reset()
}


// function reset() {
// 	whoseTurn = 1;
// 	player1Squares = [];
// 	player2Squares = [];
// 	document.getElementById('message').innerHTML = "";
// 	document.getElementsByClassName('square').innerHTML = document.getElementsByClassName('square').id;
// 	document.getElementsByClassName('square').className = "square";
// 	endOfGame = false;
// } 
// 3. If it's player X's turn, put X in. If it's player O's turn, put O in.
// 	-Keep track of whose turn it is


// 4. ON each player's turn, when markSquare is called:
//		-Change whose turn it is
//		-Insert appropriate symbol