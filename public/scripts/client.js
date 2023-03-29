/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
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

  return $tweet; // tweet artuarticlecke element containing the entire HTML 
};

const $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);
