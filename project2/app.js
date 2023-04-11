const canvas=document.getElementById("myCanvas");
const ctx=canvas.getContext("2d");
const button=document.getElementById("start");
const unit=20;
const row=canvas.height/unit;
const column=canvas.width/unit;
let score=0,highestscore=0; 
document.getElementById("score").innerHTML="score:"+score; 
let d,speed=100;
let snake=[];
function speedchange(event){
    if(event.key=="o"){clearInterval(mygame);speed+=20;mygame=setInterval(draw,speed);console.log("slower");}
    if(event.key=="p"){clearInterval(mygame);speed-=20;mygame=setInterval(draw,speed);console.log("faster");}
}
class fruit{
    constructor(){
        this.x=Math.floor(Math.random()*16)*unit;
        this.y=Math.floor(Math.random()*16)*unit;
    }
    drawfruit(){
        ctx.fillStyle="yellow";
        ctx.fillRect(this.x,this.y,unit,unit);
    }
    overlapping(x,y){
        for(let i=0;i<snake.length;i++){
            if(x == snake[i].x && y == snake[i].y)return true;
        }
        return false;
    }
    relocate(){
        do{
            this.x=Math.floor(Math.random()*16)*unit;
            this.y=Math.floor(Math.random()*16)*unit;
        }while(this.overlapping(this.x,this.y));
        this.drawfruit();
    }
}
let myfruit=new fruit;
snake[0]={
    x:Math.floor(Math.random()*16)*unit,
    y:Math.floor(Math.random()*16)*unit,
};
function changedirection(event){
    if(event.key=="g"){
        button.click();
    }
    if((event.key=="a" ||event.key=="ArrowLeft") && d!="right")d="left";
    else if((event.key=="s" ||event.key=="ArrowDown")&& d!="up")d="down";
    else if((event.key=="w" ||event.key=="ArrowUp")&& d!="down")d="up";
    else if((event.key=="d" ||event.key=="ArrowRight")&& d!="left")d="right";
    removeEventListener('keydown',changedirection);
}
function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    myfruit.drawfruit();
    for (let i = 0;i<snake.length;i++){
        if(i==0)ctx.fillStyle="lightblue";
        else ctx.fillStyle="lightyellow";
        ctx.strokeStyle = "red";
        if(snake[i].x>=canvas.width){
            snake[i].x=0;
        }
        if(snake[i].x<0){
            snake[i].x=canvas.width-unit;
        }
        if(snake[i].y<0){
            snake[i].y=canvas.height-unit;
        }
        if(snake[i].y>=canvas.height){
            snake[i].y=0;
        }
    ctx.fillRect(snake[i].x,snake[i].y,unit,unit);
    ctx.strokeRect(snake[i].x,snake[i].y,unit,unit);
}
    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    if(d=='left'){
        snakeX-=unit;
    }
    else if(d=='up'){
        snakeY-=unit;
    }
    else if(d=='down'){
        snakeY+=unit;
    }
    else if(d=='right'){
        snakeX+=unit;
    }
    let newhead={
        x:snakeX,
        y:snakeY,
    };
    if(myfruit.x==newhead.x && myfruit.y==newhead.y){
        myfruit.relocate();
        score+=10;
        document.getElementById("score").innerHTML="score:"+score;  
    }
    else{
    snake.pop();
}
    snake.unshift(newhead);
    for(let i=1;i<snake.length;i++){
        if(newhead.x==snake[i].x && newhead.y==snake[i].y){
            clearInterval(mygame);
            score2=score;
            for(let j=0;j<10;j++){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < snake.length; i++) {
                let dx = (Math.random() - 0.5) * 10;
                let dy = (Math.random() - 0.5) * 10;
                snake[i].x += dx;
                snake[i].y += dy;
                ctx.fillStyle = "lightyellow";
                if(i==0)ctx.fillStyle = "lightblue";
                ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
              }
              setTimeout(() => {
                
              }, 700);
            }
            
        }
    }
    addEventListener('keydown',changedirection);
}
addEventListener("keydown",changedirection);
addEventListener("keydown",speedchange);
let mygame=setInterval(draw,speed);
