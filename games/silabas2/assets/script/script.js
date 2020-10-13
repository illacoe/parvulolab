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
    question: 'https://image.freepik.com/vector-gratis/mano-dibujos-animados_60352-2661.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'ma', correct: true, score: 1 },
      { text: 'pa', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://st.depositphotos.com/1007168/4377/i/450/depositphotos_43770185-stock-photo-funny-clown-cartoon-character-with.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'la', correct: false, score: 0 },
      { text: 'pa', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://preview.free3d.com/img/2019/03/2145916105514813187/yyyopfxe-900.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'la', correct: true, score: 1 },
      { text: 'pa', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://i.pinimg.com/originals/42/4d/70/424d70a2c82b7d1a21d62ab0d02ec1bc.png',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'mi', correct: false, score: 0 },
      { text: 'li', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://tendenciahome.cl/wp-content/uploads/2018/07/mesa-tolix-80x80.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'me', correct: true, score: 1 },
      { text: 'la', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://www.nicepng.com/png/detail/797-7977214_free-png-ball-png-images-transparent-pelota-de.png',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'me', correct: false, score: 0 },
      { text: 'pe', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://img.freepik.com/foto-gratis/hoja-ensalada-lechuga-aislada-sobre-fondo-blanco_1088-990.jpg?size=626&ext=jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'pe', correct: false, score: 0 },
      { text: 'le', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://image.freepik.com/vector-gratis/personaje-dibujos-animados-mimo_88465-537.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'mi', correct: true, score: 1 },
      { text: 'pi', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://i.pinimg.com/736x/a3/7e/2a/a37e2ad737ccc70be1ffa41380b4081a.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'li', correct: false, score: 0 },
      { text: 'pi', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://www.psicoactiva.com/wp-content/uploads/puzzleclopedia/Libros-codificados-300x262.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'mi', correct: false, score: 0 },
      { text: 'li', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://st2.depositphotos.com/1000410/5429/v/450/depositphotos_54291185-stock-illustration-cartoon-motorcycle.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'po', correct: false, score: 0 },
      { text: 'mo', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://8ztl1kjhcvzv5sdcwc3rhg-on.drv.tw/curso/pollito.png',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'po', correct: true, score: 1 },
      { text: 'mo', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://img.freepik.com/vector-gratis/lobo-dibujos-animados-aullando-roca_29190-4911.jpg?size=626&ext=jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'mo', correct: false, score: 0 },
      { text: 'lo', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://mkz.tkzstatic.com/images/productos/muneca-tela-mona_7928_full.jpg',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'lu', correct: false, score: 0 },
      { text: 'mu', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://us.123rf.com/450wm/rastudio/rastudio1202/rastudio120200007/12372127-puerta-principal-de-dibujos-animados.jpg?ver=6 ',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'pu', correct: true, score: 1 },
      { text: 'lu', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://4.bp.blogspot.com/-T96XJ6ksq8A/WzeGeDf-uaI/AAAAAAAIfYg/KPFMcc2IN6Qc1oT-4XwAecTWb37Z2PTtQCLcBGAs/s1600/LUPAS%2B%252813%2529.png',
    question2:'¿Con qué sílaba empieza?',
    answers: [
      { text: 'pu', correct: false, score: 0 },
      { text: 'lu', correct: true, score: 1 }
    ]
  },
   
]
 
