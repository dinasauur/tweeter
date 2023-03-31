// Run a callback when the DOM is ready to be manipulated with jQuery

$(document).ready(function() {

  // Event handler (for the textarea element of the form) listens for any input from the user and count down the number as they input more characters
  $('#tweet-text').on('input', function(event) {
    const lengthOfTextValue = $(this).val().length;

    const counter = 140 - lengthOfTextValue;

    // Traverse up and down the DOM to get to '.counter'
    const counterChild = $(this).closest('.form').find('.counter');
    counterChild.text(counter);

    if (counter < 0) {
      counterChild.css('color', '#B24926');
    } else {
      counterChild.css('color', 'rgb(88, 88, 88)');
    }
  });
});