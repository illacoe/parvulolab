const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const textQuestion = document.getElementById('question-text');
const audio = document.getElementById('myAudio');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

let contador;
// scorePrint(contador);

let shuffledQuestions, currentQuestionIndex;
function playAudio() {
  audio.play();
}
function correctAnswerSound() {
  correctSound.play();
}
function wrongAnswerSound() {
  wrongSound.play();
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  contador = 0;
  playAudio();
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerHTML =  `<img class="img__question" src=${question.question} >`;
  textQuestion.innerHTML = `<span>${question.question2}</span>`;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setAudio(correct);
  setCounter(correct);
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    console.log(`EL JUGADOR OBTUVO: ${contador/100} Respuestas buenas`);
    startButton.innerText = 'Juguemos otra vez!';
    startButton.classList.remove('hide');
  }
}
function setAudio(correct){
  switch (correct){
    case 'true' : correctAnswerSound();
    break;
    default: wrongAnswerSound();
  }
}
function setCounter(correct){
  switch (correct){
    case 'true' : countWin();
    break;
    default: console.log(`puntos: ${contador}`);
  }
}

function countWin(){
  contador += 100;
  console.log(`puntos: ${contador}`);
  // scorePrint(contador);
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
    Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true
    })
  }else{  
    element.classList.add('wrong');
    contador= contador + 0;
    scorePrint(contador);
  }
}
function scorePrint(n) {
  document.querySelector('.score').textContent = `Pts: ${n}`;
}
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'https://i.pinimg.com/originals/42/4d/70/424d70a2c82b7d1a21d62ab0d02ec1bc.png',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'li', correct: true, score: 1 },
      { text: 'mi', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://assets.puzzlefactory.pl/puzzle/205/569/original.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'le', correct: true, score: 1 },
      { text: 'pe', correct: false, score: 0}
    ]
  },
  {
    question: 'https://static.vecteezy.com/system/resources/previews/000/662/008/non_2x/cartoon-moon-and-stars-background-vector.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'pu', correct: false, score: 0 },
      { text: 'lu', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://image.freepik.com/vector-gratis/loro-feliz-dibujos-animados_29190-1608.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'mo', correct: false, score: 0 },
      { text: 'lo', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://thumbs.dreamstime.com/b/hilado-hilo-haciendo-punto-tejiendo-lanas-ejemplo-realista-del-vector-el-detall%C3%B3-de-las-bolas-coloreadas-aisladas-en-fondo-blanco-143978601.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'pa', correct: false, score: 0 },
      { text: 'la', correct: true, score: 1 }
    ]
  },
]
 
