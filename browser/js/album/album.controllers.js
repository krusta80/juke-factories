'use strict';

juke.controller('AlbumCtrl', function(AlbumFactory, PlayerFactory, StatsFactory, $scope, $rootScope, $log) {

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    PlayerFactory.start(null,album.songs);
    StatsFactory.totalTime(album)
    .then(function (albumDuration) {
        console.log("duration is "+albumDuration);
        $scope.fullDuration = albumDuration;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  function pause () {
    PlayerFactory.pause();
  }
  function play (event, song) {
    PlayerFactory.start(song);
  };

  function next () { PlayerFactory.next(); };
  function prev () { PlayerFactory.previous(); };

});

juke.controller('AlbumsCtrl', function(AlbumsFactory, $scope, $rootScope, $log) {
  
  AlbumsFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums.map(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songCount = album.songs.length;
      return album;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
});