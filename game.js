//VARIABLES:

//Arreglos vacios inicialmente
var gamePattern = [];
var userClickedPattern = [];

//Arreglo de colores
var buttonColors = ["red", "blue", "green", "yellow"];

//contador de teclas presionadas.
var level = 0;
var initializer = 0;  //para empezar juego
var counter = 0; //contador de clicks


//BODY:

//cuando se hace click en un boton, lo detecta / crea una animacion / le da un sonido / agrega al arreglo userClickedPattern el id clickeado
$(".btn").click(function(){
    var colorId = $(this).attr("id");
    var userColorId = "#"+colorId
    clickColorGenerator(colorId,userColorId);
    checkAnswer(colorId,userColorId);
    return console.log("click "+userClickedPattern);});


$(document).keydown(function () {
    if(initializer === 0){ 
        nextSequence(initializer);
        console.log("se llamo una ves por la tecla");
        initializer++;
    }
    else if (initializer>0){
        console.log("Reset game por picar de mas una tecla");
        resetGame();
    }
    
});    


//FUNCIONES:

//Generador de numero entero del 0 al 3/ cambia el numero en un color/ acomoda el color con push en un arreglo "gamePattern"
function nextSequence(level){
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var colorClickedId = "#"+randomChosenColor;
    colorAnimationRandom(colorClickedId);
    soundGenerator(colorClickedId);
    userClickedPattern = [];
    console.log("random: "+gamePattern);

return randomChosenColor;
}

//Al color con id seleccionado le genera una animacion para el generador random
function colorAnimationRandom(event){
    $(event).fadeOut(200).fadeIn(200);
    //console.log("color: "+event);
    
}

// Al color con id seleccionado le genera un sonido
function soundGenerator(name){
    
    switch (name) {
        case "#red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "#blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "#green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "#yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
    
        default:
            break;
    }
}

//Animacion al hacer click en un boton.
function animatePress(event){
    var currentColor = $(event).addClass("pressed");
    setTimeout(function(){currentColor; currentColor.removeClass("pressed");
        
    }, 100);    
}

//funcion de reset, animacion color back ground, cambia h1, resetea initializer y arrays y añade sonido de error
function resetGame(){
    initializer = 0;
    level = 0;
    counter = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Press a Key to Start");

    var currentColor = $("body").addClass("game-over");
    setTimeout(function(){currentColor; currentColor.removeClass("game-over");
        
    }, 100);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();


}

function clickColorGenerator(colorId,userColorId){
    userClickedPattern.push(colorId);
    soundGenerator(userColorId);
    animatePress(userColorId);
}

//Revisa el patron de arreglo del juego y genera gameover si falla o le pica de mas a botones.
function checkAnswer(){

        if(gamePattern[counter] === userClickedPattern[counter]){
            counter++;
            console.log("va "+counter," bien");
            if(counter === gamePattern.length){
                level++
                nextSequence(level);
                counter = 0;
            }
            return console.log("Va: " +counter ,"ves");
        }
        else if(gamePattern[counter] != userClickedPattern[counter]){
            console.log("Reset por error de picar botones de mas"); //el reset es regresar todo a cero, level, arrays e initializer y poner animacion pantalla roja y poner h1 en letrero de tecla
            resetGame();
        }
        else{
            console.log("algo esta fallando con el if o reset normal");
            resetGame();  
        } 
    
}