/**
 * It returns a random integer between the two parameters.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number of the range.
 * @returns A random number between the min and max values.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * It stops the game
 */
function game_over() {
    GAME_SPEED = 0;
    GAME_OVER = true;
    clearInterval(ANIMATE_BIRD_ID);
    clearInterval(FLY_BIRD_ID);
    CONTAINER.style.animationDuration = `0s`;
    console.log(SCORE);
}