class Pipe {
    /**
     * This function creates two piped and appends it to the container.
     */
    constructor() {
        this.top_postion = 0

        this.top_pipe = this.create_pipe("top");
        this.bottom_pipe = this.create_pipe("bottom");

        CONTAINER.appendChild(this.top_pipe);
        CONTAINER.appendChild(this.bottom_pipe);

        this.move_pipe();
    }

    /**
     * "If the game is not over, move the pipes to the left by the game speed, check for collision, and if the pipe is still on the screen, move the pipe again."
     * The first thing the function does is check if the game is over. If it is, the function returns and does nothing.
     * Next, the function gets the current position of the top and bottom pipes.
     * Then, the function moves the pipes to the left by the game speed.
     * After that, the function checks for collision.
     * Finally, the function checks if the pipe is still on the screen. If it is, the function calls itself again. If it isn't, the function removes the pipes from the screen.
     * @returns - nothing
     */
    move_pipe() {
        if (GAME_OVER) return;

        let current_position_top_pipe = parseFloat(this.top_pipe.style.left);
        let current_position_bottom_pipe = parseFloat(this.bottom_pipe.style.left);

        this.top_pipe.style.left = `${current_position_top_pipe - GAME_SPEED}px`;
        this.bottom_pipe.style.left = `${current_position_bottom_pipe - GAME_SPEED}px`;

        this.check_collision();

        window.requestAnimationFrame(() => {
            if (current_position_top_pipe + PIPE_MAX_WIDTH > 0) {
                this.move_pipe();
            } else {
                CONTAINER.removeChild(this.top_pipe);
                CONTAINER.removeChild(this.bottom_pipe);
            }
        })
    }


    /**
     * It creates a pipe and returns it
     * @param pipe_position - top or bottom
     * @returns the single_pipe element.
     */
    create_pipe(pipe_position) {
        const single_pipe = document.createElement('div');

        single_pipe.style.background = "url('../images/Flappy-bird-sprite-sheet.png') no-repeat";
        single_pipe.style.backgroundPosition = pipe_position === "top" ? "-112px -646px" : "-168px -646px";
        single_pipe.style.backgroundSize = "1024px 1024px";
        single_pipe.style.width = "52px";
        single_pipe.style.height = "320px";

        this.top_position = pipe_position === "top" ? getRandomInt(-PIPE_MAX_HEIGHT, 0) : this.top_position + PIPE_MAX_HEIGHT + PIPE_GAP;

        single_pipe.style.position = "absolute";
        single_pipe.style.top = `${this.top_position}px`;
        single_pipe.style.left = `${PIPE_GENERATE_X_POSITION}px`;

        return single_pipe;
    }

    /**
     * If the bird's left side is between the pipe's left and right side, or if the bird's right side is between the pipe's left and right side, then return true.
     * @param bird_x_coordinates - [x_coordinate_of_left_side_of_bird,
     * x_coordinate_of_right_side_of_bird]
     * @param pipe_x_coordinates - [x_coordinate_of_left_side_of_pipe,
     * x_coordinate_of_right_side_of_pipe]
     * @returns a boolean value.
     */
    colision_condition_x_axis(bird_x_coordinates, pipe_x_coordinates) {
        return (bird_x_coordinates[0] <= pipe_x_coordinates[1] && bird_x_coordinates[0] >= pipe_x_coordinates[0]) || (bird_x_coordinates[1] >= pipe_x_coordinates[0] && bird_x_coordinates[1] <= pipe_x_coordinates[1])
    }

    /**
     * If the bird's y-coordinates are within the range of the pipe's y-coordinates, then the bird has
     * collided with the pipe.
     * @param bird_y_coordinates - [bird_top_y_coordinate, bird_bottom_y_coordinate]
     * @param pipe_y_coordinates - [pipe_top_y_coordinate, pipe_bottom_y_coordinate]
     * @returns a boolean value.
     */
    colision_condition_y_axis(bird_y_coordinates, pipe_y_coordinates) {
        return (bird_y_coordinates[0] >= pipe_y_coordinates[0] && bird_y_coordinates[0] <= pipe_y_coordinates[1]) || (bird_y_coordinates[1] >= pipe_y_coordinates[0] && bird_y_coordinates[1] <= pipe_y_coordinates[0])
    }

    /**
     * It checks if the bird has collided with the top or bottom pipe, and if it has, it calls the game_over() function, which stops the game.
     */
    check_collision(){
        const top_pipe_current_x_position = parseInt(this.top_pipe.style.left);
        const top_pipe_current_y_position = parseInt(this.top_pipe.style.top);

        const bottom_pipe_current_x_position = parseInt(this.bottom_pipe.style.left);
        const bottom_pipe_current_y_position = parseInt(this.bottom_pipe.style.top);

        let flappy_bird_x = [BIRD_POSITION_X, BIRD_POSITION_X + BIRD_WIDTH];
        let flappy_bird_y = [BIRD_POSITION_Y, BIRD_POSITION_Y + BIRD_HEIGHT];

        let top_pipe_x = [top_pipe_current_x_position, top_pipe_current_x_position + PIPE_MAX_WIDTH];
        let top_pipe_y = [top_pipe_current_y_position, top_pipe_current_y_position + PIPE_MAX_HEIGHT];

        let bottom_pipe_x = [bottom_pipe_current_x_position, bottom_pipe_current_x_position + PIPE_MAX_WIDTH];
        let bottom_pipe_y = [bottom_pipe_current_y_position, bottom_pipe_current_y_position + PIPE_MAX_HEIGHT];

        if (
            ((this.colision_condition_x_axis(flappy_bird_x, top_pipe_x))
            &&
            (this.colision_condition_y_axis(flappy_bird_y, top_pipe_y))) 
            ||
            ((this.colision_condition_x_axis(flappy_bird_x, bottom_pipe_x))
            &&
            (this.colision_condition_y_axis(flappy_bird_y, bottom_pipe_y))) 
        ) {
            game_over();
        }
        else if (top_pipe_x[1]+2===flappy_bird_x[0]){
            SCORE++;
            console.log(SCORE);
        }
    }
}