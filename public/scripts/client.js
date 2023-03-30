/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

// function prevents XSS with escaping, what it does is <script> would be converted to &lt;script&gt;. 
// The HTML tag would then be visible to the user, but not evaluated as a tag by the browser.
const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// function creates HTML markup using template literals and returns it to the caller
const createTweetElement = function(data) {

  // Use the timeago.format method to display the time passed since a tweet was created
  const time = timeago.format(data.created_at, "en_US");

  const $tweet = $(`
  <article class="tweet-container">
      <header>
        <div class="image-container">
          <img src="${data.user.avatars}"/>
          <div>${data.user.name}</div>
        </div>
        <div class="username">${data.user.handle}</div>
      </header>
      <p>${esc(data.content.text)}</p>
      <footer>
        <div>${time}</div> 
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet; // returns the article element
};

// function takes in an array of objects, calls the createTweetElement which returns the article element and render them to DOM
const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(userInfo => {

    // calls createTweetElement for each tweet, takes return value and appends it to the tweets-container
    const $returnedTweet = createTweetElement(userInfo);
    $('#tweets-container').prepend($returnedTweet);
  });
};

// this function uses jQuery to make a request to /tweets/ and receive the array of tweets as JSON
// the success callback function calls up renderTweets function and passes it the response from the AJAX request
const loadTweets = function() {
  // ajax method to fetch(GET) data from the server
  $.ajax({
    method: "GET",
    url: "/tweets/",
    // dataType: "json", DO I NEED THIS?? *******************
  })
    .then(function(data) {
      renderTweets(data);
    });
};

// this function pulls the last item of the array from /tweets/ and creates the article element by calling crateTweetElement function
// and then takes the returned value and appends it to the #tweets-container to the top
// this is so that we don't have to keep refreshing thr browser to see the new tweet added
const addNewTweet = function() {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  })
    .then(function(data) {
      // Get the last item of the array (because when a tweet is submitted, the tweet gets added inside the array as the last item)
      const index = data.length - 1;
      // Grab the newly created tweet and add it on top of the tweet-container
      $("#tweets-container").prepend(createTweetElement(data[index]));
    });
};

$(document).ready(function() {

  // call the loadTweets function so it shows the tweets that were previously submitted
  loadTweets();

  // Use jQuery library to add event listener for "submit"
  $('.form').on('submit', function(event) {

    // prevent the default form submission behaviour
    event.preventDefault();

    // grab the input from the text-area and serialize it
    // serialize the data coming from the form and send it to the server as a query string
    const input = $("#tweet-text").serialize();

    //if statements to handle empty strings or over character limit for the textarea
    const tweetLength = $('#tweet-text').val().length;

    if (tweetLength > 140) {
      alert(`Too much. Reduce characters plis.`);
    }

    if (tweetLength <= 0) {
      alert(`Too little. Type something.`);
    }

    // ajax method is used to send the POST request to the server
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: input,
    })
      .then(function() {
        // clear what was written
        $('#tweet-text').val("");
        // counter resets
        $('.counter').val(140);
        addNewTweet();
      });
  });
});