juke.controller('SidebarCtrl', function(ManagementFactory, AlbumsFactory, PlayerFactory, $scope, $rootScope, $log) {
	$scope.viewAlbums = function() {
		ManagementFactory.setView('showAlbums');
	}
 	$scope.viewArtists = function() {
		ManagementFactory.setView('showArtists');
	};
});