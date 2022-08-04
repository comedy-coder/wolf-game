const canvas = document.getElementById("canvas1");
const ctx  = canvas.getContext('2d')
const CANVAS_HEIGHT = canvas.height = 880;
const CANVAS_WIDTH = canvas.width = 500;
const numberOfEnemies = 50;
let enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
         this.enemyImage = new Image();
        this.enemyImage.src = "./enemy3.png";
        this.speed = Math.random() * 4 + 1;
        this.spirteWidth = 218;
        this.spirteHeight = 177;
        this.width = this.spirteWidth / 2.5;
        this.height = this.spirteHeight/2.5;
        this.x = Math.random() * (canvas.width- this.width);       
        this.y = Math.random() * (canvas.height- this.height);
        this.frame = 2;
        this.flapSpeed  = Math.floor(Math.random()*3 +1) ;
        this.angle = 0;
        this.angleSpeed = Math.random()* 0.2;
        this.curve = Math.random()* 7;
    }
    update()
    {   this.x  = this.x - this.speed;
        this.y += this.curve* Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = canvas.width;
        this.x += Math.random() *5 - 2.5;
        // this.y += Math.random() *5 - 2.5;
        if(gameFrame % this.flapSpeed === 0 ){
            this.frame > 4 ? this.frame  = 0 : this.frame++;

        }
    }
    draw(){
        ctx.drawImage(this.enemyImage,this.spirteWidth * this.frame, 0 ,this.spirteWidth,this.spirteHeight, this.x,this.y,this.width,this.height)
    }
}   

    for(i=0; i< numberOfEnemies ; i++)
    {
        enemiesArray.push(new Enemy())
    }
    console.log(enemiesArray)

function animate () {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    gameFrame ++;
    requestAnimationFrame(animate)
    }
animate()