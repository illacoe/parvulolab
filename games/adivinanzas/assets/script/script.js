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
    question: 'https://i.pinimg.com/600x315/2a/7c/f2/2a7cf2b32ca8a8eea968a659f4670ae9.jpg',
    question2:'Blanco es, la gallina lo pone, con aceite se frie, con pan se come.',
    answers: [
      { text: 'El huevo', correct: true, score: 1 },
      { text: 'La papa', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://media.tenor.com/images/4b614e19af574f2cd82ea4fe46a161eb/tenor.png',
    question2:'Blanco por dentro, verde por fuera, si quieres que te lo diga espera.',
    answers: [
      { text: 'manzana', correct: false, score: 0 },
      { text: 'Pera', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://i.pinimg.com/originals/24/f2/2b/24f22b2f1008dc548431b23304045eba.png',
    question2:'Soy bonito por delante, algo feo por detrás, me transformo a cada instante, ya que imito a los demás.',
    answers: [
      { text: 'Espejo', correct: true, score: 1 },
      { text: 'Mimo', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://i.imgur.com/RCs7Nyv.jpg',
    question2:'Orejas largas, cuepo cortito, como y salto muy larguito',
    answers: [
      { text: 'Oso', correct: false, score: 0 },
      { text: 'Conejo', correct: true, score: 1 }
    ]
  },
  {
    question: 'https://i.pinimg.com/736x/96/f2/a2/96f2a29bd1066e2cfeb6880098359826--pink-panter-cartoon-tv.jpg',
    question2:'Adivina adivinanza.. Por el día están abiertos y por la noche cerrados. ¿Qué son?',
    answers: [
      { text: 'Ojos', correct: true, score: 1 },
      { text: 'Manos', correct: false, score: 0 }
    ]
  },
  {
    question: 'https://1.bp.blogspot.com/-6Iwd16plCAA/U3Hlcl7h_6I/AAAAAAAAAYc/nErquUd6PP8/s1600/taz_pensando.gif',
    question2:'Me rascan continuamente de forma muy placentera, mi voz es muy bien timbrada y mi cuerpo de madera.',
    answers: [
      { text: 'Perro', correct: false, score: 0 },
      { text: 'Guitarra', correct: true, score: 1 }
    ]
  },
   
]
 
