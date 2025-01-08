---
title: "ox"
date: 2025-01-08
draft: false
---
<!DOCTYPE html>
<html lang="ko">
    <link rel="preload" href="./fonts/kccdodamdodam-webfont.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="./fonts/kccdodamdodam-webfont.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload" href="./fonts/one_mobile_pop_otf-webfont.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="./fonts/one_mobile_pop_otf-webfont.woff" as="font" type="font/woff" crossorigin="anonymous">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="oxdjgnlfurdlf.css"> <!-- 외부 CSS 파일 연결 -->
</head>


<body>
    <!-- 상단 제목 -->
    <header class="header">
        <img src="./images/quiz_title.jpg" alt="제목 이미지" class="header-image">
    </header>



    <!-- 흰색 사각형 배경 -->
    <div class="start">
        <img src="./images/quiz_start.jpg" alt="시작 이미지" class="start-image">        
    </div>
    <div class="content-box">

         <!-- Q1과 질문내용을 묶은 컨테이너 -->
        <div class="question-container">
            <div id="qorder"class="q1-text">Q1.</div>
            <div id="question-text" class="question-text">이곳에 질문 내용을 입력하세요. 질문은 길어질 경우 자동으로 줄바꿈됩니다.</div>
        </div>
    
        <!-- 버튼 컨테이너 -->
        <div class="button-container">
            <button id="btno" class="image-button">
            </button>
            <button id="btnx" class="image-button2">
            </button>
        </div>
    </div>


    <div id="feedback" style="display: none;">
        <img id="feedback-img" src="" alt="피드백 이미지">
      </div>
      <script src="oxdjgnlfurdlf.js"></script>

      <!-- 로딩 화면 -->
<div Id="loadingScreen" class="loading-screen" style="display:none">
    <div id="loadingText" class="loading-text">로딩중...</div>
  </div>
  

</body>
</html>