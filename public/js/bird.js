class Bird {
    /**
     * This function creates a bird, appends it to the container, and then animates it.
     */
    constructor() {
        this.bird = this.create_bird();

        CONTAINER.appendChild(this.bird);
        this.animate_bird();

        this.bird_movement();
    }

    /**
     * Every 144 milliseconds, change the background position of the bird to the next position in the array.
     */
    animate_bird() {
        let index = 0;
        ANIMATE_BIRD_ID = setInterval(() => {
            index = (++index % BIRD_ANIMAITON.length);

            this.bird.style.backgroundPosition = `${BIRD_ANIMAITON[index].x}px ${BIRD_ANIMAITON[index].y}px`;
        }, FPS_144);
    }

    /**
     * This function creates a div element, sets its style properties, and returns the div element.
     * @returns the flappybird div.
     */
    create_bird() {
        const flappybird = document.createElement('div');

        flappybird.style.background = "url('../images/Flappy-bird-sprite-sheet.png') no-repeat";
        flappybird.style.backgroundSize = "1024px 1024px";
        flappybird.style.width = `${BIRD_WIDTH}px`;
        flappybird.style.height = `${BIRD_HEIGHT}px`;

        flappybird.style.position = "absolute";
        flappybird.style.top = `${BIRD_POSITION_Y}px`;
        flappybird.style.left = `${BIRD_POSITION_X}px`;

        flappybird.style.zIndex = "1";

        return flappybird;
    }

    /**
     * "If the bird is not dropping, then set a timer to drop the bird at a rate of 144 times per second, and if the bird is dropping at the bottom boundary or game is over then stop the timer."
     * "If the bird is not dropping, then set a timer to drop the bird at a constant acceleration until the bird hits the ground or a pipe."
     * The timer is set to run until the bird hits the ground or a pipe because the game is over when the bird hits the ground or a pipe.
     */
    drop_bird() {
        if (!DROP_BIRD_ID) {
            let time_frame = 0.1;
            DROP_BIRD_ID = setInterval(() => {
                if (GAME_OVER){
                    this.bird.style.transform = "rotatez(90deg)";
                }

                BIRD_POSITION_Y = parseInt(this.bird.style.top);

                this.bird.style.top = `${BIRD_POSITION_Y + (BIRD_DROP_ACCLERATION * time_frame)}px`;
                time_frame += 0.05;

                if (BIRD_POSITION_Y >= 476 && GAME_OVER) {
                    clearInterval(DROP_BIRD_ID);
                    DROP_BIRD_ID = "";
                } else if (BIRD_POSITION_Y >= 476){
                    game_over();
                }
            }, FPS_144);
        }
    }

    /**
     * The function fly_bird() is called when the user presses the spacebar. The function fly_bird() then calls the function drop_bird() when the bird reaches the top of the screen or when the bird reaches the top of the pipe. The function drop_bird() then calls the function fly_bird() when the bird reaches the bottom of the screen.
     * @param current_position - The position of the pipe that the bird is flying towards.
     */
    fly_bird(current_position) {
        if (!FLY_BIRD_ID) {
            FLY_BIRD_ID = setInterval(() => {
                let current_bird_position_y = parseInt(this.bird.style.top);

                this.bird.style.top = `${current_bird_position_y - 2}px`;

                if ((current_bird_position_y + 50 === current_position) ||   current_bird_position_y <   0) {
                    clearInterval(FLY_BIRD_ID);
                    FLY_BIRD_ID = "";
                    this.drop_bird();
                } else if (current_bird_position_y === 0){
                    game_over();
                    this.drop_bird();
                }
            }, FPS_500);
        }
    }
    
    /**
     *  A function that is called when the user presses the space bar. It clears the drop and fly intervals, gets the current position of the bird, and then calls the fly_bird function.
     * @param event - The event occur in the listener.
    */
    handle_bird_movement = (event) => {
        if (event.key === " " && !GAME_OVER) {
            clearInterval(DROP_BIRD_ID);
            DROP_BIRD_ID = "";
            clearInterval(FLY_BIRD_ID);
            FLY_BIRD_ID = "";
            
            let current_bird_position = parseInt(this.bird.style.top);

            this.fly_bird(current_bird_position);
        }
    }

    /**
     * After 2 seconds, the bird will drop and the container will animate at a speed of 10 times the game speed.
     */
    bird_movement() {
        setTimeout(() => {
            this.drop_bird();
            CONTAINER.style.animationDuration = `${GAME_SPEED * 10}s`;
        }, START_END_DELAY);
        document.addEventListener("keypress", this.handle_bird_movement, true);
    }
}