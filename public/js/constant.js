const CONTAINER_WIDTH = 300;
const CONTAINER_HEIGHT = 500;

const CONTAINER = document.getElementById("game");

const MENU = document.getElementById("game_menu");

const BIRD_ANIMAITON = [
    {
        x: -6,
        y: -982
    },
    {
        x: -62,
        y: -982
    },
    {
        x: -118,
        y: -982
    }
];

const BIRD_DROP_SPEED = 1;
const BIRD_DROP_ACCLERATION = 0.98;
const BIRD_FLY_SPEED = 2; 
const BIRD_WIDTH = 36;
const BIRD_HEIGHT = 24;
const BIRD_POSITION_X = CONTAINER_WIDTH / 3 ;
let BIRD_POSITION_Y = CONTAINER_HEIGHT / 2;

const PIPE_MAX_HEIGHT = 320;
const PIPE_MAX_WIDTH = 52;
const PIPE_GAP = 175;
const PIPE_GENERATE_X_POSITION = CONTAINER_WIDTH + 100;

const FPS_144 = 1000/144;
const FPS_500 = 1000/500;
const START_END_DELAY = 2000;
const BIRD_GENERATION_DELAY = 3000;

let ANIMATE_BIRD_ID = "";
let DROP_BIRD_ID = "";
let FLY_BIRD_ID = "";

let GAME_OVER = true;
let GAME_SPEED = 0;

let SCORE = 0;

let GAME_MENU;
