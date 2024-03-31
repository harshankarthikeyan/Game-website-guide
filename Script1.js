//global variables
// equations
let questionAmount = 0 ;
let equationArray = [];
//Game page
let firstNumber = 0;
let secondNumber =0;
let equationObject ={};
let wrongFormat =[];
//player guess variable for correct and  mistake
let playerGuessArray = [];
let valueY =0;
//score
let timer;
let timePlayed =0 ;
let bestTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay ="0.0s";

//best score array
let bestScoreArray = [];

//first page
const startForm = document.getElementById("start-form");
const radioContainer = document.querySelectorAll(".radio-container");
const radioInputs = document.querySelectorAll("input");
const bestScores = document.querySelectorAll(".bsest-score-value");




//game pages
const gamePage = document.getElementById("game-page");
const scorePage = document.getElementById("score-page");
const splashpage = document.getElementById("splash-page");
const countDownPage = document.getElementById("countdown-page");
//Score page
const finalTimeE1 =document.querySelector(".final-time");
const bestTimeE1 = document.querySelector(".base-time");
const penaltyTimeE1 = document.querySelector(".penalty-time");
const playAgainE = document.querySelector(".play");

   
startForm.addEventListener("click",()=>{
  radioContainer.forEach((radioE1) => {
    //  console.log(radioE1);
      radioE1.classList.remove("selected-label");
      if (radioE1.children[1].checked)
       {
          radioE1.classList.add("selected-label");
     
       }
 
  });

});
// get the value from selected radio button
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;
    }
  });
  return radioValue;//when we click the inherit button we get alert box
}
function selectQuestionAmount(e){
  e.preventDefault();//by start round it is automatically disabled
   questionAmount = getRadioValue();
  // alert(questionAmount);
  console.log("Question amount value =",questionAmount);//when we click the question start the round it moves to count down page
    if(questionAmount){
            showCountDown();
        }
}
//Event listeners
startForm.addEventListener("submit",selectQuestionAmount);
//countdown
const countdown = document.querySelector(".countdown");
function showCountDown(){
  countDownPage.hidden = false;
  splashpage.hidden =true;
  countDownStart();
  popuplateGamePage();
  createEquations();
  setTimeout(showGamePage,4000);

}
//display 1 2 3 and  go
function countDownStart(){
  countdown.textContent = '3';
  setTimeout(()=>{
    countdown.textContent = '2';
  },1000);
  setTimeout(()=>{
    countdown.textContent = '1';
  },2000);
  setTimeout(()=>{
    countdown.textContent = 'GO!';
  },3000);
  
}
function getRandomInt(max){//floor used float to covert integer
  return Math.floor(Math.random() * Math.floor(max));
}
//correct or  in correct variables
function createEquations(){
  //random choose how many correct equations
  const correctEquations =getRandomInt(questionAmount);
  const wrongEquations = questionAmount - correctEquations;

  //lop creatt equations and push to array
  for(  let i = 0;i<correctEquations;i++){
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation =`${firstNumber} X ${secondNumber} = ${equationValue}`;
    equationObject = {value:equation, evaluated:'true'};
    equationArray.push(equationObject);
  }

//loop create wrong equations and push into array
for(  let i=0;i<wrongEquations;i++){
  firstNumber = getRandomInt(9);
  secondNumber = getRandomInt(9);
  const equationValue = firstNumber * secondNumber;
  wrongFormat[0] = ` ${firstNumber} X ${secondNumber+1} = ${equationValue}`;
  wrongFormat[1] = ` ${firstNumber+1} X ${secondNumber+1} = ${equationValue}`;
  wrongFormat[2] = ` ${firstNumber} X ${secondNumber+1} = ${equationValue+2}`;
  
  const formatChoice = getRandomInt(3);
  const equation = wrongFormat[formatChoice];
  equationObject = {value:equation, evaluated:'false'};
    equationArray.push(equationObject);
}
shuffleArr(equationArray);//for shuffleing the true and false value
//console.log("Equations =", equationArray);
//equationsToDOM();
}
function showGamePage(){
  gamePage.hidden = false;
  countDownPage.hidden = true;
}

const itemContainer = document.querySelector(".item-container");

