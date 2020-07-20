console.log('Let\'s play a game!');

//defining global variables
const gameStatus = document.querySelector('.gamestatus');
gameStatus.innerHTML = "Are you ready?"
//displays if the game is won or tied
let gameActive = false; //defines a game in play, pauses if game is ended
let currentPlayer = "X";  //defines whose turn it is
let gameState = ["", "", "", "", "", "", "", "", ""]; //game state stores as an array of empty strings to track played cells and validate later game states
const winRar = () => `You won! Now take that robot's car!`;	//messages set for win or tie conditions, 
const loseRar = () => `You lost to a robot! Better luck next time.`;
const stalemate = () => `It's a tie! Keep playing!`;
const currentPlayerTurn = () => `It's your move!`; //let's players know whose turn it is

if (gameActive == true && roundWon == false && roundLost == false) {
	gameStatus.innerHTML = currentPlayerTurn();
} 

const winCombos = [		//Win is when one of the arrays for 3 in a row, column, or diagonal are selected
 	[0, 1, 2],				
 	[3, 4, 5],				//horizontal winning rows
 	[6, 7, 8],
 	[0, 3, 6],
 	[1, 4, 7],				//vertical winning columns
 	[2, 5, 8],
 	[0, 4, 8],				//winning diagonal row and columns
 	[2, 4, 6]
 ]
 
 const startGame = () => {
	gameActive = true;
	currentPlayer = 'X';
	gameState = gameState = ["", "", "", "", "", "", "", "", ""];
	gameStatus.innerHTML = currentPlayerTurn();		//returns to the original player message
	document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	document.getElementById('music').pause();
	document.getElementById('music').currentTime = 0;
	document.getElementById('start').style.display = 'none';
	document.getElementById('restart').style.display = 'block';
 }
 
 
 const restartGame = () => {	//sets all variables being tracked back to their defaults
	gameActive = true;		
	currentPlayer = 'X';
	gameState = ["", "", "", "", "", "", "", "", ""];	//clears the game board by removing all values
	gameStatus.innerHTML = currentPlayerTurn();		//returns to the original player message
	document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	document.getElementById('music').pause();
	document.getElementById('music').currentTime = 0;
 }

 
 const handleCellClick = (clickedCellEvent) => {  //saves the clicked html element in a variable
	const clickedCell = clickedCellEvent.target;  //grabs the dat-cell-index attribute from the clicked cell to identify where it is in the grid
	const clickedCellIndex = parseInt(
		clickedCell.getAttribute('data-cell-index')); //since data-cell-index will return a string, it is parsed to an integer to return a number value
		if (gameState[clickedCellIndex] !== "" || !gameActive) { //checks if the cell has been played or if the game is paused
			return;												//if either is true it will ignore the click
		}
		handleCellPlayed(clickedCell, clickedCellIndex);	//proceed with game flow if everything works
		checkForWin();
	}
	
const robotMove = () => {
	// console.log("hi I\'m a robot")
	var min=0; 
	var max=8;  
	const clickedCellIndex = Math.floor(Math.random() * (+max - +min)) + +min; 
	// console.log("clickedCellIndex : " + clickedCellIndex );
	if (gameState[clickedCellIndex] !== "" || !gameActive) { //checks if the cell has been played or if the game is paused
		robotMove()											//if either is true it will ignore the click
	} else {
		const clickedCell = document.querySelector(`[data-cell-index="${clickedCellIndex}"]`)
		// console.log("clickedCell: ", clickedCell)
		handleCellPlayed(clickedCell, clickedCellIndex);	//proceed with game flow if everything works
		checkForWin();
	}
}

const handleCellPlayed = (clickedCell, clickedCellIndex) => { //updates internal game state to reflect the played move
	// console.log(clickedCell, clickedCellIndex)
	gameState[clickedCellIndex] = currentPlayer;				//updates user interface to show played move
	clickedCell.innerHTML = currentPlayer;
}

const checkForWin = () => {
	let roundWon = false;
	let roundLost = false;
	for (let i = 0; i <= 7; i++) {		//checks if clicked indices match win conditions
		const winCombo = winCombos[i];	//8 possible win conditions, so i <= 7
		let a = gameState[winCombo[0]];
		let b = gameState[winCombo[1]];
		let c = gameState[winCombo[2]]; //defines win conditions
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c && currentPlayer == "X") {
			roundWon = true;
			break
		} 
		if (a === b && b === c && currentPlayer == "O") {
			gameActive = false
			gameStatus.textContent = loseRar()
			roundLost = true;
			console.log(loseRar())
			break
		} 
	}

	if (roundWon) {
		gameStatus.innerHTML = winRar();	//displays the win message
		gameActive = false;						//stops the game
		document.getElementById('music').play();	//plays winning music
	
		return;
	}
	if (roundLost) {
		// console.log(loseRar)
		// gameStatus.innerHTML = 'You lost!';	//displays the lose message
		// gameActive = false;						//stops the game
		document.getElementById('music').play();	//plays winning music
		return;
	}
	
	let roundDraw = !gameState.includes(""); //checks if any values left in the game state array 
	if (roundDraw) {						//are still not populated
		gameStatus.innerHTML = stalemate();//if they are all populated
		gameActive = false;					//stops the game
		return;
	}
	handlePlayerChange();			//changes player if there are still moves to be made
};

const handlePlayerChange = () => {
	currentPlayer = currentPlayer === "X" ? "O" : "X"; //uses a ternary operator to assign a new player
	if (currentPlayer == "O") {
		console.log("Current Player: ", currentPlayer)
		robotMove()
	} else {
		console.log("Current Player: ", currentPlayer)
	}
	gameStatus.innerHTML = currentPlayerTurn();			//updates the game status message to show which player's turn it is
}



//adding event listeners to the individual game cells and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', restartGame);
document.querySelector('.start').addEventListener('click', startGame)










