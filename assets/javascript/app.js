$(document).ready(function(){
    //Global variables
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var questions = 7;
    var seconds = 90;
    var timing;

    //Game functions

    //This function takes no arguments, and starts the game and the timer
    function startGame(){
        $("#start-form").hide();
        $("#game-form").show();
        $("#time-remaining").text(seconds.toString()+" Seconds");
        timing = setInterval(gameTimer, 1000);
    }

    //This function takes no arguments, and operates the timer until it reaches 0
    function gameTimer(){
        seconds--;
        $("#time-remaining").text(seconds.toString()+" Seconds");
        if (seconds == 0){
            gameOver();
        }
    }

    //This function takes no arguments, and calculates how you did in the game and shows a summary of your results
    function gameOver(){
        timing = clearInterval(timing);
        $("#game-form").hide();
        for (var i = 1; i <= questions; i++){
            var question = "q"+i; //Used to loop through radio button selections and match with correct answers
            if ($("input[type='radio'][name='q"+i+"']:checked").length > 0){ //question is answered
                if ($("input[name='"+question+"']:checked").val() == $("."+question).attr("data-value")){
                    correct++;
                }
                else{
                    incorrect++;
                }
            }
            else{ //question is unanswered
                unanswered++;
            }
        };
        $(".game-summary").show();
        $("#correct").text(correct);
        $("#incorrect").text(incorrect);
        $("#unanswered").text(unanswered);
    }

    //The rest of the js code, including event listeners
    $("#game-form").hide();
    $(".game-summary").hide();

    $("#start").on("click", function(event){
        event.preventDefault();
        startGame();
    });

    $("#done").on("click", function(event){
        event.preventDefault();
        gameOver();
    });
});