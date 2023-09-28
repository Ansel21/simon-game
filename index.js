var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})
$(".btn").on("click",function(){
    
    var val = $(this).attr("id");
    userClickedPattern.push(val);
    
    addSounds(val);
    //need to add function
    animatePress(val);
    checkAnswer(userClickedPattern.length-1);

})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
   var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  addSounds(randomChosenColour);
}
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();

        },1000);
    }
}
else{
    addSounds("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to restart");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    startOver();
}
}
function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
function addSounds(randomChosenColour){
    var sound = new Audio("sounds/"+randomChosenColour+".mp3");
    sound.play();
}
function animatePress(randomChosenColour){
    //need to include the working of animation
    $("#"+randomChosenColour).addClass("pressed");
setTimeout(function(){
    $("#"+randomChosenColour).removeClass("pressed");
    },100)
}