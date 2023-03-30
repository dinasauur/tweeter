/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function(){
  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(userInfo => {
  
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $returnedTweet = createTweetElement(userInfo);
      $('#tweets-container').append($returnedTweet);
    });
  
  };
  
  const createTweetElement = function(data) {
    const $tweet = $(`
    <article class="tweet-container">
        <header>
          <img src="${data.user.avatars}"/>
          <div>${data.user.name}</div>
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
  
  renderTweets(data);
});
