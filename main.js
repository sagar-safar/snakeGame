const squares = document.querySelectorAll('.grid div');






let snakeBody = [10,11,12]
let snakeDir = 1;
let HeadPos = 12;
let foodPos = 18;

squares[foodPos].classList.add('food')

for(let i=0;i<snakeBody.length;i++){
    squares[snakeBody[i]].classList.add('snake');
}


function control(e){
    
    if(e.keyCode===38){
       
        if(snakeDir!==10){
            snakeDir = -10
            moveUp()


        }

       
    }

    else if(e.keyCode===40){
        if(snakeDir!==-10){
            snakeDir = 10
            moveDown()


        }
        
        
    }
    else if(e.keyCode===39){
        if(snakeDir!==-1){
            snakeDir = 1
            moveRight()


        }
        

       
    }
    else if(e.keyCode===37){
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
        return -1
    }

    let foodEaten = foodEat(); 
    if(foodEaten){
        HeadPos += snakeDir;
        snakeBody.push(HeadPos);
        squares[HeadPos].classList.add('snake')

    }
    



    else{
        squares[snakeBody[0]].classList.remove('snake')
        snakeBody.splice(0,1);
        HeadPos += snakeDir;
        snakeBody.push(HeadPos);
        squares[HeadPos].classList.add('snake')
        }
}


let moveId = setInterval(move,1000);




function foodEat(){
    
       
        if(HeadPos+snakeDir===foodPos){
           
            squares[foodPos].classList.remove('food')
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
        squares[foodPos].classList.add('food')
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