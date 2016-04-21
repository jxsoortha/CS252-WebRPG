var MyAPP = angular.module('MyAPP',['ngMaterial','ngMessages']);

MyAPP.controller('MyCtrl', function($rootScope, $scope, $mdDialog,$mdMedia,$location,$window,$timeout) {

    $scope.login = function(charName) {

        $rootScope.currentCharName=charName;
        $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    }


    $scope.goToTown = function() {
        $scope.currentLoc='Town';
        $scope.imgUrl='/images/startervillage.png';
    };
    $scope.goToOutside = function() {
      $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    };
    $scope.characterMaxHP=50;
    $scope.EnemyMaxHP=50;

    $scope.goToCombat = function() {
        $scope.characterHP=$scope.characterMaxHP;
        $scope.EnemyHP=$scope.EnemyMaxHP;
        $scope.currentLoc='Combat';
        $scope.imgUrl='/images/Combat.jpg';
        $scope.enemyImgUrl='/images/slime.png';


    };

    $scope.attack = function() {
        $scope.characterHP=$scope.characterHP-5;
        $scope.EnemyHP=$scope.EnemyHP-10;
        if ($scope.EnemyHP <= 0) {
            victory();
        }
    }
    $scope.run = function() {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('You successfully escaped from combat.')

                .ok('Cancel')

        );
        $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    }
    var victory = function() {
        $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
        showVict();
    }


    var showVict = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: "MyCtrl",
            templateUrl: 'victory.html',
            parent: angular.element(document.body),
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

    var charString = 'Knight,10,20,30';
    var charInfo = charString.split(',');


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
            controller: "MyCtrl",
            templateUrl: 'dialog.html',
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

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };



});
function DialogController($scope, $mdDialog) {

}


