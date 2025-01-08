// 점수와 현재 질문 인덱스 초기화
let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let wrongAnswers = []; // 틀린 문제의 check 텍스트 저장
let currentCheckIndex = 0; // 현재 출력 중인 check 텍스트의 인덱스

const questionContainer = document.querySelector(".question-container");
const buttonContainer = document.querySelector(".button-container");
const contentBox = document.querySelector(".content-box");
const header = document.querySelector(".header");
const start = document.querySelector(".start-image");

// 페이지가 로드되면 초기 상태 설정
document.addEventListener("DOMContentLoaded", () => {
    
  // quiz_start.jpg 클릭 이벤트
  start.addEventListener("click", () => {
    // header와 content-box 보이기
    header.style.display = "flex";
    contentBox.style.display = "flex";
    // 시작 이미지는 제거
    start.remove();
  });
});

// CSV 파일에서 데이터 로드
fetch('./sources/oxdjgnlfurdlf.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // 첫 번째 줄은 헤더이므로 제외
    questions = rows.map(row => {
      const [question, answer, check] = row.split(',');
      return { question: question.trim(), answer: parseInt(answer.trim()), check: check.trim() };
    });

    shuffleArray(questions); // 질문 순서 섞기
    loadQuestion(); // 첫 번째 질문 로드
  });

// 배열 섞기 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 질문 로드 함수
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame(score); // 문제가 끝나면 퀴즈 종료
    return;
  }

  const questionData = questions[currentQuestionIndex];
  document.getElementById("qorder").textContent = `Q${currentQuestionIndex + 1}.`;
  document.getElementById("question-text").innerHTML = questionData.question;

  enableButtons();
}

// 버튼 클릭 비활성화 함수
function disableButtons() {
  btno.disabled = true;
  btnx.disabled = true;
}

// 버튼 클릭 활성화 함수
function enableButtons() {
  btno.disabled = false;
  btnx.disabled = false;
}

// 정답 확인 및 피드백 처리 함수
function handleAnswer(userAnswer, event) {
  disableButtons();

  const questionData = questions[currentQuestionIndex];
  const correctAnswer = questionData.answer;
  const feedbackType = userAnswer === correctAnswer ? 'right' : 'wrong';
  const scoreChange = userAnswer === correctAnswer ? 10 : 0;

  // 점수 업데이트
  score += scoreChange;

  // 틀린 경우 check 텍스트 저장
  if (userAnswer !== correctAnswer) {
    wrongAnswers.push(questionData.check.trim());
  }

  // 클릭 위치에서 피드백 이미지 생성 및 애니메이션 처리
  showFeedbackImage(event, feedbackType);

  // 다음 질문 로드
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1000);
}

// 피드백 이미지 생성 및 애니메이션 처리 함수
function showFeedbackImage(event, feedbackType) {
  const feedbackImage = document.createElement('img');
  feedbackImage.src = `./images/${feedbackType}.png`;
  feedbackImage.className = 'feedback-animation';

  // 클릭 위치 설정
  const x = event.clientX;
  const y = event.clientY;
  feedbackImage.style.left = `${x}px`;
  feedbackImage.style.top = `${y}px`;

  document.body.appendChild(feedbackImage);

  setTimeout(() => {
    feedbackImage.remove();
  }, 1000);
}

function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = "flex"; // 로딩 화면 표시
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = "none"; // 로딩 화면 숨기기
  }
}


// 퀴즈 종료 처리 함수
function endGame(finalScore) {
  
    if (questionContainer) questionContainer.style.display = "none";
    if (buttonContainer) buttonContainer.style.display = "none";
    
    // 로딩 화면 표시
    showLoadingScreen();

    // 일정 시간 후 점수 화면 표시
    setTimeout(() => {
      hideLoadingScreen(); //로딩화면 숨기기

      
    let endMessage = "";
    let scoreColor = "";
  
    if (finalScore === 0) {
      endMessage = `이런 점수가 나오기도 쉽지 않은데...!<br>설마 일부러 다 틀린 건 아니죠?`;
      scoreColor = "#ff0000";
    } else if (finalScore >= 10 && finalScore <= 70) {
      endMessage = `아래의 체크 버튼을 누르세요.<br>왜 틀렸는지 확인합시다!`;
      scoreColor = "#FF9D00";
    } else if (finalScore === 80 || finalScore === 90) {
      endMessage = `꽤 하는걸요?<br>100점에도 도전해 보세요!`;
      scoreColor = "#009AEA";
    } else if (finalScore === 100) {
      endMessage = `최고예요!!<br>당신은 어휘력 박사?!!`;
      scoreColor = "#00A62F";
    }
  
          
    contentBox.innerHTML = `
      <div class="end-game-container">
        <div class="final-score" style="color:${scoreColor};">${finalScore}점</div>
        <div class="end-message">${endMessage}</div>
        <button class="check-button">
          <img src="./images/btncheck.png" alt="결과 확인 버튼" />
        </button>
      </div>
    `;
  
    // check-button 이벤트 리스너 추가
    document.querySelector(".check-button").addEventListener("click", showNextCheckText);

    },1000); //로딩 2초

  }
  
  function showNextCheckText() {
    const contentBox = document.querySelector(".content-box"); // contentBox를 함수 내에서 가져오기
    let endMessageElement = document.querySelector(".end-message");
  
    // 클래스 이름을 변경
    if (endMessageElement) {
      endMessageElement.classList.remove("end-message");
      endMessageElement.classList.add("check-message");
    }
  
    // 첫 클릭 시 final-score 제거
    if (currentCheckIndex === 0) {
      const finalScoreElement = contentBox.querySelector(".final-score");
      if (finalScoreElement) finalScoreElement.style.display = "none";
    }
  
    // 현재 check 텍스트 출력
    endMessageElement = document.querySelector(".check-message"); // 클래스 변경 후 다시 선택
    if (currentCheckIndex < wrongAnswers.length) {
      endMessageElement.innerHTML = wrongAnswers[currentCheckIndex];
      currentCheckIndex++;
    } else {
      // 모든 check 텍스트를 출력한 경우 완료 메시지 표시
      let isClickable = false;
      endMessageElement.innerHTML = `어휘력을 더 키워볼까요?<br><span style='color: blue; font-size: 120%; line-height: 1.7;'>다음 퀴즈로!</span>`;
      endMessageElement.style.fontSize = "50px";
      
      setTimeout(() => {
        isClickable = true;
      }, 500); //0.5초 클릭금지

      const targetURL = "https://blog.naver.com/s0sage/223718206944"; //지정 사이트로 이동
      const checkButton = document.querySelector(".check-button");  
      checkButton.addEventListener("click", () =>{
        if (isClickable){
          window.location.href = targetURL; //버튼 누르면 url이동
        }
        
    });
  }
}
    


  
  // 버튼 클릭 이벤트 리스너 추가
  btno.addEventListener('click', (event) => handleAnswer(1, event)); // O 버튼 클릭 시
  btnx.addEventListener('click', (event) => handleAnswer(0, event)); // X 버튼 클릭 시
  