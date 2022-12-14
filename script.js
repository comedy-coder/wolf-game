import {Player} from './player.js';
import {InputHandler} from "./InputHandler.js";
import {BackGround} from "./background.js";
import { CLimbingEnemy, FlyingEnemy, GroundEnemy} from "./enemies.js";
import {UI} from "./UI.js";
window.addEventListener('load',function(){
        const canvas = this.document.getElementById("canvas1")
        const ctx = canvas.getContext("2d");
        canvas.width = 900;
        canvas.height = 500;
        let lastTime = 0;
        class Game{
            constructor(width,height)
            {
                this.width = width;
                this.height = height;
                this.groundMargin = 40;
                this.speed = 3;
                this.player = new Player(this) ;
                this.input = new InputHandler(this);
                this.background = new BackGround(this);
                this.enemies = [];
                this.particles = [];
                this.collisions = [];
                this.UI = new UI(this);
                this.maxParticles = 50;
                this.enemeyTimer = 0;
                this.enemyInterval = 1000;
                this.debug = false;
                this.score = 0;
                this.time = 0;
                this.maxTime = 15000;
                this.fontColor = 'black';
                this.gameOver = false;
                this.player.currentState = this.player.states[0];
                this.player.currentState.enter();
            }
            update(deltaTime) {
                this.time += deltaTime;
                if(this.time > this.maxTime) this.gameOver = true;
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

                    //handle Dust;
                    this.particles.forEach((particle,index) => {
                        particle.update();
                        if(particle.markedForDeletion) this.particles.splice(index,1)
                    });
                    if(this.particles.length > this.maxParticles)
                    {
                        this.particles =this.particles.slice(0, this.maxParticles)
                    }
                    // handle collisions sprites 
                    this.collisions.forEach((collision , index)=>{
                        collision.update(deltaTime);
                        if(collision.markedForDeletion) this.collisions.splice(index, 1);
                    }
                    )
                })
                 
                       
            }
            draw(context){
                this.background.draw(context)
                this.player.draw(context)
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                    
                })
                this.particles.forEach((particle,index) => {
                    particle.draw(context);
                    if(particle.markedForDeletion) this.particles.splice(index,1)
                });
                this.collisions.forEach((collision,index) => {
                    collision.draw(context);
                    if(collision.markedForDeletion) this.collision.splice(index,1)
                });
                this.UI.draw(context);
            }
            addEnemy(){
                if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
                else if(this.speed > 0  ) {this.enemies.push(new CLimbingEnemy(this))};
                this.enemies.push(new FlyingEnemy(this));
                
              }

        }
        const game = new Game(canvas.width,canvas.height);
        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp ;

            ctx.clearRect(0,0,canvas.width,canvas.width)
            game.update(deltaTime);
            game.draw(ctx);
            if(!game.GameOver) requestAnimationFrame(animate);
        }
        animate(0);
})