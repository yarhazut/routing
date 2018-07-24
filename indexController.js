angular.module('citiesApp')
    .controller('indexController',['$location','$http','localStorageModel','setHeadersToken','$rootScope' ,function ($location,$http,localStorageModel,setHeadersToken,$rootScope) {


        self = this;
         $rootScope.userName= "guest";
      /////////////////////////////////////////////////////////////////////////////////////
         $rootScope.homePath= "#/";
         $rootScope.loginPressed = false
        $rootScope.loglbl = "login"



      self.checkToken = function () {
        let token = localStorageModel.getLocalStorage('token');
        let newPath = setHeadersToken.pathPlusToken("reg/poi/checkToken", token)
        if (!(token === null))
        {
            $http.get(newPath)
            .then(function (response) {

                if(response.data.message === 'Failed to authenticate token.')
                {
                    localStorageModel.updateLocalStorage("token", null)
                    localStorageModel.updateLocalStorage("localList", null)
                    $rootScope.userName= "guest";
                }
                else if(response.data ==='No token provided.')
                {
                    $rootScope.userName= "guest";
                    return
                }
                else
                {
                    let user = localStorageModel.getLocalStorage('username');
                    $rootScope.userName= user;
                    setHeadersToken.showFavorites();
                    $rootScope.loglbl = "logout"
                    $rootScope.homePath= '#/regHome';
                     $location.path('/regHome')

                }
                
           }, function (response) {

               "Something went wrong";
           });


        }
        else
        {
            $rootScope.userName= "guest";
        }
    }


    self.login = function () {
        //setHeadersToken.login()
        if($rootScope.loglbl == "login")
        {
            $rootScope.loginPressed = true
            $location.path('/')
        }
        else
        {
            $rootScope.userName= "guest";
            localStorageModel.updateLocalStorage("token", null)
            localStorageModel.updateLocalStorage("localList", null)//////
            localStorageModel.updateLocalStorage("username", null)
            $rootScope.loginPressed = false
            $rootScope.loglbl = "login"
            $rootScope.homePath= '#/';
            $location.path('/')

        }

    }

    self.register = function () {
        $location.path('/reg')
    }

    self.getPOIs = function () {
        setHeadersToken.getPOIs();
    }


   /* self.showFavorites= function(){
        setHeadersToken.showFavorites();
    }*/


    }]);
