class Game_menu {
    /**
     * If the highscore is null, then set the highscore to the score, otherwise set the highscore to the local storage item.
     */
    constructor() {
        this.highscore = localStorage.getItem("flappy-highscore") === null ? SCORE : localStorage.getItem("flappy-highscore");

        this.reset_game();

        const START_BUTTON = document.querySelector("#start");
        START_BUTTON.addEventListener('click', () => {
            this.start();
        });
    }

    /**
     * This function resets the game by managing the score and displaying the menu.
     */
    reset_game() {
        this.manage_score();

        MENU.style.display = "flex";
        CONTAINER.innerHTML = "";
    }

    /**
     * When the user clicks the button, the button's text will change from "START" to "RESTART".
     */
    restart_game_container(){
        const btn = document.getElementById("start");
        btn.innerText = "RESTART";
    }

    /**
     * If the current score is greater than the highscore, then the highscore is set to the current score and the highscore is saved to local storage.
     */
    manage_score() {
        if (SCORE >= this.highscore) {
            this.highscore = SCORE
            localStorage.setItem("flappy-highscore", SCORE)
        }

        const score_element = document.querySelector('p#score');
        score_element.innerText = `Score: ${SCORE} \n High-score: ${this.highscore}`;
        score_element.style.fontSize = "2rem";
        score_element.style.textAlign = "center";

    }

    /**
     * It starts the game.
     */
    start() {
        GAME_SPEED = 1;
        SCORE = 0;
        GAME_OVER = false;
        BIRD_POSITION_Y = CONTAINER_HEIGHT / 2;

        new Game();

        MENU.style.display = "none";
    }
}