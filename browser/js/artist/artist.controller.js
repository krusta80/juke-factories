'use strict';

juke.controller('ArtistsCtrl', function(ArtistsFactory, ManagementFactory, $scope, $rootScope, $log) {

  ArtistsFactory.fetchAll()
  .then(function (artists) {
    $scope.artists = artists;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.loadArtist = function(id) {
    ArtistsFactory.fetchById(id)
    .then(function (artist) {
      ManagementFactory.setView('showOneArtist');
      $scope.artist = artist;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound  
  }
  
  $scope.loadArtistAlbums = function(id) {
    ArtistsFactory.fetchById(id)
    .then(function (artist) {
      ManagementFactory.setView('showOneArtist');
      $scope.artist = artist;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound  
  }
  
});