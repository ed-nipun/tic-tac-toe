var readlineSync = require("readline-sync");

var char = readlineSync.question("gimme a char: ");

class TicTacToe {
  constructor(char) {
    if (
      char.length === 0 ||
      char.toLowerCase() === "x" ||
      char.toLowerCase() === "o"
    )
      char = " ";

    this.char = char;

    this.board = [
      [char, char, char],
      [char, char, char],
      [char, char, char],
    ];
  }
  printBoard() {
    for (let i = 0; i < this.board.length; i++) {
      console.log(this.board[i]);
    }
  }

  get emptySpaces() {
    let emptySpacesCount = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === this.char) emptySpacesCount++;
      }
    }

    return emptySpacesCount;
  }

  mark(marker, row, col) {
    if (this.board[row][col] === this.char && this.emptySpaces > 0)
      this.board[row][col] = marker;
  }

  whoIsWinner() {
    let string = "";
    let string2 = "";
    let string3 = "";
    let winner = "no one";
    for (let i = 0; i < this.board.length; i++) {
      string += this.board[i][i];
      string2 += this.board[2 - i][i];

      for (let j = 0; j < 3; j++) {
        string3 += this.board[j][i];
      }

      if (this.board[i].join("") === "xxx" || string3 === "xxx")
        return (winner = "x");
      else if (this.board[i].join("") === "ooo" || string3 === "ooo")
        return (winner = "0");
    }

    if (string === "xxx" || string2 === "xxx") return (winner = "x");
    else if (string === "ooo" || string2 === "ooo") return (winner = "o");

    return winner;
  }

  scan() {
    const scanedArr = [];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === this.char) {
          scanedArr.push({ row: +i, col: +j });
        }
      }
    }

    return scanedArr[Math.floor(Math.random() * scanedArr.length)];
  }
}

const myGame = new TicTacToe(char);

myGame.printBoard();

console.log(myGame.emptySpaces);

let winner = "no one";

while (myGame.emptySpaces > 0 && winner === "no one") {
  var mark = readlineSync.question("mark on the board: ");

  if (mark === "exit") {
    break;
  }

  const markArr = mark.split(" ");

  myGame.mark(markArr[0], +markArr[1], +markArr[2]);

  winner = myGame.whoIsWinner();

  if (myGame.emptySpaces > 0 && winner === "no one") {
    console.log("its my turn...");

    const scan = myGame.scan();

    myGame.mark("o", scan.row, scan.col);
  }

  myGame.printBoard();

  winner = myGame.whoIsWinner();

  console.log(winner);
}
