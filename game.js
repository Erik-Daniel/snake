
var lastRenderTime = 0;
var lastRenderTimeInSec = 0;
var container = document.getElementById("container");
 var img = document.createElement("img");
var play = document.createElement("button");
var settings =  document.createElement("button");

var background = document.createElement("div");
var quit = document.createElement("button");
var text = document.createElement("p");
var restart = document.createElement("button");
var back = false;

var lostAudio = new Audio("assets/lost.mp3");

 var snakeSpeed = 10;
var body = [{x: 11, y: 11}];
var directionX = 0;
var directionY  = 0;
var direction;
var lastDirection;
var add = 1;
var length = 1;
var gameover = false
var callMain = true;
var musicOn = true;
var lengthText = document.getElementById("length");



var location = {x:10, y:10};


function food() {
    var randomX = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    var randomY = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    location.x = randomX;
    location.y = randomY;
    img.style.gridRowStart = location.y;
    img.style.gridColumnStart = location.x;
    console.log("XXX " + location.x)
    console.log("img " + location.x + " " + location.y)


}


    window.onkeydown = function(key) {
        direction = key.key;
    }

function updateSnake(){ 
     console.log(body[0]);
     switch(direction) {
    case "ArrowUp":
        if(lastDirection === "ArrowDown") break;
        lastDirection = direction;
        directionY = -1;
        directionX = 0;
        break;
    case "ArrowDown":
        if(lastDirection === "ArrowUp") break;
        lastDirection = direction;
        directionY =  1;
        directionX = 0;
        break;
    case "ArrowRight":
        if(lastDirection === "ArrowLeft") break;
        lastDirection = direction;
        directionY = 0;
        directionX = 1;
        break;
    case "ArrowLeft":
        if(lastDirection === "ArrowRight") break;
        lastDirection = direction;
        directionY = 0;
        directionX = -1;
        break;
     
     }
    for(var i = body.length - 2; i >= 0; i-- ){
        
   
        body[i + 1] =  {...body[i]};
   
    }
    body[0].x += directionX;
    body[0].y += directionY;
    console.log("directionx " + directionX)
    
    if(body[0].x === location.x && body[0].y === location.y ){
        ateApple();
    } 
    if(body[0].x === 21 || body[0].x === 0 ){
        gameover = true;
    }
    if(body[0].y === 21 || body[0].y === 0){
       gameover = true;
    }
    console.log("body[0] " + body[0].y);
    for(var i = 1; i < body.length; i++){
        console.log("i 2432423 " + i);
        if(body.length > 2){
        if(body[0].x === body[i].x && body[0].y === body[i].y ){
            gameover = true; 
        }
        }
    }


    
}
 function drawSnake(container) {
    container.innerHTML = ''
    
    img.src = 'assets/apple.png';
    img.classList.add("apple");
    container.appendChild(img);


  
    body.forEach(segments => {
        var div = document.createElement("div");
        div.style.gridColumnStart = segments.x;
        div.style.gridRowStart = segments.y;
        div.classList.add("body");
        container.appendChild(div);
    })
}
function checkApple() {
    for(var i = 0; i < body.length; i++){
        if(location.x === body[i].x && location.y === body[i].y){
            food();
            checkApple();
            console.log("check");
        }
    }
     
}


function ateApple() {
var biteAudio = new Audio('assets/bite.mp3');
    food();
    checkApple();
    updateScore();
    for(var i = 0; i < add; i++){
    body.push(body[body.length -1]);
    }
    if(musicOn){
        biteAudio.play();
    }
}



createMenu();
 function main(currentTime) {
    if(!gameover){
    window.requestAnimationFrame(main);
    }
    lastRenderTimeInSec = (currentTime - lastRenderTime) / 1000;
    if(lastRenderTimeInSec < 1 / snakeSpeed) return 
    lastRenderTime = currentTime;

    updateSnake();
    drawSnake(container);

    if(gameover){
        goInGameOverMode();
    }
    

}


function createMenu() {
  
    play.textContent = "play";
    play.classList.add("play");

    settings.textContent = "settings";
    settings.classList.add("settings");
    

    if(!back){
    container.appendChild(play);
    container.appendChild(settings);
    }
    play.onclick = function() {
        goInPlayMode();
        
    }

    settings.onclick = function() {
        goInSettingsMode();
    }
}

function goInPlayMode() {
    window.requestAnimationFrame(main);
}

function goInSettingsMode(){
    settings.style.visibility = "hidden";
    play.style.visibility = "hidden";
    var goBack = document.createElement("button");
    goBack.textContent = "go Back";
    goBack.classList.add("goBack");
    
    var music = document.createElement("button");
    if(musicOn) {
        music.textContent = "Music: On";
    }
    else {
        music.textContent = "Music: Off";
    }
    music.onclick = function() {
        
        if(!musicOn){
            musicOn = true;
            music.textContent = "Music: On";
        }
        else {
            musicOn = false;
            music.textContent = "Music: Off";
        }
    }
    music.classList.add("music");

    container.appendChild(goBack)
    container.appendChild(music);

    goBack.onclick = function() {
        goBack.style.visibility = "hidden";
        music.style.visibility = "hidden";
        settings.style.visibility = "visible";
        play.style.visibility = "visible";
    }

    


}

function goInGameOverMode() {
    console.log(container);
    if(musicOn){
    lostAudio.play();
    }
    restart.textContent = "restart";
    restart.style.visibility = "visible";
    restart.classList.add("restart");
    
    text.textContent = "oops, you scored " + length + " Better luck next time";
    text.classList.add("restartTalk");
    text.style.visibility = "visible";

    quit.textContent = "quit";
    quit.classList.add("quit");
    quit.style.visibility = "visible";

    restart.onclick = function() {
        restartFunction();
    }

    quit.onclick = function() {
        quitFunction();
    }
    background.id = "restartBackground";
    container.appendChild(restart);
    container.appendChild(text)
    container.appendChild(quit);

    
}

function restartFunction() {
    reset();
    window.requestAnimationFrame(main)
    
}

function reset() {
    gameover = false;
    
    lostAudio.pause();
    lostAudio.currentTime = 0;
    lastDirection = "";
    direction = "";
    directionX = 0;
    directionY = 0;
    location.x = 10;
    location.y = 10;
    length = 0;
    updateScore();
    body = [{x: 11,y: 11}]
    img.style.gridColumnStart = location.x;
    img.style.gridRowStart = location.y;
   
}

function updateScore() {

    length += 1;
    lengthText.textContent = length;

}

function quitFunction() {
    reset();
    restart.style.visibility = "hidden";
    quit.style.visibility = "hidden";
    text.style.visibility = "hidden";
    
    createMenu();
}