function equationsToDOM(){
  equationArray.forEach((equation)=>{
    const item = document.createElement("div");
    item.classList.add("item");

    //equation test
    const equationtext = document.createElement("h1");
    equationtext.textContent = equation.value;

    //append
    item.appendChild(equationtext);
    itemContainer.appendChild(item);
  });
}
//dynamically adding correct or incorrect equation
function popuplateGamePage(){
  itemContainer.textContent = '';
  const topSpacer = document.createElement("div");
  topSpacer.classList.add("height-240");
  //selected Item
  const selectedItem = document.createElement("div");
  selectedItem.classList.add("selected-item");

  itemContainer.append(topSpacer,selectedItem);

  createEquations();
  equationsToDOM();


 const bottomSpacer = document.createElement("div");
   bottomSpacer.classList.add("height-500");
   itemContainer.append(bottomSpacer);

}
function select(guess){
 // console.log("guess array:",playerGuessArray);
  valueY += 80;
  itemContainer.scroll(0,valueY);
  return guess ? playerGuessArray.push('true'):playerGuessArray.push('false');//when we click the correct or mistake button it makes true or flase value
}
//stop timer and processs the result to timePlayed

function checkTime(){
 // console.log(timePlayed);
  if(playerGuessArray.length == questionAmount){
    console.log("guess array =",playerGuessArray)
    clearInterval(timer);

//check for the wrong guesse add penalty time
equationArray.forEach((equation,index)=>{
  if(equation.evaluated === playerGuessArray[index]){
//no penalty
  }
  else{
    penaltyTime +=0.5;
  }
});
finalTime = timePlayed+ penaltyTime;
console.log("Time :",timePlayed);
console.log("Penalty :",penaltyTime );
console.log("finalTime :",finalTime);
ScoreToDOM();

  }
}
//start the timer when game is clicked
function addTime(){
  timePlayed+= 0.1;
  checkTime();
}
function startTimer(){
  timePlayed=0;
  penaltyTime=0;
  finalTime=0;
  timer=setInterval(addTime,100);
  gamePage.removeEventListener('click',startTimer);

}

gamePage.addEventListener('click',startTimer);
function showScorepage(){
  setTimeout(()=>{
    playAgainE.hidden=false;
  });
  gamePage.hidden =true;
  scorePage.hidden=false;
}
function ScoreToDOM(){
  
  finalTimeDisplay = finalTime.toFixed(1);
  bestTime = timePlayed.toFixed(1);
  penaltyTime=penaltyTime.toFixed(1);


  
  bestTimeE1.textContent = `Best Time : ${bestTime} s`;//backtick near to 1
  penaltyTimeE1.textContent = `Penalty : ${penaltyTime} s`;
  finalTimeE1.textContent = ` ${finalTimeDisplay} s`;
  updateBestScore();
itemContainer.scroll({top:0,behavior:"instant"});//for dont scrollling
  showScorepage();

}
//play again button
function playAgain(){
  gamePage.addEventListener('click',startTimer);
  scorePage.hidden = true;
  splashpage.hidden = false;
  equationArray=[];
  playerGuessArray=[];
  valueY = 0;
  playAgainE.hidden = true;
}


function getSavedbestScores(){
  if(localStorage.getItem('bestScores')){
    bestScoreArray = JSON.parse(localStorage.bestScores);

  }
  else{
    bestScoreArray = [
        { questions:10, bestScore: finalTimeDisplay  },
        { questions:25, bestScore: finalTimeDisplay },
        { questions:50, bestScore: finalTimeDisplay },
        { questions:100, bestScore: finalTimeDisplay }
      
    ];
    localStorage.setItem('bestScores',JSON.stringify(bestScoreArray));

  }
  bestScoreToDOM();

  }
  getSavedbestScores();
  function bestScoreToDOM(){
    bestScores.forEach((bestScore,index)=>{
      const bestScoreE1 =bestScore;
      bestScoreE1.textContent = `${bestScoreArray[index].bestScore}$`;
    });
  }

//update the best score
function updateBestScore(){
  bestScoreArray.forEach((score,index)=>{
    if(questionAmount == score.questions){
      const savedBestScore = Number(bestScoreArray[index].bestscore);

   // update if new final time
   if(savedBestScore === 0 || savedBestScore > finalTime){
    bestScoreArray[index].bestScore = finalTimeDisplay;
   }

    }
  });
  bestScoreToDOM();
  localStorage.setItem('bestScores',JSON.stringify(bestScoreArray));
}















