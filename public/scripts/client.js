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

const createTweetElement = function(data) {
  const $tweet = $(`
  <article class="tweet-container">
      <header>
        <div class="image-container">
          <img src="${data.user.avatars}"/>
          <div>${data.user.name}</div>
        </div>
        <div class="username">${data.user.handle}</div>
      </header>
      <p>${data.content.text}</p>
      <footer>
        <div>${data.created_at}</div> 
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

const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(userInfo => {

    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $returnedTweet = createTweetElement(userInfo);
    $('#tweets-container').append($returnedTweet);
  });
};

// this function uses jQuery to make a request to /tweets and receive the array of tweets as JSON
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
  // .catch(function(error) {
  //   console.log(error);
  // })
};

$(document).ready(function() {
  // Use jQuery library to add event listener for "submit"
  $('.form').on('submit', function(event) {

    // prevent the default form submission behaviour
    event.preventDefault();

    // grab the input from the text-area and serialize it
    // serialize the data coming from the form and send it to the server as a query string
    const input = $("#tweet-text").serialize();

    // ajax method is used to send the POST request to the server
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: input,
    })
      .then(function(data) {
        console.log(data);
      });
    // .catch(function(error){
    //   console.log(error);
    // });
  });

  loadTweets();
});