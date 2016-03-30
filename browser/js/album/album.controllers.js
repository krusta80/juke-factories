'use strict';

juke.controller('AlbumCtrl', function(ManagementFactory, AlbumFactory, PlayerFactory, StatsFactory, $scope, $rootScope, $log) {

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  $rootScope.$on('loadAlbum', function(event, data) {
    AlbumFactory.fetchById(data.id)
      .then(function(album) {
        $scope.album = AlbumFactory.loadAlbum(album);
        ManagementFactory.setView('showAlbum');
      });
  });
  
  console.log("album controller loaded..");

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song,$scope.album.songs);
  };

  function next () { PlayerFactory.next(); };

  function prev () { PlayerFactory.previous(); };

});

juke.controller('AlbumsCtrl', function(AlbumsFactory, $scope, $rootScope, $log) {
  
  $scope.loadAlbum = function(id) {
    $rootScope.$broadcast('loadAlbum', {id: id});
  }
  
  AlbumsFactory.fetchAll()
  .then(function (albums) {
    $scope.albums = albums.map(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.id = album._id;
      album.songCount = album.songs.length;
      return album;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
});