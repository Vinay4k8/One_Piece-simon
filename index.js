
let userClickedPattern = []
const buttonCharac = ["luffy", "sanji", "shanks", "zoro"]
let gamePattern = []
let started = false;
let level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + (level));
        nextSequence();
        started = true;
    }
});
$(".btn").click((e) => {
    let chara = $(e.currentTarget).attr("id");
    userClickedPattern.push(chara)
    let elem = e.currentTarget
    elem.classList.add("pressed")
    setTimeout(() => {
        elem.classList.remove("pressed")
    }, 100)
    play(chara)
    checkAnswer(userClickedPattern.length - 1);
})
const startGame=()=>{
    if (!started) {
        $("#level-title").text("Level " + (level));
        nextSequence();
        started = true;
    }
}
const play = async (a) => {
    var audio = new Audio(`sounds/${a}.mp3`);
    await audio.play();
}
const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("1st if")
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 500)
            console.log("userClicked", userClickedPattern)
            console.log(gamePattern)
        }
    }
    else {
        play("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        startOver()
    }
}

let nextSequence = async () => {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenCharac = buttonCharac[randomNumber]
    gamePattern.push(randomChosenCharac)
    let target = $("#" + randomChosenCharac)
    target.fadeIn(200).fadeOut(200).fadeIn(200)
    await play(randomChosenCharac)
    console.log(gamePattern)
}
const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}
