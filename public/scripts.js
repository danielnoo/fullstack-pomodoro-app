// move this later - setting up database posting when a badge is earned
// move after setting up babel

import {posty} from './badgeRewards.js'
import {engageFocuses} from './focusConsole.js'
import {burgerQuery} from './burgerQuery.js'



        
const soundEffect = new Audio('sms-alert-1-daniel_simon.wav');
const completeEffect = new Audio('finishtone.mp3');




const fiveMinBreak = 300000;
const fifteenMinBreak = 900000;
const shortWorkTimer = 1500000;
const longWorkTimer = 2700000;

const hourGlass = document.querySelector('#hourGlass');
const badges = document.querySelector('#badges');
const timer = document.querySelector("#clock");


// buttons
const fiveMinBreakButton = document.querySelector('#shortBreak');
const fifteenMinBreakButton = document.querySelector('#longBreak');
const thirtyMinBreakButton = document.querySelector('#thirtyBreak');
const sixtyMinBreakButton = document.querySelector('#sixtyBreak');
const shortWorkTimerButton = document.querySelector('#shortWorkTimer');
const longWorkTimerButton = document.querySelector('#longWorkTimer');
const pauseButton = document.querySelector('#pauseButton');
const resetButton = document.querySelector('#resetButton');
const focusOneInner = document.querySelector('#focusOneText');
const focusOneButton = document.querySelector('#focusButtonOne');
const focusTwoInner = document.querySelector('#focusTwoText');
const focusTwoButton = document.querySelector('#focusButtonTwo');
const focusThreeInner = document.querySelector('#focusThreeText');
const focusThreeButton = document.querySelector('#focusButtonThree');
const rewardText = document.querySelector('#rewardText');
const rewardButton = document.querySelector('#focusButtonReward');


// focus button one -  focus buttons - move to module later if possible
focusOneButton.addEventListener('click', () => {
  if(focusOneInner.readOnly == true) {
      focusOneButton.classList.replace("fa-lock", "fa-unlock-alt");
      focusOneInner.classList.remove('focusSet');
      focusOneInner.readOnly = false;
    }else if((focusOneInner && focusOneInner.value)){
      focusOneButton.classList.replace("fa-unlock-alt", "fa-lock");
      focusOneInner.classList.add('focusSet');
      focusOneInner.readOnly = true;
    } 
});
// focus button two
focusTwoButton.addEventListener('click', () => {
  if(focusTwoInner.readOnly == true) {
      focusTwoButton.classList.replace("fa-lock", "fa-unlock-alt");
      focusTwoInner.classList.remove('focusSet');
      focusTwoInner.readOnly = false;
    }else if((focusTwoInner && focusTwoInner.value)){
      focusTwoButton.classList.replace("fa-unlock-alt", "fa-lock");
      focusTwoInner.classList.add('focusSet');
      focusTwoInner.readOnly = true;
    } 
});
// focus button three
focusThreeButton.addEventListener('click', () => {
  if(focusThreeInner.readOnly == true) {
      focusThreeButton.classList.replace("fa-lock", "fa-unlock-alt");
      focusThreeInner.classList.remove('focusSet');
      focusThreeInner.readOnly = false;
    }else if((focusThreeInner && focusThreeInner.value)){
      focusThreeButton.classList.replace("fa-unlock-alt", "fa-lock");
      focusThreeInner.classList.add('focusSet');
      focusThreeInner.readOnly = true;
    } 
});
// reward button
rewardButton.addEventListener('click', () => {
  if(rewardText.readOnly == true) {
      rewardButton.classList.replace("fa-lock", "fa-unlock-alt");
      rewardText.classList.remove('rewardSet');
      rewardText.readOnly = false;
    }else if((rewardText && rewardText.value)){
      rewardButton.classList.replace("fa-unlock-alt", "fa-lock");
      rewardText.classList.add('rewardSet');
      rewardText.readOnly = true;
    } 
});



  


let timerRunning = false;
let clockTimer;
let cupCakeCounter = 0;
let coffeeCounter = 0;


// while the timer is running, the hourglass spins

let rotateGlass = () => {
 hourGlass.classList.add('rotateGlass');
};

let stopRotate = () => {
hourGlass.classList.remove('rotateGlass');
};






// remove all red highlight button press effects on call  
function removeButtonPress() {
  let pressed = document.getElementsByClassName('buttonPressed');

  while(pressed.length > 0) {
    pressed[0].classList.remove('buttonPressed')
  }
  stopRotate();
};




// start the timer for 25 minute work period

shortWorkTimerButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 25;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  
  // add the button pressed effect to both this button and 
  // any locked in focuses
  
  shortWorkTimerButton.classList.add('buttonPressed');

  
  engageFocuses();
  
  
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }
// work duration is completed so sound and animation play, the earned 
// badge is appended to the user's stats page
    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "SNACK TIME";
      completeEffect.play();
      pauseButton.innerHTML = "Pause";
      let coffeeCup = document.createElement('img');
      coffeeCup.src = 'doodle-46.svg';
      coffeeCup.classList.add('badgeDetails');
      let coffee = document.querySelector('#coffee');
      coffee.classList.add('coffeeBadge');
      function removeGrow() {
        coffee.classList.remove('coffeeBadge');
        badges.appendChild(coffeeCup);
      };
      setTimeout(removeGrow, 2000);
      
      
      // find which focuses are still locked when timer is finished
      // create the earned badge in the database
      
      let focusArray = document.querySelectorAll('.focusSet');

      // queryselectorall returned an array of objects -- the following loop goes
      // through the array and pulls the value off of each entry
      
      let focusArrayValues = [];
      function pullFocusValues(){
        for(let i = 0; i < focusArray.length; i++) {
          focusArrayValues.push(focusArray[i].value);
        }
      };
      pullFocusValues();
      

      

      let earnedBadgeData = {
        name: "Coffee",
        focus: focusArrayValues
      }

      posty(earnedBadgeData);
      
      
      
     
      coffeeCounter++;
      if((coffeeCounter % 4) === 0) {
        burgerQuery();
      }
      removeButtonPress();
    }
  }, 50)
});


