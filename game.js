function createReadline() {
    return require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

let totalWins = 0;

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    makeChoice(choice) {
        this.choice = choice;
    }
}

class HumanPlayer extends Player {
    constructor(name, readLine) {
        super(name);
        this.readLine = readLine;
    }

    async makeChoice() {
        let choice = "";

        while (true) {
            choice = await new Promise(resolve => {
                this.readLine.question("Choose rock, paper, or scissors (or type 'quit' to exit): ", answer => {
                    resolve(answer.toLowerCase());
                });
            });

            if (choice === "quit") {
                process.exit(); // End program
            }

            if (["rock", "paper", "scissors"].includes(choice)) {
                break;
            } else {
                console.log("Invalid input! Please enter rock, paper, or scissors.");
            }
        }

        super.makeChoice(choice);
    }
}

class ComputerPlayer extends Player {
    makeChoice() {
        const options = ["rock", "paper", "scissors"];
        const randomChoice = options[Math.floor(Math.random() * options.length)];
        super.makeChoice(randomChoice);
    }
}

class Game {
    constructor(player1, player2, rounds) {
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = rounds;
        this.currentRound = 1;
    }

    determineWinner() {
        const p1 = this.player1.choice;
        const p2 = this.player2.choice;

        if (p1 === p2) return "draw";

        if (
            (p1 === 'rock' && p2 === 'scissors') ||
            (p1 === 'paper' && p2 === 'rock') ||
            (p1 === 'scissors' && p2 === 'paper')
        ) {
            this.player1.score++;
            return this.player1.name;
        } else {
            this.player2.score++;
            return this.player2.name;
        }
    }

   async playRound() {
    console.log(`\n--- Round ${this.currentRound} ---`);
    await this.player1.makeChoice();
    this.player2.makeChoice();

    console.log(`${this.player1.name} chose: ${this.player1.choice}`);
    console.log(`${this.player2.name} chose: ${this.player2.choice}`);

    const winner = this.determineWinner();

    if (winner === "draw") {
        console.log("\x1b[33m%s\x1b[0m", "It's a draw!");  // Yellow
    } else if (winner === this.player1.name) {
        console.log("\x1b[32m%s\x1b[0m", `${winner} wins this round!`);  // Green
    } else {
        console.log("\x1b[31m%s\x1b[0m", `${winner} wins this round!`);  // Red
    }

    console.log(`Score: ${this.player1.name} ${this.player1.score} - ${this.player2.score} ${this.player2.name}`);
    this.currentRound++;
}
}

async function playGame() {
    const readLine = createReadline();

    const rounds = await new Promise(resolve => {
        readLine.question("How many rounds do you want to play? ", answer => {
            const parsed = parseInt(answer);
            if (isNaN(parsed) || parsed <= 0) {
                console.log("Invalid number. Exiting...");
                process.exit();
            } else {
                resolve(parsed);
            }
        });
    });

    const human = new HumanPlayer("You", readLine);
    const computer = new ComputerPlayer("Computer");
    const game = new Game(human, computer, rounds);

    while (game.currentRound <= game.rounds) {
        await game.playRound();
    }

    console.log("\n--- Final Results ---");
    console.log(`${human.name}: ${human.score}`);
    console.log(`${computer.name}: ${computer.score}`);

    if (human.score > computer.score) {
        console.log("\x1b[32m%s\x1b[0m","You won this game!");
        totalWins++;
    } else if (human.score < computer.score) {
        console.log("\x1b[31m%s\x1b[0m","Computer won this game.");
    } else {
        console.log("\x1b[33m%s\x1b[0m","It's a tie!");
    }

    console.log(`\n🏆 Total Wins: ${totalWins}`);

    const playAgain = await new Promise(resolve => {
        readLine.question("Do you want to play again? (yes/no): ", answer => {
            resolve(answer.toLowerCase());
        });
    });

    readLine.close();

    if (playAgain === "yes") {
        setTimeout(() => playGame(), 100);
    } else {
        console.log("Thanks for playing!");
        process.exit();
    }
}

console.log("Welcome to Rock-Paper-Scissors!");
playGame();
