import {Player} from './player.js';
import {InputHandler} from "./InputHandler.js";
import {BackGround} from "./background.js";
import { CLimbingEnemy, FlyingEnemy, GroundEnemy} from "./enemies.js"
window.addEventListener('load',function(){
        const canvas = this.document.getElementById("canvas1")
        const ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        let lastTime = 0;
        class Game{
            constructor(width,height)
            {
                this.width = width;
                this.height = height;
                this.groundMargin = 50;
                this.speed = 1;
                this.player = new Player(this) ;
                this.input = new InputHandler();
                this.background = new BackGround(this);
                this.enemies = [];
                this.enemeyTimer = 0;
                this.enemyInterval = 1000;
            }
            update(deltaTime) {
            
                this.background.update()
                this.player.update(this.input.keys,deltaTime);
                    //handleEnemies
                if(this.enemeyTimer > this.enemyInterval)
                      {  
            
                        
                        this.addEnemy();
                    
                         this.enemeyTimer = 0; 
                         
                         
                      } 
                    else {this.enemeyTimer += deltaTime};
                   
                    this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                    if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);
                    
                })
                       
                       
            }
            draw(context){
                this.background.draw(context)
                this.player.draw(context)
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                    
                })
            }
            addEnemy(){
             this.enemies.push(new GroundEnemy(this));
                // else if(this.speed > 0  ) {this.enemies.push(new CLimbingEnemy(this))};
                this.enemies.push(new FlyingEnemy(this));
                console.log(this.enemies)            
              }

        }
        const game = new Game(canvas.width,canvas.height);
        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp ;

            ctx.clearRect(0,0,canvas.width,canvas.width)
            game.update(deltaTime);
            game.draw(ctx);
            requestAnimationFrame(animate);
        }
        animate(0);
})