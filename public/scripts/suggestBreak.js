

// a reusable function that makes the correct corresponding break button flashafter a work period



export function suggestBreak (breakButtonToSuggest) {
  breakButtonToSuggest.classList.toggle('suggestActionClass');
  setTimeout(function() {
    breakButtonToSuggest.classList.toggle('suggestActionClass');
  }, 7500);
};