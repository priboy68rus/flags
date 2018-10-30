const select_quiz_region = document.querySelector("#select-quiz-region");
const flag_radio = document.querySelector("#flag-radio");
const question_card = document.querySelector(".question-card");
const answer_cards = document.querySelectorAll(".card");
const info = document.querySelector("#info");
const answers_container = document.querySelector(".answers-container");

const grey = "rgb(247, 247, 247)";
const green = "rgb(157, 247, 139)";
const red = "rgb(247, 139, 139)";

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
    var ans = window.quiz.check_ans(j);

    update_info(ans[0], j, ans[1]);
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
    
    update_info(true, -1);
    fill_cards();
}

function fill_cards() {
    set_cards_grey();
    enable_cards();

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

function update_info(correct, j, correct_j) {
    info.textContent = "quiz " + window.quiz.current_question.toString() + "/" + window.quiz.length + " score: " + window.quiz.score.toString();

    disable_cards();
    if (j >= 0) {
        if (correct) {
            answer_cards[j].style.backgroundColor = green;
            info.style.color = green;
            setTimeout(fill_cards, 700);
        } else {
            answer_cards[j].style.backgroundColor = red;
            info.style.color = red;
            setTimeout(fill_cards, 1000);
            setTimeout(set_correct, 400, correct_j);
        }
    }
}

function set_correct(j) {
    answer_cards[j].style.backgroundColor = green;
}

function set_cards_grey() {
    for (var i = 0; i < answer_cards.length; i++) {
        answer_cards[i].style.backgroundColor = grey;
    }
}

function disable_cards() {
    for (var i = 0; i < answer_cards.length; i++) {
        answer_cards[i].classList.add('disabled-click');
    }
}

function enable_cards() {
    for (var i = 0; i < answer_cards.length; i++) {
        answer_cards[i].classList.remove('disabled-click');
    }
}