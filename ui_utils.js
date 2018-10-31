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

function img_or_text(content) {
    if (content.length > 2) {
        return "<p>" + content + "</p>";
    } else {
        return "<img src=\"flags/" + content.toLowerCase() + ".png\"></img>"
    }
}