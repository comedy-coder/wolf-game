import {Player} from './player.js';
import {InputHandler} from "./InputHandler.js";
import {BackGround} from "./background.js";
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
                this.player = new Player(this) ;
                this.input = new InputHandler();
                this.background = new BackGround(this);
            }
            update(deltaTime) {
                this.background.update()
                this.player.update(this.input.keys,deltaTime);
            }
            draw(context){
                this.background.draw(context)
                this.player.draw(context)
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