(function() {

    angular.module('app').config(appConfig);

    appConfig.$inject = ['toastrConfig'];

    function appConfig(toastrConfig) {
      // angular.extend(toastrConfig, {
      //   autoDismiss: false,
      //   containerId: 'toast-container',
      //   maxOpened: 0,
      //   newestOnTop: true,
      //   positionClass: 'toast-top-right',
      //   preventDuplicates: false,
      //   preventOpenDuplicates: false,
      //   target: 'body'
      // });
    }

}());
