/**
 * Created by Delymar on 07/09/2016.
 */
'use strict';
(function(){
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'BaseApiUrl', '$cookies', '$rootScope', '$cookieStore', '$state'];

    function authService($http, $q, BaseApiUrl, $cookies, $rootScope, $cookieStore, $state) {

        var authService = {
            register:register

        };

        return authService;


        function register (form) {
            var deferred = $q.defer();

            $http.post(BaseApiUrl + '/auth/local/register', form)
                .then(function(data, status, headers, config) {
                    setAuthenticatedAccount(data).then(function(resp){
                        if(resp)
                            deferred.resolve(data);
                        else
                            deferred.reject({status:'500'});
                    });
                })
                .catch(function(status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }



    }
})();
