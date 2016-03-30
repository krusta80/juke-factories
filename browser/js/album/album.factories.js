juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFactory', function ($log,$http,$q) {
  var statsObj = {};
  
  statsObj.fetchAll = function(id) {
    return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
      .then(function (albums) {
        return $http.get('/api/albums/' + albums[0]._id); // temp: get one
      })
      .then(function (res) { return res.data })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  statsObj.fetchById = function(id) {
    return $http.get('/api/albums/'+id)
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };
  
  statsObj.loadAlbum = function(album) {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    
    return album;
  };
    
  return statsObj;
});

juke.factory('AlbumsFactory', function ($log,$http,$q,$rootScope) {
  var statsObj = {};
  
  statsObj.fetchAll = function(id) {
    return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  statsObj.fetchById = function(id) {
    $http.get('/api/albums/'+id)
      .then(function (res) { return res.data; })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
  };

  $rootScope.showAlbums = true;
  
  return statsObj;
});

