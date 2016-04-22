var MyAPP = angular.module('MyAPP',['ngMaterial','ngMessages']);

MyAPP.controller('MyCtrl', function($rootScope, $scope, $mdDialog,$mdMedia,$location,$window,$timeout) {

    $scope.login = function(charName) {

        $rootScope.currentCharName=charName;
        
        $rootScope.currentSTR=5;
        $rootScope.currentDEX=5;
        $rootScope.currentINT=5;
        $rootScope.currentLUK=5;
        $rootScope.currentLVL=1;
        $rootScope.currentEXP=0;
        $rootScope.characterMaxHP=50;
        
        $scope.currentLoc='Town';
        $scope.imgUrl='/images/statervillage.png';
    }


    $scope.goToTown = function() {
        $scope.currentLoc='Town';
        $scope.imgUrl='/images/startervillage.png';
        if ($scope.currentEXP >= 100)
        {
        	$rootScope.currentLVL=$rootScope.currentLVL+1;
        	$rootScope.currentEXP = $rootScope.currentEXP - 100;
        	$rootScope.currentSTR = $rootScope.currentSTR+5;
        	$rootScope.characterMaxHP = $rootScope.characterMaxHP+10+Math.ceil($rootScope.currentSTR*0.2);
        }
    };
    $scope.goToOutside = function() {
      $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    };
    $scope.goToCapitalRoad1 = function() {
      $scope.currentLoc='CapitalRoad1';
        $scope.imgUrl='/images/roadtocap1.png';
        $scope.spawnEnemy("slime");
    };
    $scope.goToCapitalRoad2 = function() {
      $scope.currentLoc='CapitalRoad2';
        $scope.imgUrl='/images/Outside.png';
        $scope.spawnEnemy("wolf");
    };
    $scope.goToLocation = function(location) {
    	if (location.localeCompare("CapitalRoad1")==0 )
    	{
    		$scope.goToCapitalRoad1();
    	}
    	else if (location.localeCompare("CapitalRoad2")==0 )
    	{
    		$scope.goToCapitalRoad2();
    	}
    	else
    	{
			$scope.goToTown();
    	}
    }
    
	$scope.spawnEnemy = function(monName){
		if (monName.localeCompare("wolf")==0)
		{
			$scope.EnemyEXPreward=28;
       	 	$scope.EnemyMoneyreward=0;
       		$scope.EnemyMaxHP=100;
      	  	$scope.EnemyPdef=2;
       	 	$scope.EnemyPatk=12;
      	  	$scope.enemyImgUrl='/images/wolfsmall.png';
   	 	}
   	 	else
   	 	{
   	 		$scope.EnemyEXPreward=3;
       	 	$scope.EnemyMoneyreward=0;
       		$scope.EnemyMaxHP=50;
      	  	$scope.EnemyPdef=5;
       	 	$scope.EnemyPatk=1;
      	  	$scope.enemyImgUrl='/images/slime.png';
   	 	}

	}

    $scope.goToCombat = function() {
        $scope.characterHP=$scope.characterMaxHP;
        $scope.EnemyHP=$scope.EnemyMaxHP;
        $scope.lastLoc=$scope.currentLoc;
        $scope.imgUrl='images/combat.png';
        $scope.currentLoc='Combat';
        $scope.EnemyHP = $scope.EnemyMaxHP;

    };

    $scope.attack = function() {
        $scope.characterHP=$scope.characterHP-$scope.EnemyPatk;
        $scope.EnemyHP=$scope.EnemyHP-(parseInt($scope.getNormalAttackDamage(),10)-$scope.EnemyPdef);
        if ($scope.characterHP <= 0)
        {
        	defeat();
        }
        if ($scope.EnemyHP <= 0) {
            victory();
        }
    }
	$scope.getNormalAttackDamage = function(){
		return Math.ceil($rootScope.currentSTR+0.5*$rootScope.currentDEX+5);
	}
    $scope.run = function() {
    	$scope.goToLocation($scope.lastLoc);
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('You successfully escaped from combat.')

                .ok('Cancel')

        );
    }
    var victory = function() {
        $scope.goToLocation($scope.lastLoc);
        $rootScope.currentEXP=$rootScope.currentEXP+$scope.EnemyEXPreward;
        showVict();
    }
    var defeat = function() {
    	$scope.goToLocation("Town");
        $scope.currentEXP=0;
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


