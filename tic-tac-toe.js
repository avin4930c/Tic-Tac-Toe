const cells = document.querySelectorAll('.cell');
winner_text = document.querySelector('.winner');
let cell_array = [];
let current_player = 'x', game_winner = "";
const reset_button = document.querySelector('.reset-btn');

function displayElements(e) {
    console.log("Hello");
    if (this.classList == "cell") {
        this.setAttribute('data-content', current_player);
        current_player == 'x' ? (this.classList.add('x'),  (current_player = 'o'), (cell_array[this.getAttribute('data-cell')] = ('x'))) : (this.classList.add('o'),  (current_player = 'x'), cell_array[this.getAttribute('data-cell')] = ('o'));
    };
    checkWin();
    if (game_winner) {
        winner_text.textContent = `The winner is ${game_winner}`;
        gameOver();
    }
}

function DisplayController() {
    cells.forEach(cell => cell.addEventListener("click", displayElements));
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cell_array[a] && cell_array[a] === cell_array[b] && cell_array[a] === cell_array[c]) {
            game_winner = cell_array[a];
            return;
        }
    };
}

function gameOver() {
    cells.forEach(cell => cell.removeEventListener("click", displayElements));
}

reset_button.addEventListener("click", function(e) {
    cells.forEach(cell => {
        cell.textContent = ""; // Reset the content of each cell
        cell.classList.remove("x", "o");
        cell.removeAttribute('data-content');
        game_winner = "";
        current_player = 'x';
        cell_array = [];
    });
    DisplayController();
});

DisplayController();