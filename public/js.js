var MyAPP = angular.module('MyAPP',['ngMaterial','ngMessages']);

MyAPP.controller('MyCtrl', function($rootScope, $scope, $mdDialog,$mdMedia,$location,$window,$timeout,$http) {
	
	$scope.imgUrl='/images/treehouse.jpg';
	
    function FormHelper() {
        this.data = "";

        this.append = function(name, val) {
            if (this.data.length > 0) {
                this.data += "&";
            }
            this.data += encodeURIComponent(name);
            this.data += "=";
            this.data += encodeURIComponent(val);
        };
    }

    $scope.imgUrl='/images/treehouse.jpg';

	
    function FormHelper() {
        this.data = "";

        this.append = function(name, val) {
            if (this.data.length > 0) {
                this.data += "&";
            }
            this.data += encodeURIComponent(name);
            this.data += "=";
            this.data += encodeURIComponent(val);
        };
    }

    $scope.login = function(charName,charPassword) {

        $rootScope.currentCharName = charName;
        var fh = new FormHelper();
        fh.append("name",charName);
        fh.append("pwd",charPassword);
        $http({
            method: 'POST',
            url: '/addNewCharacter',
            data: fh.data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            console.log(data);
        }).error(function(data,status) {
  			console.log(status);      	
        });


        $rootScope.currentSTR=1;
        $rootScope.currentDEX=1;
        $rootScope.currentINT=1;
        $rootScope.currentLUK=1;
        $rootScope.currentLVL=1;
        $rootScope.currentEXP=0;
        $rootScope.nextLvlEXP=30;
        $rootScope.currentSP=16;
        $rootScope.characterMaxHP=50;
        $rootScope.characterMaxMP=20;
        $rootScope.characterHP=$rootScope.characterMaxHP;
        $rootScope.characterMP=$rootScope.characterMaxMP=$rootScope.characterMaxMP;
        $rootScope.currentMoney=100;
        $rootScope.currentPotions=0;
        $rootScope.currentBombs=0;

        $scope.goToLocation("Town");
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Welcome! Please use the menu button on the top right corner to assign stat points(SP) to your character!')

                .ok('Cancel')
        );

    };

    $scope.checkLvlUp = function(){
        if ($rootScope.currentEXP >= $rootScope.nextLvlEXP)
        {
            $rootScope.currentLVL=$rootScope.currentLVL+1;
            $rootScope.currentSP=$rootScope.currentSP+5;
            $rootScope.currentEXP = $rootScope.currentEXP - $rootScope.nextLvlEXP;
            $rootScope.nextLvlEXP = Math.pow($scope.currentLVL,2)*2 + $scope.currentLVL*13 + 15;
            $rootScope.characterMaxHP = $rootScope.characterMaxHP+10+Math.ceil($rootScope.currentSTR*0.2);
            $rootScope.characterMaxMP = $rootScope.characterMaxMP+2+Math.ceil($rootScope.currentINT*0.8);
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)

                    .textContent('You leveled up! Go to the characted menu to assign Stat Points!')

                    .ok('Cancel')
            );
        }
    };

    $scope.goToTown = function() {
        $scope.currentLoc='Town';
        $scope.imgUrl='/images/startervillage.png';
        $scope.checkLvlUp();
        $rootScope.characterHP=$rootScope.characterMaxHP;
        $rootScope.characterMP=$rootScope.characterMaxMP;
    };
    $scope.goToCapital = function() {
        $scope.currentLoc='Capital';
        $scope.imgUrl='/images/capital.png';
        $scope.checkLvlUp();
        $rootScope.characterHP=$rootScope.characterMaxHP;
        $rootScope.characterMP=$rootScope.characterMaxMP;
    };
    
    $scope.goToOutside = function() {
        $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    };
    $scope.goToCapitalRoad1 = function() {
        $scope.currentLoc='CapitalRoad1';
        $scope.imgUrl='/images/roadtocap1.png';

        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG > 9)
        {
            $scope.spawnEnemy("greenslime");
        }
        else
        {
            $scope.spawnEnemy("slime");
        }

    };
    $scope.goToCapitalRoad2 = function() {
        $scope.currentLoc='CapitalRoad2';
        $scope.imgUrl='/images/caproad2.png';

        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG === 0)
        {
            //attacked on entry
            $scope.spawnEnemy("slime");
            $scope.goToCombat();
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)

                    .textContent('You have been ambushed!')

                    .ok('Cancel')
            );
        }
        else if (RNG > 2)
        {
            $scope.spawnEnemy("greenslime");
        }
        else
        {
            $scope.spawnEnemy("slime");
        }

    };
    $scope.goToLake = function() {
        $scope.currentLoc='Lake';
        $scope.imgUrl='/images/lake.png';
        $scope.spawnEnemy("rabbit");

    };
    $scope.goToCapitalRoad3 = function() {
        $scope.currentLoc='CapitalRoad3';
        $scope.imgUrl='/images/outsidecapital.png';
        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG > 4)
        {
            $scope.spawnEnemy("greenslime");
        }
        else
        {
            $scope.spawnEnemy("slime");
        }

    };
    $scope.goToLocation = function(location) {
        if (location.localeCompare("CapitalRoad1")===0 )
        {
            $scope.goToCapitalRoad1();
        }
        else if (location.localeCompare("CapitalRoad2")===0 )
        {
            $scope.goToCapitalRoad2();
        }
        else if (location.localeCompare("Lake")===0 )
        {
            $scope.goToLake();
        }
        else if (location.localeCompare("CapitalRoad3")===0 )
        {
            $scope.goToCapitalRoad3();
        }
        else if (location.localeCompare("Capital")===0 )
        {
            $scope.goToCapital();
        }
        else
        {
            $scope.goToTown();
        }
    }
    $scope.goToNearestTown = function(location) {
        if (location.localeCompare("CapitalRoad3")===0 || location.localeCompare("Capital")===0)
        {
            $scope.goToCapital();
        }
		else
        {
            $scope.goToTown();
        }
    }
    
    $scope.goToShop = function() {
    	$scope.lastLoc=$scope.currentLoc;
    	$scope.currentLoc='Shop';
    	$scope.enemyImgUrl='/images/shop1.png';
    	$scope.imgUrl='images/combat.png';
    }
    $scope.buyBomb = function(){
    	if ($rootScope.currentMoney >= 120)
        {
            $rootScope.currentBombs = $rootScope.currentBombs + 1;
            $rootScope.currentMoney = $rootScope.currentMoney -120;
        }
    }
    $scope.buyPotion = function(){
    	if ($rootScope.currentMoney >= 50)
        {
            $rootScope.currentPotions = $rootScope.currentPotions + 1;
            $rootScope.currentMoney = $rootScope.currentMoney -10;
        }
    }
    $scope.leaveShop = function(){
    	$scope.goToLocation($scope.lastLoc);
    }

    $scope.spawnEnemy = function(monName){
        if (monName.localeCompare("wolf")===0)
        {
        	$scope.EnemyLevel=10;
            $scope.EnemyEXPreward=86;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(50,70),10);
            $scope.EnemyMaxHP=200;
            $scope.EnemyPdef=5;
            $scope.EnemyPatk=18;
            $scope.enemyImgUrl='/images/wolfsmall.png';
        }
        else if (monName.localeCompare("eyebat")===0)
        {
        	$scope.EnemyLevel=11;
            $scope.EnemyEXPreward=91;
            $scope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=255;
            $scope.EnemyPdef=0;
            $scope.EnemyPatk=10;
            $scope.enemyImgUrl='/images/ironrabbit.png';
        }
        else if (monName.localeCompare("ironrabbit")===0)
        {
        	$scope.EnemyLevel=20;
            $scope.EnemyEXPreward=255;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(512,2048),10);
            $scope.EnemyMaxHP=900;
            $scope.EnemyPdef=20;
            $scope.EnemyPatk=30;
            $scope.enemyImgUrl='/images/ironrabbit.png';
        }
        else if (monName.localeCompare("rabbit")===0)
        {
        	$scope.EnemyLevel=5;
            $scope.EnemyEXPreward=21;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(50,250),10);
            $scope.EnemyMaxHP=90;
            $scope.EnemyPdef=5;
            $scope.EnemyPatk=16;
            $scope.enemyImgUrl='/images/rabbit.png';
        }
        else if (monName.localeCompare("greenslime")===0)
        {
        	$scope.EnemyLevel=3;
            $scope.EnemyEXPreward=14;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(10,20),10);
            $scope.EnemyMaxHP=40;
            $scope.EnemyPdef=0;
            $scope.EnemyPatk=5;
            $scope.enemyImgUrl='/images/gslime.png';
        }
        else if (monName.localeCompare("redslime")===0)
        {
        	$scope.EnemyLevel=5;
            $scope.EnemyEXPreward=22;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(20,50),10);
            $scope.EnemyMaxHP=120;
            $scope.EnemyPdef=0;
            $scope.EnemyPatk=8;
            $scope.enemyImgUrl='/images/rslime.png';
        }
        else
        {
        	$scope.EnemyLevel=1;
            $scope.EnemyEXPreward=5;
            $scope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=15;
            $scope.EnemyPdef=0;
            $scope.EnemyPatk=2;
            $scope.enemyImgUrl='/images/slime.png';
        }

    }

    $scope.goToCombat = function() {
        $scope.lastLoc=$scope.currentLoc;
        $scope.imgUrl='images/combat2.png';
        $scope.currentLoc='Combat';
        $scope.EnemyHP = $scope.EnemyMaxHP;

    };

    $scope.attack = function() {
        $scope.EnemyHP=$scope.EnemyHP-Math.max(1,parseInt($scope.getNormalAttackDamage(),10)-$scope.EnemyPdef);
		$scope.advanceTurn();
    }
    
    $scope.usePotion = function() {
    	if ($rootScope.currentPotions > 0)
    	{
        	$rootScope.characterHP=$rootScope.characterHP+100;
        	$rootScope.characterMP=$rootScope.characterMP+50;
        	if ($rootScope.characterHP > $rootScope.characterMaxHP)
        	{
        		$rootScope.characterHP=$rootScope.characterMaxHP;
       		}
       		if ($rootScope.characterMP > $rootScope.characterMaxMP)
        	{
        		$rootScope.characterMP=$rootScope.characterMaxMP;
       		}
       		$rootScope.currentPotions=$rootScope.currentPotions-1;
			$scope.advanceTurn();
		}

    }
    
    $scope.useBomb = function() {
    	if ($scope.currentBombs > 0)
    	{
    		$rootScope.currentBombs=$rootScope.currentBombs-1;
        	$scope.EnemyHP=$scope.EnemyHP-Math.max(1,parseInt($scope.getBombDamage(),10));
			$scope.advanceTurn();
		}

    }
    
    $scope.advanceTurn = function() {
        $rootScope.characterHP=$rootScope.characterHP-$scope.EnemyPatk;
        if ($rootScope.characterHP <= 0)
        {
            defeat();
        }
        else if ($scope.EnemyHP <= 0) {
            victory();
        }
    }
    $scope.getBombDamage = function(){
    	var low = 20+Math.ceil(0.1*$rootScope.currentLUK+0.1*$rootScope.currentDEX);
        var high = 50+Math.ceil(0.4*$rootScope.currentLUK+0.2*$rootScope.currentDEX);
        return parseInt(getRandomInt(low,high),10);
    }
    $scope.getNormalAttackDamage = function(){
        var low = parseInt($scope.getLowDamage(),10);
        var high = parseInt($scope.getHighDamage(),10);
        return parseInt(getRandomInt(low,high),10);
    }
    $scope.getLowDamage = function(){
    	return Math.ceil(0.2*$rootScope.currentSTR+0.25*$rootScope.currentDEX);
    };
    $scope.getHighDamage = function(){
    	return Math.ceil(1.2*$rootScope.currentSTR+0.5*$rootScope.currentDEX);
    };
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
        $rootScope.currentEXP=$rootScope.currentEXP+$scope.EnemyEXPreward;
        $rootScope.currentMoney=$rootScope.currentMoney+$scope.EnemyMoneyreward;
        $rootScope.EnemyEXPreward = $scope.EnemyEXPreward;
        $rootScope.EnemyMoneyreward = $scope.EnemyMoneyreward;
        showVict();
        $scope.goToLocation($scope.lastLoc);
    }
    var defeat = function() {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('You have been defeated. Returning to nearest town.')

                .ok('Cancel')
        );
        $rootScope.currentEXP=0;
        $scope.goToNearestTown($scope.lastLoc);
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
    $scope.showInventory = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: "MyCtrl",
            templateUrl: 'inventory.html',
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
    $scope.showSkills = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: "MyCtrl",
            templateUrl: 'skills.html',
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

    $scope.addSTR = function() {
        if ($rootScope.currentSP > 0)
        {
            $rootScope.currentSTR = $rootScope.currentSTR + 1;
            $rootScope.currentSP = $rootScope.currentSP -1;
        }
    };
    $scope.addDEX = function() {
        if ($rootScope.currentSP > 0)
        {
            $rootScope.currentDEX = $rootScope.currentDEX + 1;
            $rootScope.currentSP = $rootScope.currentSP -1;
        }
    };
    $scope.addINT = function() {
        if ($rootScope.currentSP > 0)
        {
            $rootScope.currentINT = $rootScope.currentINT + 1;
            $rootScope.currentSP = $rootScope.currentSP -1;
        }
    };
    $scope.addLUK = function() {
        if ($rootScope.currentSP > 0)
        {
            $rootScope.currentLUK = $rootScope.currentLUK + 1;
            $rootScope.currentSP = $rootScope.currentSP -1;
        }
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


});
function DialogController($scope, $mdDialog) {

}


