const squares = document.querySelectorAll('.grid div');




let gameStatus = false;

let snakeBody = [10,11,12]
let snakeDir = 1;
let HeadPos = 12;
let foodPos = 18;
let score = 0;


squares[foodPos].innerHTML = `<img src="./straw.jpg" alt="">`
squares[HeadPos].classList.add('snake-head')



for(let i=0;i<snakeBody.length;i++){
    squares[snakeBody[i]].classList.add('snake');
}


function control(e){
    
    if(e.keyCode===38 && gameStatus===false){
       
        if(snakeDir!==10){
            snakeDir = -10
            moveUp()


        }

       
    }

    else if(e.keyCode===40  && gameStatus===false){
        if(snakeDir!==-10){
            snakeDir = 10
            moveDown()


        }
        
        
    }
    else if(e.keyCode===39  && gameStatus===false){
        if(snakeDir!==-1){
            snakeDir = 1
            moveRight()


        }
        

       
    }
    else if(e.keyCode===37  && gameStatus===false){
        if(snakeDir!==1){
            snakeDir = -1
            moveLeft()


        }
        
        
    }

}

function moveUp(){
    move()


}
function moveDown(){
    move()


}
function moveRight(){
    move()


}
function moveLeft(){
    move()


}



document.addEventListener('keyup',control)



function move(){

    let collison = collisonDetection(); 
    if(collison){
        gameStatus = true;
        document.querySelector('h2').textContent = "Game Over"
        document.querySelector('.grid').style = "border: 3px solid red;"
        console.log("color-changed");
        squares[HeadPos].style = "background-color:red"
        return -1
    }

    let foodEaten = foodEat(); 
    if(foodEaten){
        score += 1;
        document.querySelector('h3').textContent = `Score: ${score}`
        squares[HeadPos].classList.remove('snake-head')
        HeadPos += snakeDir;
        snakeBody.push(HeadPos);
        squares[HeadPos].classList.add('snake')
        squares[HeadPos].classList.add('snake-head')

    }
    



    else{
        squares[snakeBody[0]].classList.remove('snake')
        squares[HeadPos].classList.remove('snake-head')
        snakeBody.splice(0,1);
        HeadPos += snakeDir;
        snakeBody.push(HeadPos);
        squares[HeadPos].classList.add('snake')
        squares[HeadPos].classList.add('snake-head')
        }
}


let moveId = setInterval(move,1000);




function foodEat(){
    
       
        if(HeadPos+snakeDir===foodPos){
           
            
            squares[foodPos].innerHTML=""
            foodGen()

            
            
            return true
        }
        else{
            return false
        }
       

       

   

}


function foodGen(){
    foodPos = parseInt(Math.random()*200)
    if(snakeBody.includes(foodPos)){
        foodGen()
    }
    else{
        
        squares[foodPos].innerHTML=`<img src="./straw.jpg" alt="">`;
    }
}


function collisonDetection(){

    if(snakeBody.includes(HeadPos+snakeDir)){
        console.log("collisoon",HeadPos);
        clearInterval(moveId)
        return true


    }
    if(HeadPos>=0 && HeadPos<=9 && snakeDir===-10){
        console.log("collisoon",HeadPos);
        clearInterval(moveId)
        return true



    }
    
    else if(HeadPos>=9 && HeadPos<=199 && snakeDir===1 && (HeadPos-9)%10===0){
        console.log("collisoon",HeadPos);

        clearInterval(moveId)
        return true


    }
    
    else if(HeadPos>=190 && HeadPos<=199 && snakeDir===10){
        console.log("collisoon",HeadPos);
        clearInterval(moveId)
        return true


    }
    
    else if(HeadPos>=0 && HeadPos<=190 && snakeDir===-1 && HeadPos%10===0){
        console.log("collisoon",HeadPos);
        clearInterval(moveId)

        return true


    }

    return false
}