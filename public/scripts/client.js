/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// prevents XSS with escaping
const esc = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates HTML markup using template literals and returns the article element to the caller
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

  return $tweet;
};

// Calls the createTweetElement which returns the article element and appends it to the tweets-container
const renderTweets = function(tweets) {
  tweets.forEach(userInfo => {
    const $returnedTweet = createTweetElement(userInfo);
    $('#tweets-container').prepend($returnedTweet);
  });
};

// Make a request to /tweets/ to fetch the data from server
const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  })
    .then(function(data) {
      renderTweets(data);
    });
};

// Make a request to /tweets/ and pulls the last item of the array from the data received and show it in the feed right away
// this is so that we don't have to keep refreshing the browser to see the new tweet added
const addNewTweet = function() {
  $.ajax({
    method: "GET",
    url: "/tweets/",
  })
    .then(function(data) {
      const index = data.length - 1;
      $("#tweets-container").prepend(createTweetElement(data[index]));
    });
};

$(document).ready(function() {
  loadTweets();

  // Event handler on form submission
  $('.form').on('submit', function(event) {
    event.preventDefault();

    const input = $("#tweet-text").serialize();

    // Data checks and validations
    const tweetLength = $('#tweet-text').val().length;

    if (tweetLength) {
      $('.error-messages').slideUp();
    }

    if (tweetLength > 140) {
      $('.error-messages').text(`Character limit exceeded. Please try again.`).slideDown();
      return;
    }

    if (tweetLength <= 0) {
      $('.error-messages').text(`There is nothing to tweet. Please try again.`).slideDown();
      return;
    }

    // Make the POST request to the server
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: input,
    })
      // after submitting the form, clear the text that was written and reset the counter
      .then(function() {
        $('#tweet-text').val("");
        $('.counter').val(140);
        addNewTweet();
      });
  });
});