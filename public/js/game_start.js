class Game {
    /**
     * This function creates a score board and appends it to the container.
     */
    constructor() {
        this.score_element = this.create_score_board();
        CONTAINER.appendChild(this.score_element);

        this.start_game();
    }

    /**
     * It creates a div element, sets its text to the value of the SCORE variable, and then sets a bunch of CSS properties
     * @returns The score_board is being returned.
     */
    create_score_board() {
        const score_board = document.createElement('div');
        score_board.innerText = SCORE;

        score_board.style.padding = "0.5rem 1rem";
        score_board.style.fontSize = "3rem";
        score_board.style.color = "white";


        score_board.style.position = "absolute";
        score_board.style.transform = "translate(-50%,0)";
        score_board.style.top = "5%";

        score_board.style.left = "50%";
        score_board.style.zIndex = "2";


        return score_board;
    }

    /* Updating the score board. */
    maintain_score() {
        this.score_element.innerText = SCORE;
    }

    /**
     * Every 3 seconds, create a new pipe and maintain the score.
     */
    start_game() {
        new Bird();

        const game_id = setInterval(() => {
            if (GAME_OVER) {
                clearInterval(game_id);
                return;
            }

            this.maintain_score();
            new Pipe();

        }, BIRD_GENERATION_DELAY);
    }
}