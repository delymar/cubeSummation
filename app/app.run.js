(function () {

    angular.module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state','$http'];

    function runBlock($rootScope, $state, $http) {

        var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;

            var redirect = toState.redirectTo;

            if (redirect) {
                event.preventDefault();

                if (angular.isFunction(redirect))
                    redirect.call($state);
                else
                    $state.go(redirect, toParams);
            }
        });
    }

}());
