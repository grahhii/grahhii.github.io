const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "img/bg.png";

const food = new Image();
food.src = "img/food.png";


let box = 32;

let score = 0;

let foodPos = { // рандомная позиция яйца
    x: Math.floor((Math.random() * 17 + 1)) * box ,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let char = [];
char[0] = { 
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) { 
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}
function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

function drawGame() { 
   ctx.drawImage(bg, 0, 0);
   
   ctx.drawImage(food, foodPos.x, foodPos.y);
   
   for(let i = 0; i < char.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(char[i].x, char[i].y, box, box);
    }  

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score, 70, 52);

    
    let charX = char[0].x;
    let charY = char[0].y;

   

    if(charX == foodPos.x && charY == foodPos.y) {
        score++;
        foodPos = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
        }; 
        
    } else {
        char.pop();
        }
    if(charX < box || charX > box * 17 || charY < 3 * box || charY > box * 17) {
       clearInterval(game); 
    }
   
    if(dir == "left") charX -= box;
    if(dir == "right") charX += box;
    if(dir == "up") charY -= box;
    if(dir == "down") charY += box;
    
    let newChar = {
        x: charX,
        y: charY
    };
   eatTail(newChar, char);
   char.unshift(newChar); 
   
}
let game = setInterval(drawGame, 100);