/**
 * Created by Delymar on 23/10/2016.
 */

(function(){
          angular.module('app')
            .controller('ResultController', ResultController);
            ResultController.$inject = ['$scope', '$uibModalInstance',  'cubeService', 'items', '$state'];

            function ResultController($scope, $uibModalInstance, cubeService, items, $state) {

                var vm = this;
                vm.result = items.result;
                vm.proced = items.proced;
                vm.items = items;

                vm.closeModal= function () {
                    $state.reload();
                    $uibModalInstance.close();
                }

                vm.refresh= function (){
                  $state.reload();
                  $uibModalInstance.close();
                }
      }
})();
