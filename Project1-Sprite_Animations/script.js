/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1'); //Getting the canvas defined in HTML
const ctx = canvas.getContext('2d'); //ctx provides methods for drawing and image manipulation in the canvas
//Canvas Bounds
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
//Selecting the sprite image
const playerImage = new Image();
playerImage.src = './shadow_dog.png';
const spriteWidth = 575; //width of each sprite
const spriteHeight = 523; //height of each sprite
let gameFrame = 0; //Counter increases by 1 each time animate() is called
const skipFrames = 4; //can be used to adjust animation speed. Lower value means higher speed
const spriteAnimations = []; //This will store all the different animations of the sprite.
//create an animationStates object array of frames and animation name
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    },

]
//use animationStates to create and store the spriteAnimations array.
animationStates.forEach((state, index)=>{
    let frames ={
        loc: [],
    }
    for(let i=0; i<state.frames; i++){
        let positionX = i*spriteWidth; //i is the column number in the spritesheet
        let positionY = index * spriteHeight; //index is the row number in the spritesheet
        frames.loc.push({x: positionX, y: positionY}); //pushing locations object to frames
    }
    spriteAnimations[state.name] = frames; //adding frames in spriteAnimations array
});
//change player state according to the dropdown.
let playerState = 'idle'
let dropDown = document.getElementById("animations")
dropDown.addEventListener('change', function(e){
    playerState = e.target.value;
})
//Animate function which is called every animation frame
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);//clearing the canvas every animation frame
    let position = Math.floor(gameFrame/skipFrames) % spriteAnimations[playerState].loc.length;//this is a modulus operation if a animation has n frames then it will cycle from 0 to n-1 frames
    let frameX = spriteAnimations[playerState].loc[position].x; //horizontal position of frame in sprite sheet 
    let frameY = spriteAnimations[playerState].loc[position].y; //vertical position of frame in sprite sheet
    //ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate); //animation frames callback animate function.
}
animate()