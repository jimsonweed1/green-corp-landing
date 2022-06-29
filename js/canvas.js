const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 200;

function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
}

class Bubble {
    constructor(canvas) {
        this.canvas=canvas;
        this.getCanvasSize();
        this.init();
    }
  
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
  
    init() {
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = generateDecimalBetween(1,3);
        this.alpha = generateDecimalBetween(5,10)/10;
        this.translateX = generateDecimalBetween(0, this.canvasWidth);
        this.translateY = generateDecimalBetween(0, this.canvasHeight);
        this.velocity = generateDecimalBetween(20, 40);
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }   
  
    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx=this.canvas.getContext('2d');
        this.dpr=window.devicePixelRatio;
    }
  
    canvasSize(){
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr,this.dpr);
    }
    generateBubbles(){
        this.bubblesList=[];
        for (let i=0;i<BUBBLE_DENSITY;i++){
            this.bubblesList.push(new Bubble(this.canvas))
        }
    }
    animate(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        this.bubblesList.forEach(element => {
            element.move();
            this.ctx.translate(element.translateX,element.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0,0,element.size,0,360);
            this.ctx.fillStyle = (`rgba(${element.color},${element.alpha})`);
            this.ctx.fill();
            this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0)
        });
        requestAnimationFrame(this.animate.bind(this));
    }
    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();        
    }
}
const canvas = new CanvasBackground('orb-canvas');
canvas.start();