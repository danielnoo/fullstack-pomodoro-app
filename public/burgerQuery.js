import {posty} from './badgeRewards.js'



const burgerEffect = new Audio('burgerlevelup.mp3');

let burgerCounter = 0;


export function burgerQuery()  {
  // called after a work period is completed
  // if user has completed 4 of the same consecutive work periods
  // since 5am local time 
  // they are rewarded with a burger badge and a long break -  
  
  // post badge to database
  let earnedBadgeData = {name: "Burger", focus: document.querySelector('#rewardText').value};
  posty(earnedBadgeData);
  
  burgerCounter++;
  let burger = document.querySelector('#burger');
    
  let burgerBadge = document.createElement('img');
  burgerBadge.src = 'doodle-05.svg';
  burgerBadge.classList.add('badgeDetails');


// if reward is locked when burger badge is earned then have the reward textbox 
// flash, maybe with some kind of animation -- flash the correct long break 
// timer button




  
// animate the burger after a 2 second delay to give the
// other reward animation time to complete
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
    
  

}