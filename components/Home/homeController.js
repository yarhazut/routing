angular.module('citiesApp')
 .controller('homeController', ['$scope', '$rootScope', '$location', '$http', 'setHeadersToken','localStorageModel','$rootScope', function ($scope, $rootScope, $location, $http, setHeadersToken,localStorageModel,$rootScope) {
 

    self = this;
    let serverUrl = setHeadersToken.serverUrl
    self.threePois = [];
    self.boolMap={};


    




    self.login = function () {


        let user = {
            username: $scope.userName,
            password: $scope.password
        }
       

        $http.post(serverUrl + "users/login", user)
        .then(function (response) {
            self.loginres=response.data
            console.log(response[0])
            console.log(response.data[0])
            console.log(response.data.message)
            if (response.data.message==="bad values")
                window.alert("you must insert user name and password")
            else if (response.data.message==="Authentication failed. Wrong Password")
                window.alert("Authentication failed. Wrong Password")
            else if (response.data.message==='Enjoy your token!')
            {
                //First function handles success
                self.login.content = response.data.token;
                //  setHeadersToken.set(self.login.content)
                  //////////////////////////////////////////////////////////////////////////////////////////////
                  localStorageModel.addLocalStorage('token', self.login.content)
                  localStorageModel.addLocalStorage('username', user.username)
              //setHeadersToken.setUserName(user.username)
                  $rootScope.userName= user.username;
                  setHeadersToken.showFavorites();
                  $rootScope.homePath= '#/regHome';
                 // setHeadersTokens.setUserHello(user.username)
                 $rootScope.loglbl = "logout"
                  $location.path('/regHome')
             }
            else
                window.alert("Authentication failed. No such user name")
                
            
        }, function (response) {
            //Second function handles error
            self.login.content = "Something went wrong";
        });
    }
    
    
    self.register = function () {
        $location.path('/reg')
    }

    self.moveToRet = function () {
        $location.path('/retrievePass')
    }


    self.initMap = function () {
        //self.boolMap = new Object();
        self.boolMap= new Array();
        for(var i=0; i< self.threePois.length; i++)
        {
            self.boolMap[self.threePois[i].name]=false;
        }

    }


    self.initThreeRandom = function () {
            $http.get(serverUrl + "poi/threeRandomPois", )
                .then(function (response) {
                    self.threePois = response.data;
                    self.initMap();
                }, function (response) {
                //    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
    }

    self.getPOIDet = function (name) {
        self.boolMap[name] = !self.boolMap[name];
        if (self.boolMap[name])
            setHeadersToken.updateViews(name);
    }
    
    self.indexOf= function(poi){
        let index= -1;
        for (var i=0; i< $rootScope.pois.length; i++)
        {
            if ($rootScope.pois[i].name== poi.name)
            {
                index=i;
                return index;
            }
        } 
        return index;
        
    }
     

 }]);
