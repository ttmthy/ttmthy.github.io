function displayQuiz() {
    const questions = [
        {
            question: "Bạn đang cày deadline, bỗng con mèo cướp lấy cái bút của bạn. Bạn đuổi theo và bắt gặp một cánh cửa không gian. Bạn sẽ làm gì?",
            choices: [
                "Bạn tò mò chạm vào cánh cửa",
                "Bạn nghi ngờ và quan sát xung quanh"
            ],
            weights: [
                { adventurerScore: +3, creatorScore: +2, socializerScore: +1 },
                { thinkerScore: +3, achieverScore: +2, leaderScore: +1 }
            ]
        },
        {
            question: "Cánh cửa bỗng mở ra và hút bạn vào không gian khác lạ. Ở đấy bạn gặp một con thú bông phù thủy. Bạn sẽ làm gì?",
            choices: [
                "Bạn chủ động bắt chuyện và hỏi về tình huống của mình",
                "Bạn thấy chúng quá dễ thương và lao vào ôm trước đã",
                "Bạn im lặng quan sát"
            ],
            weights: [
                { leaderScore: +3, socializerScore: +2, thinkerScore: +1 },
                { peacemakerScore: +3, supporterScore: +2, socializerScore: +1 },
                { thinkerScore: +3, achieverScore: +2, adventurerScore: +1 }
            ]
        },
        {
            question: "Thú bông phù thủy bỗng dưng hóa phép bạn biến thành chiếc áo cũ và biến mất. Bạn cố tìm sự giúp đỡ và gặp Doggie. Doggie nhận ra bạn và đưa bạn đến gặp Queen, Queen hứa sẽ tặng bạn một hình hài phù hợp với điều kiện: cứu Greenie khỏi phù thủy. Bạn chấp nhận nhiệm vụ và lên đường.",
            choices: [
                "Bạn lập kế hoạch giải cứu Greenie trước khi khởi hành",
                "Bạn lập tức lên đường cùng sự giúp đỡ của mọi người xung quanh"
            ],
            weights: [
                { thinkerScore: +3, leaderScore: +2, achieverScore: +1 },
                { adventurerScore: +3, socializerScore: +2, supporterScore: +1 }
            ]
        },
        {
            question: "Trên đường bạn bắt gặp một con ếch nhỏ đang kêu cứu, chú đang bị mắc kẹt dưới một tảng đá.",
            choices: [
                "Bạn lưỡng lự một lúc, phòng chừng đó là bẫy của phù thủy",
                "Bạn lập tức đến giải cứu chú ếch",
                "Bạn cười một hồi vì trông chú ếch kêu quá buồn cười",
                "Bạn tranh cãi với Doggie đấy là ếch hay bọ chét"
            ],
            weights: [
                { thinkerScore: +3, achieverScore: +2 },
                { peacemakerScore: +3, supporterScore: +3, achieverScore: +1 },
                { adventurerScore: +2, socializerScore: +2 },
                { creatorScore: +3, thinkerScore: +1 }
            ]
        },
        {
            question: "Khi bạn giải cứu chú ếch tên Eggy, chú ếch trả ơn bằng cách hóa thành vũ khí cho bạn. Bạn chọn:",
            choices: [
                "Cây kiếm",
                "Cây trượng",
                "Cây đao",
                "Cung tên"
            ],
            weights: [
                { leaderScore: +2, achieverScore: +2 },
                { creatorScore: +3, thinkerScore: +1 },
                { adventurerScore: +3, socializerScore: +1 },
                { supporterScore: +2, peacemakerScore: +2 }
            ]
        },
        {
            question: "Trước khi bạn kịp lựa chọn thì bạn, Doggie và Eggy bị teleport đến địa phận của phù thủy. Đó là Greenie đã lén vận chuyển họ tới. Phù thủy thấy vậy, chuẩn bị tung chiêu nhắm vào Greenie.",
            choices: [
                "Bạn vớ lấy Eggy ném thẳng vào đầu phù thủy",
                "Bạn hô hoán, gắng đánh lạc hướng phù thủy và yêu cầu Doggie đánh lén",
                "Bạn lao vào đỡ lấy cho Greenie"
            ],
            weights: [
                { adventurerScore: +3, creatorScore: +2 },
                { leaderScore: +3, thinkerScore: +2, socializerScore: +1 },
                { supporterScore: +3, peacemakerScore: +3, achieverScore: +1 }
            ]
        }
    ];

    // Variables for scores
    let currentQuestionIndex = 0;
    let adventurerScore = 0;
    let creatorScore = 0;
    let socializerScore = 0;
    let thinkerScore = 0;
    let achieverScore = 0;
    let leaderScore = 0;
    let peacemakerScore = 0;
    let supporterScore = 0;

    // Function to display question image
    function displayQuestionImage(questionIndex) {
        const imageURLs = [
            "Q1.png",
            "Q2.png",
            "Q3.png",
            "Q4.png",
            "Q5.png",
            "Q6.png"
        ];
        const questionImageElement = document.getElementById('question-image');
        if (questionImageElement) {
            questionImageElement.src = imageURLs[questionIndex] || "";
        }
    }

    // Function to start the quiz
    document.getElementById('begin-quiz')?.addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
        displayCurrentQuestion();
    });

    // Function to display the current question and choices
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');

        if (!questionElement || !choiceContainers || !progressImageElement) return;

        choiceContainers.innerHTML = '';
        questionElement.textContent = currentQuestion.question;
        progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
        displayQuestionImage(currentQuestionIndex);

        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });
    }

    // Function to get progress bar image URL
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "Q1 progress.svg",
            "Q2 progress.svg",
            "Q3 progress.svg",
            "Q4 progress.svg",
            "Q5 progress.svg",
            "Q6 progress.svg"
        ];
        return progressImageURLs[questionIndex] || "";
    }

    // Function to handle choice click
    function handleChoiceClick(choiceIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];

        // Update scores based on weight of selected choice
        if (selectedChoiceWeight.hasOwnProperty('adventurerScore')) {
            adventurerScore += selectedChoiceWeight.adventurerScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('creatorScore')) {
            creatorScore += selectedChoiceWeight.creatorScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('socializerScore')) {
            socializerScore += selectedChoiceWeight.socializerScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('thinkerScore')) {
            thinkerScore += selectedChoiceWeight.thinkerScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('achieverScore')) {
            achieverScore += selectedChoiceWeight.achieverScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('leaderScore')) {
            leaderScore += selectedChoiceWeight.leaderScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('peacemakerScore')) {
            peacemakerScore += selectedChoiceWeight.peacemakerScore;
        }
        if (selectedChoiceWeight.hasOwnProperty('supporterScore')) {
            supporterScore += selectedChoiceWeight.supporterScore;
        }

        // Move to the next question
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {
            displayResults();
        }
    }

    // Function to calculate and display results
    function displayResults() {
        const scores = [
            { name: "Người Phiêu Lưu", score: adventurerScore },
            { name: "Người Sáng Tạo", score: creatorScore },
            { name: "Người Xã Giao", score: socializerScore },
            { name: "Người Tư Duy", score: thinkerScore },
            { name: "Người Thực Hiện", score: achieverScore },
            { name: "Người Lãnh Đạo", score: leaderScore },
            { name: "Người Hòa Giải", score: peacemakerScore },
            { name: "Người Hỗ Trợ", score: supporterScore }
        ];

        // Find the highest score
        const maxScore = Math.max(...scores.map(s => s.score));
        const topPersonalities = scores.filter(s => s.score === maxScore).map(s => s.name);

        // Display results
        const quizPage = document.getElementById('quiz-page');
        const results = document.getElementById('results');
        if (quizPage && results) {
            quizPage.style.display = 'none';
            results.style.display = 'block';
            const resultElement = document.getElementById('result-text');
            if (resultElement) {
                resultElement.textContent = `Tính cách nổi trội của bạn là: ${topPersonalities.join(" và ")} với ${maxScore} điểm!`;
            }
        }
    }

    // Share quiz button click event handler
    document.getElementById('share-button')?.addEventListener('click', function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Quiz URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy URL: ', err);
            });
    });

    // Back to home button click event handler
    document.getElementById('back-to-home')?.addEventListener('click', function() {
        window.location.href = 'index.html'; // Adjust to your home page URL
    });

    // Start the quiz
    displayCurrentQuestion();
}

// Call function to start the quiz
displayQuiz();
