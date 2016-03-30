juke.factory('ArtistsFactory', function ($log,$http,$q,$rootScope) {
  var statsObj = {};
  
  statsObj.fetchAll = function() {
    return $http.get('/api/artists/')
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  statsObj.fetchById = function(id) {
    return $http.get('/api/artists/'+id)
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  statsObj.fetchAlbums = function(id) {
    return $http.get('/api/artists/'+id+'/albums')
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  $rootScope.showArtists = true;
  
  return statsObj;
});