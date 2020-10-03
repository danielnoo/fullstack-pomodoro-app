// function to lock the focus for a work period - change to the 
// buttonPressed() darker styling along with the worktimer button
// 
export function engageFocuses() {
  let lockedFocus = document.querySelectorAll('.focusSet');
  function applyClass(item) {
    item.classList.add('buttonPressed');
  };
  lockedFocus.forEach(applyClass);
}








// if the work period ends while a focus is locked then the focus(es)
// need to be added to the data sent by the fetch call in badgeRewards.js