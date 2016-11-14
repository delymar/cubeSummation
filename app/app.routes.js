(function() {

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfig($stateProvider, $urlRouteProvider) {

        $stateProvider
            .state('landing', {
                url: '/',
                views: {
                    "main": {
                        templateUrl: 'app/landing/landing.html',
                        controller: 'LandingController',
                        controllerAs: 'vm'
                    }
                },
                authenticate: false
            })

        $urlRouteProvider.otherwise('/');
    }
})();
