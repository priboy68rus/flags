const select_quiz_region = document.querySelector("#select-quiz-region");
const flag_radio = document.querySelector("#flag-radio");
const question_card = document.querySelector(".question-card");
const answer_cards = document.querySelectorAll(".card");
const info = document.querySelector("#info");
const answers_container = document.querySelector(".answers-container");

window.onload = function() {
    start_new_quiz();

    for (var i = 0; i < answer_cards.length; i++) {
        answer_cards[i].addEventListener("click", (e) => {
            e.preventDefault();
            j = parseInt(e.currentTarget.id.slice(3));

            if (window.quiz != null) {
                check_answer(j);
            }
        });
    }
}


document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    start_new_quiz();
});

function check_answer(j) {
    var correct = window.quiz.check_ans(j);

    if (correct) {
        //correct animantion    
        console.log("correct");
    } else {
        //wrong animation
    }
    update_info(correct);

    fill_cards();

}


function start_new_quiz() {
    var answer_type = "";
    var region = select_quiz_region.value;

    if (flag_radio.checked) {
        answer_type = "flag";
    } else {
        answer_type = "country";
    }
    window.quiz = new Quiz(region, answer_type); 
    
    fill_cards();
    update_info(true);
}

function fill_cards() {
    if (window.quiz.get_question() == null) {
        question_card.innerHTML = "<p>Your score: " + window.quiz.score + "</p>";

        answers_container.style.display = "none";

        return;
    }
        
    q = window.quiz.get_question();
    question_card.innerHTML = img_or_text(q["question"]);
    for (var i = 0; i < answer_cards.length; i++) {
        answer_cards[i].innerHTML = img_or_text(q["answers"][i]);
    }
    answers_container.style.display = "block";
}

function img_or_text(content) {
    if (content.length > 2) {
        return content;
    } else {
        return "<img src=\"flags/" + content.toLowerCase() + ".png\"></img>"
    }
}

function update_info(correct) {
    info.textContent = "quiz " + window.quiz.current_question.toString() + "/" + window.quiz.length + " score: " + window.quiz.score.toString();

    if (correct) {
        info.style.color = "green";
    } else {
        info.style.color = "red";
    }
}