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
            url: '/auth',
            data: fh.data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
            if (data=='empty') {
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
                $rootScope.characterMP=$rootScope.characterMaxMP;
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
            } else if (data=='wrongPWD') {
            	$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Your password is wrong.')

                .ok('Cancel')
        );
            } else if (data=='validPWD'){
            	var fh = new FormHelper();
            	fh.append("name",charName);
            	$http({
            		method: 'POST',
            		url: '/getCharInfo',
            		data: fh.data,
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            	}).success(function(data) {
            		var array = data.split(',');
            		$rootScope.currentSTR=parseInt(array[0], 10);
       	 			$rootScope.currentDEX=parseInt(array[1], 10);
      				$rootScope.currentINT=parseInt(array[2], 10);
   					$rootScope.currentLUK=parseInt(array[3], 10);
                	$rootScope.currentLVL=parseInt(array[5], 10);
             	    $rootScope.currentEXP=parseInt(array[4], 10);
              	    $rootScope.nextLvlEXP=parseInt(array[6], 10);
              	    $rootScope.currentSP=parseInt(array[7], 10);
               	    $rootScope.characterMaxHP=parseInt(array[8], 10);
                	$rootScope.characterMaxMP=parseInt(array[9], 10);
                	$rootScope.characterHP=$rootScope.characterMaxHP;
                	$rootScope.characterMP=$rootScope.characterMaxMP;
                	$rootScope.currentMoney=parseInt(array[10], 10);
                	$rootScope.currentPotions=parseInt(array[11], 10);
                	$rootScope.currentBombs=parseInt(array[12], 10);
                	$scope.goToLocation("Town");
            	}); 
            		
            	}
            }
        ).error(function(data,status) {
  			console.log(status);      	
        });
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
	$scope.update = function(){
		var fh = new FormHelper();
		fh.append("name", $rootScope.currentCharName);
        fh.append("str", $rootScope.currentSTR);
        fh.append("dex",$rootScope.currentDEX);
 		fh.append("int", $rootScope.currentINT);
 		fh.append("luk",$rootScope.currentLUK);
 		fh.append("exp",$rootScope.currentEXP);
 		fh.append("level",$rootScope.currentLVL);
 		fh.append("nextlvlexp", $rootScope.nextLvlEXP);
 		fh.append("sp", $rootScope.currentSP);
 		fh.append("maxhp",$rootScope.characterMaxHP);
 		fh.append("maxmp",$rootScope.characterMaxMP);
 		fh.append("money",$rootScope.currentMoney);
 		fh.append("potions",$rootScope.currentPotions);
 		fh.append("bombs",$rootScope.currentBombs);
        $http({
            method: 'POST',
            url: '/update',
            data: fh.data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data) {
        });
	};
    $scope.goToTown = function() {
        $scope.currentLoc='Town';
        $scope.imgUrl='/images/startervillage.png';
        $scope.checkLvlUp();
        $rootScope.characterHP=$rootScope.characterMaxHP;
        $rootScope.characterMP=$rootScope.characterMaxMP;
        $scope.update();
    };
    $scope.goToCapital = function() {
        $scope.currentLoc='Capital';
        $scope.imgUrl='/images/capital.png';
        $scope.checkLvlUp();
        $rootScope.characterHP=$rootScope.characterMaxHP;
        $rootScope.characterMP=$rootScope.characterMaxMP;
        $scope.update();
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
    $scope.goToValley = function() {
        $scope.currentLoc='Valley';
        $scope.imgUrl='/images/valley1.png';
        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG === 0)
        {
            //attacked on entry
            $scope.spawnEnemy("wolf");
            $scope.goToCombat();
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)

                    .textContent('You have been ambushed!')

                    .ok('Cancel')
            );
        }
        else if (RNG > 3)
        {
            $scope.spawnEnemy("redslime");
        }
        else
        {
            $scope.spawnEnemy("wolf");
        }

    };
    $scope.goToCaveEntrance = function() {
        $scope.currentLoc='CaveEntrance';
        $scope.imgUrl='/images/valley2.png';
        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG === 0)
        {
            //attacked on entry
            $scope.spawnEnemy("eyebat");
            $scope.goToCombat();
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)

                    .textContent('You have been ambushed!')

                    .ok('Cancel')
            );
        }
        else if (RNG === 9)
        {
        	$scope.spawnEnemy("ironrabbit");
        }
        else if (RNG > 3)
        {
            $scope.spawnEnemy("wolf");
        }
        else
        {
            $scope.spawnEnemy("eyebat");
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
        else if (location.localeCompare("Valley")===0 )
        {
            $scope.goToValley();
        }
        else if (location.localeCompare("CaveEntrance")===0 )
        {
            $scope.goToCaveEntrance();
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
        if (location.localeCompare("CapitalRoad3")===0 || location.localeCompare("Capital")===0 || location.localeCompare("Valley")===0 || location.localeCompare("CaveEntrance")===0 )
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
            $rootScope.currentMoney = $rootScope.currentMoney -50;
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
            $rootScope.EnemyPdef=15;
            $rootScope.EnemyMdef=0;
            $scope.EnemyPatk=18;
            $scope.enemyImgUrl='/images/wolfsmall.png';
        }
        else if (monName.localeCompare("eyebat")===0)
        {
        	$scope.EnemyLevel=12;
            $scope.EnemyEXPreward=155;
            $scope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=255;
            $rootScope.EnemyPdef=0;
            $rootScope.EnemyMdef=15;
            $scope.EnemyPatk=10;
            $scope.enemyImgUrl='/images/eyebatsmall.png';
        }
        else if (monName.localeCompare("ironrabbit")===0)
        {
        	$scope.EnemyLevel=20;
            $scope.EnemyEXPreward=999;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(512,2048),10);
            $scope.EnemyMaxHP=999;
            $rootScope.EnemyPdef=20;
            $rootScope.EnemyMdef=20;
            $scope.EnemyPatk=30;
            $scope.enemyImgUrl='/images/ironrabbit.png';
        }
        else if (monName.localeCompare("rabbit")===0)
        {
        	$scope.EnemyLevel=5;
            $scope.EnemyEXPreward=32;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(50,250),10);
            $scope.EnemyMaxHP=90;
            $rootScope.EnemyPdef=5;
            $rootScope.EnemyMdef=0;
            $scope.EnemyPatk=16;
            $scope.enemyImgUrl='/images/rabbit.png';
        }
        else if (monName.localeCompare("greenslime")===0)
        {
        	$scope.EnemyLevel=3;
            $scope.EnemyEXPreward=18;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(10,20),10);
            $scope.EnemyMaxHP=40;
            $rootScope.EnemyPdef=0;
            $rootScope.EnemyMdef=-2;
            $scope.EnemyPatk=5;
            $scope.enemyImgUrl='/images/gslime.png';
        }
        else if (monName.localeCompare("redslime")===0)
        {
        	$scope.EnemyLevel=5;
            $scope.EnemyEXPreward=35;
            $scope.EnemyMoneyreward=parseInt(getRandomInt(20,50),10);
            $scope.EnemyMaxHP=120;
            $rootScope.EnemyPdef=0;
            $rootScope.EnemyMdef=-2;
            $scope.EnemyPatk=8;
            $scope.enemyImgUrl='/images/rslime.png';
        }
        else
        {
        	$scope.EnemyLevel=1;
            $scope.EnemyEXPreward=6;
            $scope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=15;
            $rootScope.EnemyPdef=0;
            $rootScope.EnemyMdef=-2;
            $scope.EnemyPatk=2;
            $scope.enemyImgUrl='/images/slime.png';
        }

    };

    $scope.goToCombat = function() {
        $scope.lastLoc=$scope.currentLoc;
        $scope.imgUrl='images/combat2.png';
        $scope.currentLoc='Combat';
        $scope.EnemyHP = $scope.EnemyMaxHP;

    };

    $scope.attack = function() {
        $scope.EnemyHP=$scope.EnemyHP-Math.max(1,parseInt($scope.getNormalAttackDamage(),10)-$rootScope.EnemyPdef);
		$scope.advenceTurn();
    };
    
    $scope.usePotion = function() {
    	if ($rootScope.currentPotions > 0)
    	{
        	$rootScope.characterHP=$rootScope.characterHP+100;
        	$rootScope.characterMP=$rootScope.characterMP+100;
        	if ($rootScope.characterHP > $rootScope.characterMaxHP)
        	{
        		$rootScope.characterHP=$rootScope.characterMaxHP;
       		}
       		if ($rootScope.characterMP > $rootScope.characterMaxMP)
        	{
        		$rootScope.characterMP=$rootScope.characterMaxMP;
       		}
       		$rootScope.currentPotions=$rootScope.currentPotions-1;
			$scope.advenceTurn();
		}

    }
    
    $scope.useBomb = function() {
    	if ($scope.currentBombs > 0)
    	{
    		$rootScope.currentBombs=$rootScope.currentBombs-1;
        	$scope.EnemyHP=$scope.EnemyHP-Math.max(1,parseInt($scope.getBombDamage(),10));
			$scope.advenceTurn();
		}

    }
    
    $scope.advenceTurn = function() {
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
    $scope.getMagicDamage = function(){
        var low = parseInt($scope.getLowMagicDamage(),10);
        var high = parseInt($scope.getHighMagicDamage(),10);
        return parseInt(getRandomInt(low,high),10);
    }
    $scope.getLowDamage = function(){
    	return Math.ceil(0.2*$rootScope.currentSTR+0.25*$rootScope.currentDEX);
    };
    $scope.getHighDamage = function(){
    	return Math.ceil(1.2*$rootScope.currentSTR+0.5*$rootScope.currentDEX);
    };
    $scope.getLowMagicDamage = function(){
    	return Math.ceil(0.5*$rootScope.currentINT+0.1*$rootScope.currentLUK);
    };
    $scope.getHighMagicDamage = function(){
    	return Math.ceil(2*$rootScope.currentINT+0.2*$rootScope.currentLUK);
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

    $scope.useSkill = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $rootScope.usedSkill = 0;
        $rootScope.skillDamage = 0;
        $mdDialog.show({
            controller: "MyCtrl",
            templateUrl: 'useSkill.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        }).then(function() {
			if ($rootScope.usedSkill===1)
        	{
       		 	$rootScope.usedSkill=0;
        		$scope.EnemyHP = $scope.EnemyHP - $rootScope.skillDamage;
        		$scope.advenceTurn();
    		}
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
    
    $scope.vsMagicStrike = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('MagicStrike. Costs 8 MP. A basic but effective magical attack with damage based mostly on INT and somewhat on LUK. Requires 5 INT')

                .ok('Cancel')
        );
    };
    $scope.vsSyphon = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Syphon. Costs 15 MP and 1 Potion. Drain Health from your enemies. Requires 15 INT')

                .ok('Cancel')
        );
    };
    $scope.vsBrutalSlash = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Brutal Slash. Costs 12 MP. Pierce through defenses and strike with three times your normal might. Requires 30 STR')

                .ok('Cancel')
        );
    };
    $scope.vsCritical = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Critical. Costs 1 MP. Attacks with the normal attack\'s max damage. Requires 10 LUK')

                .ok('Cancel')
        );
    };
    $scope.vsFlashBomb = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Flash Bomb. Costs 15 MP and 1 Bomb. Throw a modified bomb to pierce defenses and do more damage. Requires 25 LUK')

                .ok('Cancel')
        );
    };
    $scope.vsSmite = function() {
		$mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)

                .textContent('Smite. Costs 25 MP and 3 Bombs. Rain explosives down on your adversary. Requires 50 LUK')

                .ok('Cancel')
        );
    };
    
    $scope.usMagicStrike = function() {
    	
    	if ($rootScope.characterMP >= 8)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 8;
			$rootScope.skillDamage=Math.max(1,parseInt($scope.getMagicDamage(),10)-$rootScope.EnemyMdef);
		}
		$mdDialog.hide();
    };
    $scope.usSyphon = function() {
    	
    	if ($rootScope.characterMP >= 15 & $rootScope.currentBombs >= 1)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 15;
    		$rootScope.currentPotions = $rootScope.currentPotions - 1;
			$rootScope.skillDamage=Math.max(1,parseInt($scope.getMagicDamage(),10)-$rootScope.EnemyMdef);
			$rootScope.characterHP = $rootScope.characterHP + $rootScope.skillDamage;
			if ($rootScope.characterHP > $rootScope.characterMaxHP)
			{
				$rootScope.characterHP = $rootScope.characterMaxHP;
			}
		}
		$mdDialog.hide();
    };
    $scope.usBrutalSlash = function() {
    	if ($rootScope.characterMP >= 12)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 12;
			$rootScope.skillDamage=Math.max(1,parseInt($scope.getNormalAttackDamage()*3,10));
		}
		$mdDialog.hide();
    };
    $scope.usCritical = function() {
    	if ($rootScope.characterMP >= 1)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 1;
			$rootScope.skillDamage=Math.max(1,parseInt($scope.getHighDamage(),10)-$rootScope.EnemyPdef);
		}
		$mdDialog.hide();
    };
    $scope.usFlashBomb = function() {

    	if ($rootScope.characterMP >= 15 & $rootScope.currentBombs >= 1)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 15;
    		$rootScope.currentBombs = $rootScope.currentBombs - 1;
			$rootScope.skillDamage=Math.max(1,Math.ceil(15+parseInt($scope.getBombDamage(),10)*1.5));
		}
		$mdDialog.hide();
    };
    $scope.usSmite = function() {

    	if ($rootScope.characterMP >= 25 & $rootScope.currentBombs >= 3)
    	{
    		$rootScope.usedSkill = 1;
    		$rootScope.characterMP = $rootScope.characterMP - 25;
    		$rootScope.currentBombs = $rootScope.currentBombs - 3;
			$rootScope.skillDamage=Math.max(1,25+parseInt($scope.getBombDamage(),10)*3);
		}
		$mdDialog.hide();
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


