// move this later - setting up database posting when a badge is earned
// move after setting up babel

const earnedBadgeData = [
  {"name": "coffee"}, 
  {"name": "cupcake"}, 
  {"name": "burger"}
];

async function post(data) {
  try {
      // Create request to api service
      const req = await fetch('/dashboard', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          
          // format the data
          body: JSON.stringify({name: data.name})
      });
      
      const res = await req.json();

      // Log success message
      console.log(res);                
  } catch(err) {
      console.error(`ERROR: ${err}`);
  }
};



const soundEffect = new Audio('sms-alert-1-daniel_simon.wav');
const completeEffect = new Audio('finishtone.mp3');
const burgerEffect = new Audio('burgerlevelup.mp3');


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


let timerRunning = false;
let clockTimer;
let cupCakeCounter = 0;
let coffeeCounter = 0;
let burgerCounter = 0;

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
  if(pressed.length > 0){
  pressed[0].classList.remove('buttonPressed');
  stopRotate();
  };
};

let burgerQuery = () => {
  // called after a work period is completed
  // if user has completed 4 of the same consecutive work periods
  // since 5am local time 
  // they are rewarded with a burger badge and a long break -  
  post(earnedBadgeData[2]);
  burgerCounter++;
  let burger = document.querySelector('#burger');
    
  let burgerBadge = document.createElement('img');
  burgerBadge.src = 'doodle-05.svg';
  burgerBadge.classList.add('badgeDetails');

  

  function addBurger() {
    burgerEffect.play();
    burger.classList.add('burgerBadge');
    
    function burgerDelay() {
      burger.classList.remove('burgerBadge');
      badges.appendChild(burgerBadge);
    }
    
    setTimeout(burgerDelay, 2000);
    
        
  };
  
  setTimeout(addBurger, 2000);
    
  

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
  shortWorkTimerButton.classList.add('buttonPressed');
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
      let coffee = document.querySelector('#coffee');
      coffee.classList.add('coffeeBadge');
      function removeGrow() {
        coffee.classList.remove('coffeeBadge');
        badges.appendChild(coffeeCup);
      };
      setTimeout(removeGrow, 2000);
      
      post(earnedBadgeData[0]);
      
      let coffeeCup = document.createElement('img');
      coffeeCup.src = 'doodle-46.svg';
      coffeeCup.classList.add('badgeDetails');
      
     
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
      post(earnedBadgeData[1]);
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



// modal

let ini= document.querySelector('#modal-window');

ini.classList.add("hideModal");

function openModal(){
  let modal= document.querySelector('#modal-window');
  modal.classList.remove("preload");
  modal.classList.add("showModal");
  
}

function closeM(){

  let m= document.querySelector('#modal-window');
  m.classList.remove("showModal");
  
}







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


