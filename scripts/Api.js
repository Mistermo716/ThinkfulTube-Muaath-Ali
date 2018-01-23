'use strict';
/* global index, Store, VideoList, Api, $*/

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyATzDRzDQq8VAeRbF7TAI5vJIQlSSsWF58';

const api = (function () {
    function fetchVideos(searchTerm, callback){
        const search = {
            part: 'snippet',
            key: API_KEY,
            q: searchTerm
          };
          $.getJSON(BASE_URL, search, callback);
      }
return {
    fetchVideos,
    hello: 'world'
}
})();

