var MyAPP = angular.module('MyAPP',['ngMaterial','ngMessages']);

MyAPP.controller('MyCtrl', function($rootScope, $scope, $mdDialog,$mdMedia,$location,$window,$timeout,$http) {
	
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
        $rootScope.currentMoney=0;

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
            $rootScope.nextLvlEXP = Math.pow($scope.currentLVL,2)*12 + $scope.currentLVL*8 + 10;
            $rootScope.characterMaxHP = $rootScope.characterMaxHP+10+Math.ceil($rootScope.currentSTR*0.2);
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
    };
    $scope.goToOutside = function() {
        $scope.currentLoc='Outside';
        $scope.imgUrl='/images/Outside.png';
    };
    $scope.goToCapitalRoad1 = function() {
        $scope.currentLoc='CapitalRoad1';
        $scope.imgUrl='/images/roadtocap1.png';

        var RNG = parseInt(getRandomInt(0,10),10);
        if (RNG > 5)
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
        else if (RNG > 5)
        {
            $scope.spawnEnemy("gslime");
        }
        else
        {
            $scope.spawnEnemy("slime");
        }

    };
    $scope.goToLake = function() {
        $scope.currentLoc='Lake';
        $scope.imgUrl='/images/lake.png';
        $scope.spawnEnemy("wolf");

    };
    $scope.goToCapitalRoad3 = function() {
        $scope.currentLoc='CapitalRoad3';
        $scope.imgUrl='/images/outsidecapital.png';
        $scope.spawnEnemy("slime");

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
            $scope.goToLake;
        }
        else if (location.localeCompare("CapitalRoad3")===0 )
        {
            $scope.goToCapitalRoad3();
        }
        else
        {
            $scope.goToTown();
        }
    }

    $scope.spawnEnemy = function(monName){
        if (monName.localeCompare("wolf")===0)
        {
            $rootScope.EnemyEXPreward=21;
            $rootScope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=100;
            $scope.EnemyPdef=1;
            $scope.EnemyPatk=12;
            $scope.enemyImgUrl='/images/wolfsmall.png';
        }
        else if (monName.localeCompare("rabbit")===0)
        {
            $rootScope.EnemyEXPreward=12;
            $rootScope.EnemyMoneyreward=parseInt(getRandomInt(10,250),10);
            $scope.EnemyMaxHP=40;
            $scope.EnemyPdef=1;
            $scope.EnemyPatk=5;
            $scope.enemyImgUrl='/images/rabbit.png';
        }
        else if (monName.localeCompare("greenslime")===0)
        {
            $rootScope.EnemyEXPreward=15;
            $rootScope.EnemyMoneyreward=parseInt(getRandomInt(10,20),10);
            $scope.EnemyMaxHP=45;
            $scope.EnemyPdef=5;
            $scope.EnemyPatk=5;
            $scope.enemyImgUrl='/images/gslime.png';
        }
        else
        {
            $rootScope.EnemyEXPreward=6;
            $rootScope.EnemyMoneyreward=0;
            $scope.EnemyMaxHP=22;
            $scope.EnemyPdef=2;
            $scope.EnemyPatk=2;
            $scope.enemyImgUrl='/images/slime.png';
        }

    }

    $scope.goToCombat = function() {
        $scope.EnemyHP=$scope.EnemyMaxHP;
        $scope.lastLoc=$scope.currentLoc;
        $scope.imgUrl='images/combat.png';
        $scope.currentLoc='Combat';
        $scope.EnemyHP = $scope.EnemyMaxHP;

    };

    $scope.attack = function() {
        $rootScope.characterHP=$rootScope.characterHP-$scope.EnemyPatk;
        $scope.EnemyHP=$scope.EnemyHP-(parseInt($scope.getNormalAttackDamage(),10)-$scope.EnemyPdef);
        if ($rootScope.characterHP <= 0)
        {
            defeat();
        }
        else if ($scope.EnemyHP <= 0) {
            victory();
        }
    }
    $scope.getNormalAttackDamage = function(){
        var low = Math.ceil(0.01*$rootScope.currentSTR+0.25*$rootScope.currentDEX);
        var high = Math.ceil($rootScope.currentSTR+0.5*$rootScope.currentDEX);
        return parseInt(getRandomInt(low,high),10);
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
        $rootScope.currentEXP=$rootScope.currentEXP+$scope.EnemyEXPreward;
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
        $scope.goToLocation("Town");
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
    $scope.goToRest = function(ev) {
        $rootScope.characterHP=$rootScope.characterMaxHP;

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


