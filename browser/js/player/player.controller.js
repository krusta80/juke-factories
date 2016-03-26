'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory, $rootScope) {
  
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song);
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  function pause () {
    PlayerFactory.pause();
  }
  function play (event, song){
    return PlayerFactory.start(song);
  }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { PlayerFactory.next(); };
  $scope.prev = function () { PlayerFactory.previous(); };

});
