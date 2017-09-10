 var intervalId;

  var game ={
  
  timer : 30,
  orangeWarning: 15,
  redWarning: 5,
  correct: 0,
  incorrect: 0,
  notAnswered: 0,
  answerSheet: ['a', 'b', 'c', 'c'],
  winTest: 'none',
  
  
  runTime: function () {

        intervalId = setInterval(this.decrement, 1000);
  },

  decrement: function () {

    game.timer--;

    // THIS LOGIC CHANGES THE COLOR OF TIME LETFT TO ORANGE THEN RED.

      if(game.timer == game.orangeWarning){
         $(".Sec").attr("style", "color: orange;");
      }
      if(game.timer == game.redWarning){
         $(".Sec").attr("style", "color: red;");
      }
    //--------------------------------------------------------------

    $(".Sec").html("<strong>"+game.timer+"</strong>");

    if (game.timer === 0) {

      game.stop();

      game.calculateScore();
    }
  },

  stop: function () {
    clearInterval(intervalId);
  },

  start: function(){
    $(".score").hide();
    $(".startButton").show();
    $(".quizContent").hide();
    $(".timeRemaining").hide();

    $(".startButton").on("click", function(){
      $(".startButton").hide();
      $(".quizContent").show();
      $(".Sec").attr("style","color: initial");
      $(".Sec").html("<strong>"+game.timer+"</strong>");
      $(".timeRemaining").show();
      game.stop();
      game.timer = 30;
      game.runTime();
    })
  },

  calculateScore: function(){
    $(".quizContent").hide();
    $(".timeRemaining").hide();
    
    var questionArray = ['answer1', 'answer2', 'answer3', 'answer4'];
    var answerArray = [];

        for (var i = 0; i < questionArray.length; i++) {

            var questionAnswers = document.getElementsByName(questionArray[i]);

            var isAnswered = false;

            for (var j = 0; j < questionAnswers.length; j++) {
                // FIND SELECT ANSWER
                if (questionAnswers[j].checked) {
                    answerArray.push(questionAnswers[j].value);
                    isAnswered = true;  
                }
            }
            // NOT ANSWERD
            if (isAnswered === false) {
                answerArray.push('none');
            }
        }
        //POPULATE VARIABLES
        for (var k = 0; k < answerArray.length; k++) {
            if (answerArray[k] === 'none') {
                this.notAnswered++;
            }
            else if (answerArray[k] === this.answerSheet[k]) {
                this.correct++;
            }
            else {
                this.incorrect++;
            }
        }

        game.showScore();
    
 },
    
  showScore: function(){
    $(".score").show();
    $(".correct").text(game.correct);
    $(".incorrect").text(game.incorrect);
    $(".notAnswered").text(game.notAnswered);

    $(".restartButton").on("click", function(){

      game.stop();
      game.correct = 0;
      game.incorrect = 0;
      game.notAnswered = 0;
      winTest = 'none';

      $('input[name="answer1"]').prop('checked', false);
      $('input[name="answer2"]').prop('checked', false);
      $('input[name="answer3"]').prop('checked', false);
      $('input[name="answer4"]').prop('checked', false);

      game.start();



    });
  },



};
    game.start();

$(".submitButton").on('click', function () {
  game.winTest = 'submitted';
  game.calculateScore();
});