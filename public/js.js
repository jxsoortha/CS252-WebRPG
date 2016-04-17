	var MyAPP = angular.module('MyAPP',['ngMaterial','ngMessages',]);
	MyAPP.controller('MyCtrl', function($scope, $mdDialog,$mdMedia,$location,$window) {
		$scope.name="Xu";
		$scope.goToTown = function() {
			$window.location.href='/Town.html';
		};
		
		$scope.backToIndex = function() {
			$window.history.back();
		};
		
	var originEv;
	$scope.openMenu = function($mdOpenMenu, ev) {
 	 originEv = ev;
	  $mdOpenMenu(ev);
  };
$scope.status = '  ';
$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
$scope.showCharacter = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
  $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    }).then(function() {
    
  });
$scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
};
  });
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}