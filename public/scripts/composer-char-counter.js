// runs a callback when the DOM is ready to be manipulated with jQuery. 

$(document).ready(function(){

  // register an event handler to the textarea element for the form inside of the .new-tweet section.
  // we want to listen for any input from the user and count down the number as they input more characters
  $('#tweet-text').on('input', function(event){

    // $(this) refers to the current '<textarea>' element that triggered the event
    // grab the value of the textarea and find the length of it, then assign it to a variable
    const lengthOfTextValue = $(this).val().length;

    // the count is currently going up, to count down into the negatives, we have to flip the counter
    // from 140, count down each time a character is input in the textarea
    const counter = 140 - lengthOfTextValue;

    // get access to the sibling's child .counter by traversing up and down the DOM
    // currently, you are on <textarea> element, there are two additional siblings <label> and <div>. We need to travel up to the parent <form> and back down to the grandchild <output>.
    const counterChild = $(this).closest('.form').find('.counter');

    // counterChild should count down as each character is input in the textarea
    // .text replaces the value of that element
    counterChild.text(counter);

    // if user exceeds the 140 character limit, the counter should appear red, otherwise, it should always be the other color
    if (counter < 0) {
      counterChild.css('color', '#B24926');
    } else {
      counterChild.css('color', 'rgb(88, 88, 88)');
    }
  });
});