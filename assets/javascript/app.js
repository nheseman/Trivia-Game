
$(document).ready(function () {
    var options = [
        {
            question: "Which MCU villian did not use an Infinity Stone in their plot?", 
            choice: ["Loki", "Thanos", "Helmut Zemo", "Ronan the Accuser"],
            answer: 2,
            photo: "assets/images/Zemo.gif"
         },
         {
            question: "What character has NOT been played by multiple actors in the MCU?", 
            choice: ["Hulk", "Warmachine", "Red Skull", "Spiderman"],
            answer: 3,
            photo: "assets/images/spiderman.gif"
         }, 
         {
             question: "On what continent is the kingdom of Wakanda located?", 
            choice: ["Asia", "Europe", "Africa", "Australia" ],
            answer: 2,
            photo: "assets/images/wakandafe.gif"
        }, 
        {
            question: "What legendary comic creator appears in all of the Marvel Cinematic Universe films?", 
            choice: ["Steve Ditko", "Jack Kirby", "Frank Miller", "Stan Lee" ],
            answer: 3,
            photo: "assets/images/stan_lee.gif"
        }, 
        {
            question: "Thor's hammer Mjolnir is made of metal from the heart of a what?", 
            choice: ["Black Hole", "Comet", "Star", "Planet" ],
            answer: 2,
            photo: "assets/images/mjolnir.gif"
        }, 
        {
            question: "What item did Tony Stark bring Pepper Potts as a gift, forgetting that she is severely allergic to it?", 
            choice: ["Grapes", "Peaches", "Strawberries", "Honey" ],
            answer: 2,
            photo: "assets/images/pepper.gif"
        }, 
        {
            question: "What is the first name of Peter Quill aka Star Lord's mother ?", 
            choice: ["Margot", "Mary", "Maureen", "Meredith" ],
            answer: 3,
            photo: "assets/images/meredith.gif"
        }, 
        {
            question: "Which of these is not a name Rocket Racoon has been called?", 
            choice: ["Blood-Thirsty badger", "Trash Panda", "Creepy Little Beast", "Triangle-faced Monkey" ],
            answer: 0,
            photo: "assets/images/trash_panda.gif"
        }, 
        {
            question: "What is the wifi password at the temple Kamar-Taj?", 
            choice: ["Nirvana", "Shamballa", "Agamotto", "Karma" ],
            answer: 1,
            photo: "assets/images/kamar-taj.gif"
        }, 
        {
            question: "Which S.H.I.E.L.D. member's code name is Agent 13?", 
            choice: ["Sharon Carter", "Maria Hill", "Brock Rumlow", "Phil Coulson" ],
            answer: 0,
            photo: "assets/images/agent13.gif"
        }, 
        {
            question: "What was the name of the villian in Ant-Man?", 
            choice: ["Wasp", "Hornet", "Yellow Jacket", "Stinger" ],
            answer: 2,
            photo: "assets/images/yellowjacket.gif"
        }, 
        {
            question: "What food did the team eat in the post-credit scenes of The Avengers?", 
            choice: ["Gyros", "Falafel", "Shwarma", "Kebobs" ],
            answer: 2,
            photo: "assets/images/shwarma.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 11;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //start button
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

    //start timer
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    //timer 
    function decrement() {
        timer --;
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        
            
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //stop timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
        function displayQuestion() {
  
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
  
            $("#questions").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answers").append(userChoice);
        }
    
    
    

    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
           
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answers").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answers").html("<p>Incorrect, the answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answers").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answers").empty();
            timer= 11;
    
        //score counter
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questions").empty();
            $("#questions").html("<h3>Game Over!  See How Much You Know About Marvel Movies: </h3>");
            $("#answers").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answers").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2500);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })