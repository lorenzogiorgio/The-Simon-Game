

var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;


$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function checkAnswer(currentLevel){  //Game patter = lastUserClicked)

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){ //checking if the user has finish the sequence

          setTimeout(function () {
            nextSequence();
          }, 1000);

      }
  }
  else{                             //else (console.log("Wrong"))
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

$(document).keypress(function(){ //Use jQuery to detect when a keyboard key has been pressed
  if (!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()* 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour); //add the color to the array sequence

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Flash the button

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3"); //Creating a sounds when the function starts
  audio.play();

};


function playSound(name){ //Manual Override play a sound from a color mentioned.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};



function animatePress(currentColor){ //Manual animate override for console

  $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

};
