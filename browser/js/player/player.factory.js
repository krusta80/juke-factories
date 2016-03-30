'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var playerObj = {};
  var songs;
  var currentSong = null;
  var playing = false;
  var progress = 0;
  
  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  audio.addEventListener('ended', function () {
    playerObj.next();
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!currentSong) return;
    var index = currentSong.albumIndex;
    index = mod( (index + (interval || 1)), songs.length );
    if (playing) playerObj.start(songs[index]);
  };

  playerObj.start = function(song,songList) {
  	if(songList) songs = songList;
  	// stop existing audio (e.g. other song) in any case
    playerObj.pause();
    playing = true;
    // resume current song
    if (song === currentSong) return audio.play();
    // enable loading new song
    currentSong = song;
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
  };

  playerObj.pause = function() {
  	// stop existing audio (e.g. other song) in any case
    audio.pause();
    playing = false;
  };

  playerObj.resume = function() {
  	// stop existing audio (e.g. other song) in any case
    audio.play();
    playing = true;
  };

  playerObj.toggle = function(song,songList) {
  	if(song === currentSong) {
  		if(playing) playerObj.pause();
  		else playerObj.resume();
  	}
  	else playerObj.start(song,songList);
  };

  playerObj.isPlaying = function() {
  	return playing;
  };

  playerObj.getCurrentSong = function() {
  	return currentSong;
  };

  playerObj.next = function () { skip(1); };
  
  playerObj.previous = function () { skip(-1); };
  
  playerObj.getProgress = function () {
  	return progress;
  };

  return playerObj;
});
