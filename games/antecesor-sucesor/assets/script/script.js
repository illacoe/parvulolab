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
    question: 'https://i.pinimg.com/originals/8d/78/7e/8d787e52aa9112a722312b6e942d875f.jpg',
    question2:'¿Cual es el Antecesor de 3?',
    answers: [
      { text: '2', correct: true },
      { text: '4', correct: false }
    ]
  },
  {
    question: 'https://vignette.wikia.nocookie.net/minion/images/c/ca/Bob-from-the-minions-movie.jpg/revision/latest?cb=20160316002021&path-prefix=es',
    question2:'¿Cual es el Sucesor de 5?',
    answers: [
      { text: '6', correct: true },
      { text: '4', correct: false }
    ]
  },
  {
    question: 'https://www.lavanguardia.com/r/GODO/LV/p0/WebSite/2018/07/24/Recortada/61392-100998-captura-de-pantalla-2015-07-21-a-la-s-09-50-56-584-391-20180724173054@LaVanguardia-Web.jpg',
    question2:'¿Cual es el Antecesor de 10?',
    answers: [
      { text: '8', correct: false },
      { text: '9', correct: true }
    ]
  },
  {
    question: 'https://miro.medium.com/max/5760/1*MKtbY0rNn7xqZVV_9IVvYA.jpeg',
    question2:'¿Cual es el Sucesor de 7?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  },
  {
    question: 'https://frikimaestro.com/wp-content/uploads/2019/12/251-2519248_minion-minions-bob-png.png',
    question2:'¿Cual es el Antecesor de 8?',
    answers: [
      { text: '9', correct: false },
      { text: '7', correct: true }
    ]
  },
  {
    question: 'https://cjmart.jp/en/upload/save_image/0126_190824_mp4otl_y_3.jpg',
    question2:'¿Cual es el Sucesor de 4?',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: true }
    ]
  },
  {
    question: 'https://interactivadigital.com/uploads/2015/06/minion-021313.jpg',
    question2:'¿Cual es el Sucesor de 1?',
    answers: [
      { text: '2', correct: true },
      { text: '8', correct: false }
    ]
  },
  {
    question: 'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/615535',
    question2:'¿Cual es el Antecesor de 2?',
    answers: [
      { text: '3', correct: false },
      { text: '1', correct: true }
    ]
  },
  {
    question: 'https://s1.thcdn.com/productimg/0/960/960/15/11072215-1422271043-819290.jpg',
    question2:'¿Cual es el Sucesor de 6?',
    answers: [
      { text: '7', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/0/1/0130_190824_mp4otl_y_3.jpg',
    question2:'¿Cual es el Antecesor de 9?',
    answers: [
      { text: '8', correct: true },
      { text: '10', correct: false }
    ]
  },
]
 
