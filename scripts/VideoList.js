'use strict';
/* global index, store, VideoList, api, $*/
const VideoList = (function(){
  function generateListItem(video){
    return  `
    <li>
       <h2 class = "js-title">${video.title}</h2>
       <img class = "js-img" src="${video.thumbnail.url}">
    </li>`;
  }
  function render(){
    const videoElements = store.videos.map(generateListItem);
    $('.results').html(videoElements);
  }
  const decorateResponse = function(response) {
    return response.items.map(val => {
      return {
        id: val.id,
        title: val.snippet.title,
        thumbnail: val.snippet.thumbnails.default
      };
    });

  };
  function handleFormSubmit(){
    $('form').on('click', '.js-button', function(event){
      event.preventDefault();
      const searchVal = $('#search-term').val();
      $('#search-term').val('');
      api.fetchVideos(searchVal, videos => {
        const decorateVideos = decorateResponse(videos);
        store.setVideos(decorateVideos);
        render();
      });
    });
  }
  function bindEventListeners()
  {
    handleFormSubmit();
  }
  return{
    generateListItem,
    render,
    bindEventListeners,
  };
})();