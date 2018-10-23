window.onload = function() {
    // declare email address and survey number
    var email = "jf@bose.com";
    var survey = "apex-survey";

    // declare variables based on html elements
    var panel01 = document.getElementById("panel-01");
    var panel01Skip = document.getElementById("panel-01-skip");
    var panel01Next = document.getElementById("panel-01-next");
    var panel02 = document.getElementById("panel-02");
    var panel02Back = document.getElementById("panel-02-back");
    var panel02Skip = document.getElementById("panel-02-skip");
    var panel02Next = document.getElementById("panel-02-next");
    var panel03 = document.getElementById("panel-03");
    var panel03Back = document.getElementById("panel-03-back");
    var panel03Skip = document.getElementById("panel-03-skip");
    var panel03Submit = document.getElementById("panel-03-submit");
    var radios = document.forms["surveyForm"].elements["q1"];
    var activities = document.forms["surveyForm"].elements["q2"];
    var enjoyments = document.forms["surveyForm"].elements["q3"];

    // declare questions
    var questions = [
        "How comfortable are you using virtual assistants (like Alexa, Siri or Google Assistant)?",
        "What activities do you do while listening to music?",
        "Who do you enjoy listening to music with?"
    ];
    // declare answers
    var answers1 = {};
    var answers2 = [];
    var answers3 = [];

    for (var radio in radios) {
        radios[radio].onchange = function() {
            answers1 = { question: questions[0], answer: this.value };
            panel01Next.style.opacity = "1";
            panel01Next.addEventListener("click", function() {
                // hide panel01 and show panel02
                panel01.style.zIndex = "9";
            });
        };
    }

    function enablePanel02() {
        // hide panel01 and show panel02
        panel01.style.zIndex = "9";
    }

    // answers2 sets the value of the selection(s)
    function enablePanel03() {
        // hide panel02 and show panel03
        panel02.style.zIndex = "8";
    }

    // answers3 sets the value of the selection(s)

    function submitForm() {
        // declare empty data array
        var data = [];
        // push answers1 to data as it uses a different method than checkbox
        data.push(answers1);

        // combine answers from all panels into data
        function combineAnswers(question, answers) {
            for (a in answers) {
                let z = { question, answer: answers[a] };
                data.push(z);
            }
        }
        combineAnswers(questions[1], answers2);
        combineAnswers(questions[2], answers3);

        // build final answers object
        var finalAnswers = { email, data };
        // jsonify finalAnswers into surveyData
        let surveyData = JSON.stringify(finalAnswers);
        // check the object in console
        console.log(surveyData);
        // display thank you view
        panel03.style.zIndex = "7";
    }

    function addMultipleChoice(name, obj, action, func) {
        for (var n in name) {
            name[n].onchange = function() {
                if (this.checked) {
                    obj[this.id] = this.value;
                } else {
                    delete obj[this.id];
                }
                var size = Object.keys(obj).length;
                if (size >= 1) {
                    action.style.opacity = "1";
                    action.addEventListener("click", func);
                } else if (size == 0) {
                    action.style.opacity = "0.5";
                    action.removeEventListener("click", func);
                }
            };
        }
    }

    addMultipleChoice(activities, answers2, panel02Next, enablePanel03);
    addMultipleChoice(enjoyments, answers3, panel03Submit, submitForm);

    // skip buttons
    panel01Skip.addEventListener("click", function() {
        panel01.style.zIndex = "9";
    });
    panel02Skip.addEventListener("click", function() {
        panel02.style.zIndex = "8";
    });
    panel03Skip.addEventListener("click", function() {
        // submit form
        submitForm();
        panel03.style.zIndex = "7";
    });

    // back buttons
    panel02Back.addEventListener("click", function() {
        panel01.style.zIndex = "40";
    });
    panel03Back.addEventListener("click", function() {
        panel02.style.zIndex = "30";
    });
};
