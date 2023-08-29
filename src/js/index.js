const canvasEl = document.querySelector("canvas"), canvasCtx = canvasEl.getContext("2d");

const gapX = 10;
const lineWidth = 15;


const mouse = {x:0,y:0}

const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw() {
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h);

    }
}

const line = {
    w: 15,
    h: field.h,

    draw() {
        canvasCtx.fillRect((window.innerWidth / 2) - lineWidth / 2, 0, this.w, this.h);
    }

}

const leftPaddle = {
    x: gapX,
    y: 400,
    w: line.w,
    h: 200,
    move(){
        this.y = mouse.y - this.h / 2;

    },

    draw() {
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this.move();

    }
}

const rightPaddle = {
    x: field.w - line.w - gapX,
    y: 400,
    w: line.w,
    h: 200,
    speed: 5,

    move(){
        if(this.y + this.h / 2 < ball.y +ball.r){
            this.y += this.speed;
        }else{
            this.y -= this.speed;
        }
    },

    draw() {
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this.move();

    }
}

const ball = {    
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    r: 30,
    directionX: 1,
    directionY: 1,
    speed: 10,

    changePosition(){
        if (this.x > field.w - this.r - rightPaddle.w - gapX){
            if(this.y + this.r > rightPaddle.y && this.y - this.r < rightPaddle.y + rightPaddle.h){
                
                this.directionX *= -1;
                this.speed++;
            }else{

                scoreBoard.human++;
                this.y = field.h / 2;
                this.x = field.w /2;
                this.speed = 10;
            }
        }

        if(this.x < 0 + this.r + rightPaddle.w +gapX){
            if(this.y + this.r > leftPaddle.y && this.y - this.r < leftPaddle.y + leftPaddle.h){

                this.directionX *= -1;
                this.speed++;
            }else{

                scoreBoard.computer++;
                this.y = field.h / 2;
                this.x = field.w /2;
                this.speed = 10;
                
            }
        }
            

        if(this.y > field.h - this.r) this.directionY *= -1;
        if(this.y < 0) this.directionY *= -1;
        
    },

    move(){
        this.x+=this.directionX * this.speed;
        this.y+=this.directionY * this.speed;
        
    },

    draw() {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this.move();
        this.changePosition();

    }
}

const scoreBoard = {
    human:0,
    computer:0,

    draw() {
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";
        canvasCtx.fillText(this.human, field.w / 4, 50);
        canvasCtx.fillText(this.computer, field.w / 4 + field.w / 2, 50);
    }
}

function setup() {
    canvasEl.width = canvasCtx.width = field.w;
    canvasEl.height = canvasCtx.height = field.h;

}
function draw() {

    //Campo
    field.draw();

    canvasCtx.fillStyle = "#ffffff";

    //Linha Central
    line.draw()


    //Raquete Esquerda
    leftPaddle.draw();


    //Raquete Direita
    rightPaddle.draw();
    
    //Placar
    scoreBoard.draw();

    //Bola
    ball.draw();
    

}


setup();
draw();
canvasEl.addEventListener('mousemove', e => {
    mouse.x=e.pageX;
    mouse.y=e.pageY
})
setInterval(draw,1000/60);