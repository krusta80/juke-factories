juke.factory('ManagementFactory', function ($log,$http,$q,$rootScope) {
	
	var mgmtObj = {};

	mgmtObj.reset = function() {
		$rootScope.views = {
			showArtists: false,
			showAlbums: false,
			showOneArtist: false,
			showAlbum: false	
		};
	};

	mgmtObj.setView = function(viewName) {
		mgmtObj.reset();
		$rootScope.views[viewName] = true;
	};

	return mgmtObj;
});