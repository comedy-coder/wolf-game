const canvas = document.getElementById("canvas1");
const ctx  = canvas.getContext('2d')
const CANVAS_HEIGHT = canvas.height = 880;
const CANVAS_WIDTH = canvas.width = 500;
const enemies = []
class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;       
        this.y = Math.random() * canvas.height;
        this.width = 100;
        this.height = 100;

    }
    update()
    {
        this.x ++;
        this.y ++;
    }
    draw(){
        ctx.fillRect(enemy1.x,enemy1.y,enemy1.width,enemy1.height)
        
    }
}


function animate () {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    enemy1.update();
    enemy1.draw();
    requestAnimationFrame(animate)
    }
animate()