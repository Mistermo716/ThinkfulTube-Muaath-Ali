'use strict';

const API_KEY = 'AIzaSyATzDRzDQq8VAeRbF7TAI5vJIQlSSsWF58';
const URL = 'https://www.googleapis.com/youtube/v3/search';

const store = {
  videos: []
};

// TASK: Add the Youtube Search Base URL here:
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
const BASE_URL = '';

// TASK:
// 1. Create a `fetchVideos` function that receives a `searchTerm` and `callback`
// 2. Use `searchTerm` to construct the right query object based on the Youtube API docs
// 3. Make a getJSON call using the query object and sending the provided callback in as the last argument
// TEST IT! Execute this function and console log the results inside the callback.
const fetchVideos = function (searchTerm, callback) {
  // const search = {
  //   part: 'snippet',
  //   key: API_KEY,
  //   q: 'thinkful'
  // };
  // $.getJSON(URL, search, decorateResponse);
  
  const search = {
    part: 'snippet',
    key: API_KEY,
    q: searchTerm
  };
  $.getJSON(URL, search, callback);
};

// TASK:
// 1. Create a `decorateResponse` function that receives the Youtube API response
// 2. Map through the response object's `items` array
// 3. Return an array of objects, where each object contains the keys `id`, `title`, 
// `thumbnail` which each hold the appropriate values from the API item object. You 
// WILL have to dig into several nested properties!
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
const decorateResponse = function(response) {
  const test = response.items.map(val => {
    return {
      id: val.id,
      title: val.snippet.title,
      thumbnail: val.snippet.thumbnails.default
    };
  });
  addVideosToStore(test);
  render();
};

// TASK:
// 1. Create a `generateVideoItemHtml` function that receives the decorated object
// 2. Using the object, return an HTML string containing all the expected data
// TEST IT!
const generateVideoItemHtml = function(video) {
  return  `
    <li>
       <h2 class = "js-title">${video.title}</h2>
       <img class = "js-img" src="${video.thumbnail.url}">
    </li>`;
};

// TASK:
// 1. Create a `addVideosToStore` function that receives an array of decorated video 
// objects and sets the array as the value held in store.items
// TEST IT!
const addVideosToStore = function(videos) {
  store.videos = videos;
};

// TASK:
// 1. Create a `render` function
// 2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
// 3. Add your array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
  const videoElements = store.videos.map(generateVideoItemHtml);
  $('.results').html(videoElements);
};

// TASK:
// 1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!
const handleFormSubmit = function () {
  // $('.js-button').click(function(event) {
  //   event.preventDefault();
  //   console.log('something');
  // })
  $('form').on('click', '.js-button', function(event){
    event.preventDefault();
    console.log('click');
    const searchVal = $('#search-term').val();
    $('#search-term').val('');
    fetchVideos(searchVal, decorateResponse);
  });
};

// When DOM is ready:
$(function () {
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
  handleFormSubmit();
});

