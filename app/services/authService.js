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
            register:register,
            signin: signin,
            logout: logout,
            isAuthenticated: isAuthenticated,
            unauthenticate: unauthenticate,
            setAuthenticatedAccount: setAuthenticatedAccount
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

        function signin (form) {
            var deferred = $q.defer();
            $http.post(BaseApiUrl + '/auth/local/login', form)
                .then(function(data, status, headers, config) {
                    setAuthenticatedAccount(data).then(function(resp){
                        if(resp)
                            deferred.resolve(data);
                        else
                            deferred.reject({status:'500'});
                    });
                })
                .catch(function(data, status, headers, config) {
                    data.status = status;
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        function logout () {
            var deferred = $q.defer();
            $http.get(BaseApiUrl + '/auth/logout')
                .then(function(data, status, headers, config) {
                    unauthenticate();
                })
                .catch(function(data, status, headers, config) {
                    data.status = status;
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function isAuthenticated() {
            return !!(localStorage.getItem('Token'));
        }

        function unauthenticate() {
            $http.defaults.headers.common.Authorization = '';
            localStorage.removeItem('Token');
            localStorage.removeItem('User');
            $state.go('landing');
        }

        function setAuthenticatedAccount(result) {
            var deferred = $q.defer();
            var token = 'JWT ' + result.data.token;
            $http.defaults.headers.common.Authorization = token;
            localStorage.setItem('Token', token);
            localStorage.setItem('User', JSON.stringify(result.data.user));
            deferred.resolve(true);
            return deferred.promise;
        }
    }
})();