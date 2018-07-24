

angular.module('citiesApp')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('setHeadersToken',['localStorageModel', '$rootScope', '$location', '$http', function (localStorageModel, $rootScope,$location, $http) {


        let self = this;

       // let pois =[];
        //var boolMap ={} ;
        //self.favList=[]; //favorites pois in local storage // saves poi
        //var favBool={} //saves poi.name- buttons names
        let poiDet = ""
        let token = ""
        
        self.questions = ["What is your pet's name?","What is your school's name?","What is your teacher's name?","What is your mother last name befor marriage?"]
        self.serverUrl = 'http://localhost:3000/'
        self.userName='guest'
        self.loginPressed = false
        self.registerPressed = false

        /*
        this.set = function (t) {
            token = t
            $http.defaults.headers.common[ 'x-access-token' ] = t
            // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
            console.log("set")

        }
*/




self.login = function () {
    self.loginPressed=true
    $location.path('/')
}

self.logout = function () {
    $rootScope.userName= "guest";
    localStorageModel.updateLocalStorage("token", null)
    localStorageModel.updateLocalStorage("localList", null)
    localStorageModel.updateLocalStorage("username", null)
    $rootScope.loginPressed = false
    $rootScope.loglbl = "login"
    $rootScope.homePath= '#/';
    $location.path('/')
}

self.pathPlusToken = function(path, token)
{
    return 'http://localhost:3000/' + path + "/?token=" + token;
}

        
        self.getPOIs = function () {
            // register user
            $http.get(self.serverUrl + "poi/allPois")
                .then(function (response) {
                    $rootScope.pois = response.data;
                    //self.initMap();
                    //self.initFav();
                    self.showFavorites();

                }, function (response) {
                //    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }
    
    
       
    
       
        //favorites

        self.poiExistInFavList= function(poi)
        {
            for (var i=0; i<$rootScope.mergedFav.length; i++)
            {
                var x= $rootScope.mergedFav[i].name
                if ($rootScope.mergedFav[i].name== poi.name)
                    return true;
            }
            return false;
        }


        self.addToFav = function (poi) {
            if (self.poiExistInFavList(poi))// remove
            {
                let x= self.indexOfInMergedFav(poi);
                $rootScope.mergedFav.splice(self.indexOfInMergedFav(poi), 1)
                let indexFavList=self.indexOfInFavList(poi);
                if (indexFavList!= -1)
                    $rootScope.favList.splice(indexFavList, 1)
                $rootScope.favBool[poi.name]= 'add to favoites';
                $rootScope.favCounter= $rootScope.favCounter-1;
            }
            else //add
            {
                $rootScope.mergedFav.push(poi);
                $rootScope.favList.push(poi);
                $rootScope.favBool[poi.name]='remove from favoites';
                $rootScope.favCounter++
            }
                
            
          //  localStorage.setItem("localList", JSON.stringify($rootScope.favList));
          localStorageModel.updateLocalStorage("localList",$rootScope.favList)
        }

        

        self.indexOfInMergedFav= function(poi){
            let index= -1;
            for (var i=0; i< $rootScope.mergedFav.length; i++)
            {
                if ($rootScope.mergedFav[i].name== poi.name)
                {
                    index=i;
                    return index;
                }
            } 
            return index;
            
        }

        self.indexOfInFavList= function(poi){
            let index= -1;
            for (var i=0; i< $rootScope.favList.length; i++)
            {
                if ($rootScope.favList[i].name== poi.name)
                {
                    index=i;
                    return index;
                }
            } 
            return index;
            
        }

        self.initFav= function()
        {
    
           // var listFromLocal = JSON.parse(localStorage.getItem("localList"));
           var listFromLocal = localStorageModel.getLocalStorage("localList");
            $rootScope.favList= listFromLocal;
            if ($rootScope.favList== null)
                $rootScope.favList= new Array()
            /*for (var i= 0; i< self.favList.length; i++)
            {
                self.favList.push(listFromLocal[i])
            }*/
    
            $rootScope.favBool= new Array()
            for (var i=0; i< $rootScope.pois.length; i++)
            {
                if (self.poiExistInFavList($rootScope.pois[i]))
                {
                    $rootScope.favBool[$rootScope.pois[i].name]= 'remove from favoites';
                }   
                else
                {
                    $rootScope.favBool[$rootScope.pois[i].name]= 'add to favoites';
    
                }
                    
            }
    
            
        }
    
        self.mergeFav= function(local, db) {
            
            for(var i=0; i<db.length; ++i) {
                for(var j=0; j<local.length; ++j) {
                    if((local[j]).name== db[i].name)
                        local.splice(j--, 1);
                }
            }
            var arr = db.concat(local);
            return arr;
        }


        self.showFavorites= function(){
            self.token = localStorageModel.getLocalStorage('token')
            let newPath = self.pathPlusToken("reg/poi/getFavorites", self.token)
                // register user
                $http.get(newPath)
                    .then(function (response) {
                        if(response.data.message === 'Failed to authenticate token.')
                {
                    if ($rootScope.userName!= 'guest')
                        self.logout()
                    return
                }
                        self.favoritesFromDB = response.data;
                        //self.favoritesFromLocal = JSON.parse(localStorage.getItem("localList"));
                        self.favoritesFromLocal = localStorageModel.getLocalStorage("localList");
                        if(self.favoritesFromLocal == null)
                             self.favoritesFromLocal = new Array()
                        $rootScope.mergedFav= self.mergeFav(self.favoritesFromLocal, self.favoritesFromDB);
                        $rootScope.favCounter= $rootScope.mergedFav.length;
                        self.initFav();
                        //self.initMap();
                        //self.initMapPop()
                    }, function (response) {
                    //    self.reg.content = response.data
                        //Second function handles error
                        // self.reg.content = "Something went wrong";
                    });
        
                
               
                
        
        }
        
       
        self.updateViews = function (poi) {
            let poiName = {
                name: poi
            }
            $http.post(self.serverUrl + "poi/updateViews", poiName)
            .then(function (response) {
                self.getPOIs()
            }, function (response) {
            //    self.reg.content = response.data
                //Second function handles error
                // self.reg.content = "Something went wrong";
            });
    
        
        }

        

        
    
    
       


        
       
 

    }])

    
    .controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel', function ($location, $http, setHeadersToken,localStorageModel) {

/* 
        self = this;

        self.directToPOI = function () {
            $location.path('/poi')
        }


       let user = {
            userName: "Shir",
            password: "abcd",
            isAdmin: true
        }


        self.signUp = function () {
            // register user
            $http.post(serverUrl + "Users/", user)
                .then(function (response) {
                    //First function handles success
                    self.signUp.content = response.data;
                }, function (response) {
                    //Second function handles error
                    self.signUp.content = "Something went wrong";
                });
        }

        self.login = function () {
            // register user
            $http.post(serverUrl + "Users/login", user)
                .then(function (response) {
                    //First function handles success
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content)


                }, function (response) {
                    //Second function handles error
                    self.login.content = "Something went wrong";
                });
        }

        self.reg = function () {
            // register user
            $http.post(serverUrl + "reg/", user)
                .then(function (response) {
                    //First function handles success
                    self.reg.content = response.data;

                }, function (response) {
                    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

       /* self.addTokenToLocalStorage = function () {
            localStorageModel.addLocalStorage('token', self.login.content)
        }*/

        


    }]);


