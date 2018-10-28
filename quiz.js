function Quiz(region, answer_type) {
    this.region = region;
    this.answer_type = answer_type;
    this.answer_count = 4;
    this.questions = get_questions(this.region, this.answer_type, this.answer_count);
    this.current_question = 0;
    this.score = 0;
    this.length = this.questions.length;

    //----------------------------------------

    this.go_next = function() {
        this.current_question++;   
    }

    this.get_question = function() {
        if (this.current_question >= this.questions.length) {
            return undefined;
        }
        return this.questions[this.current_question];
    }

    this.check_ans = function(i) {
        var correct_j = -1;
        for (var j = 0; j < this.answer_count; j++) {
            if (this.questions[this.current_question]["answers"][j] == this.questions[this.current_question]["correct"]) {
                correct_j = j;
            }
        }
        if (this.questions[this.current_question]["answers"][i] == this.questions[this.current_question]["correct"]) {
            this.go_next();
            this.score++;
            return [true, correct_j];
        } else {
            this.go_next();
            return [false, correct_j];
        }
    }

    //----------------------------------------

    function get_questions(region, answer_type, answer_count) {
        var questions = prepare_questions(region, answer_count);

        q = [];
        var t;
        for (var i = 0; i < questions.length; i++) {
            t = {
                "flag": [],
                "country": []
            };
            t["flag"].push(questions[i]["correct"]["short"]);
            t["country"].push(questions[i]["correct"]["country"]);
            for (var j = 0; j < questions[i]["wrong"].length; j++) {
                t["flag"].push(questions[i]["wrong"][j]["short"]);
                t["country"].push(questions[i]["wrong"][j]["country"]);
            }
            shuffle(t["flag"]);
            shuffle(t["country"]);


            if (answer_type == "flag") {
                q.push({
                    "question": questions[i]["correct"]["country"],
                    "answers": t["flag"],
                    "correct": questions[i]["correct"]["short"]
                });
            } else {
                q.push({
                    "question": questions[i]["correct"]["short"],
                    "answers": t["country"],
                    "correct": questions[i]["correct"]["country"]

                });
            }
            
        }

        return q;
    }

    function prepare_questions(region, answers_count) {
        const countries = get_countries_by_region(region);
        shuffle(countries);

        var questions = [];
        for (i = 0; i < countries.length; i++) {
            questions.push(
                {
                    "correct": countries[i],
                    "wrong": pick_wrong_answers(countries, countries[i], answers_count - 1)
                }
            );
        }
        return questions;
    }

    function get_countries_by_region(region) {
        if (region == "world") {
            return data;
        }

        resp = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].region == region) {
                resp.push(data[i]);
            }
        }
        return resp;
    }

   

    function pick_wrong_answers(countries, correct_country, count) {
        c = countries.slice();

        shuffle(c);
        var i = 0;
        var j = 0;
        ret = [];
        do {
            if (c[i] != correct_country) {
                ret.push(c[i]);
                j++;
            }
            i++;
        } while (j < count);

        return ret;
    }

    

}