// start the timer for 45 minute work period

longWorkTimerButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 45;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  longWorkTimerButton.classList.add('buttonPressed');
  engageFocuses();
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }
// work duration is completed so sound and animation play, the earned 
// badge is appended to the user's stats page
    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "SNACK TIME";
      completeEffect.play();
      pauseButton.innerHTML = "Pause";
      let cupCake = document.querySelector('#cupcake');
      cupCake.classList.add('imgGrow');
      function removeGrow() {
        cupCake.classList.remove('imgGrow');
        badges.appendChild(cupCakeBadge);
      };
      setTimeout(removeGrow, 2000);
      
      let focusArray = document.querySelectorAll('.focusSet');
      let focusArrayValues = [];
      
      function pullFocusValues(){
        for(let i = 0; i < focusArray.length; i++) {
          focusArrayValues.push(focusArray[i].value);
        }
      };
      pullFocusValues();

      let earnedBadgeData = {
        name: "Cupcake",
        focus: focusArrayValues
      };

      posty(earnedBadgeData);

      cupCakeCounter++;
      let cupCakeBadge = document.createElement('img');
      cupCakeBadge.src = 'doodle-24.svg';
      cupCakeBadge.classList.add('badgeDetails');
      if((cupCakeCounter % 4) === 0) {
        burgerQuery();
      };
      removeButtonPress();
    }
  }, 60000)
});

// short break button

fiveMinBreakButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 5;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  fiveMinBreakButton.classList.add('buttonPressed');
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }

    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "GET TO IT";
      soundEffect.play();
      removeButtonPress();
      pauseButton.innerHTML = "Pause";
    }
  }, 60000)
});


// long break button

fifteenMinBreakButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 15;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  fifteenMinBreakButton.classList.add('buttonPressed');
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }

    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "GET TO IT";
      soundEffect.play();
      removeButtonPress();
      pauseButton.innerHTML = "Pause";
    }
  }, 60000)
});

// thirty minute break

thirtyMinBreakButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 30;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  thirtyMinBreakButton.classList.add('buttonPressed');
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }

    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "GET TO IT";
      soundEffect.play();
      removeButtonPress();
      pauseButton.innerHTML = "Pause";
    }
  }, 1000)
});

// sixty minute break

sixtyMinBreakButton.addEventListener('click', () => {
  if(timerRunning === true) {
    removeButtonPress();
  };
  clearInterval(clockTimer);
  let workDuration = 60;
  timer.innerHTML = workDuration + ' minutes';
  timerRunning = true;
  rotateGlass();
  sixtyMinBreakButton.classList.add('buttonPressed');
  
  clockTimer = setInterval(() => {
    workDuration--;
    if(workDuration === 1){
      timer.innerHTML = workDuration + ' minute!!!'
    } else {
    timer.innerHTML = workDuration + ' minutes';
    }
    if(workDuration === 0) {
      clearInterval(clockTimer);
      timer.innerHTML = "GET TO IT";
      soundEffect.play();
      removeButtonPress();
      pauseButton.innerHTML = "Pause";
    }
  }, 1000)
});

// pause and resume the clock with alarm intact

pauseButton.addEventListener('click', () => {
// resume  
  if(timerRunning === false) {
    if(timer.innerHTML === "SNACK TIME" || timer.innerHTML ==="GET TO IT") {
      return;
    }
    let workDuration = parseInt(timer.innerHTML);
    pauseButton.classList.remove('buttonPressed');
    pauseButton.innerHTML = "Pause";
    timerRunning = true;
    rotateGlass();
    clockTimer = setInterval(() => {
      workDuration--;
      if(workDuration === 1){
        timer.innerHTML = workDuration + ' minute!!!'
      } else {
      timer.innerHTML = workDuration + ' minutes';
      }
      if(workDuration === 0) {
        clearInterval(clockTimer);
        timer.innerHTML = "SNACK TIME";
        soundEffect.play();
        pauseButton.innerHTML = "Pause";
        timerRunning = false;
        removeButtonPress();
      }
    }, 1000)
// pause
  } else {
    if(timer.innerHTML === "SNACK TIME" || timer.innerHTML === "GET TO IT") {
      return;
    }
    clearInterval(clockTimer);
    pauseButton.innerHTML = "Resume";
    stopRotate();
    pauseButton.classList.add('buttonPressed');
    timerRunning = false;
  }
});

// reset the clock and reset buttons visually

resetButton.addEventListener('click', () => {
  clearInterval(clockTimer);
  timer.innerHTML = "GET TO IT";

  // use recursion to remove the button pressed effect
  // from any button that has it

  
  
  removeButtonPress();
  stopRotate();

});






// nav bar slide out

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const navIcon = document.querySelector("#navBars");

hamburger.addEventListener("click", () => {
  navBars.classList.toggle("fa-times");
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});





// todo

// light up the corresponding break timer after a work period is complete

// logic for resetting burger reward
// applying burger reward

// light up pause/resume button after pushed


// award for hitting personal best - peanut butter badge

// adding behavioural analysis to reward/break earning

// rewards not being given if pause/resume is used to complete

// refactor for DRY principles!!!! ************************

// refactor for es6

// have a single timer function accept paramters from the buttonpress 
// function call - - have rewards given based on which button is pressed
// when timer runs out

// separate into multiple files and use import/export


