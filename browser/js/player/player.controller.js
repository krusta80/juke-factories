'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory, $rootScope) {
  
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  $scope.next = function () { 
    PlayerFactory.next(); 
  };
  
  $scope.prev = function () { 
    PlayerFactory.previous(); 
  };

  $scope.progress = function() {
    return PlayerFactory.getProgress();
  };

});
