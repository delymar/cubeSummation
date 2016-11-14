/**
 * Created by Delymar on 23/10/2016.
 */

(function() {
    'use strict';
    var app = angular.module('app')
        .controller('resultController', ['$scope', '$uibModalInstance',  'cubeService', 'items', '$state',
            function ($scope, $uibModalInstance, cubeService, items, $state) {
                var vm = this;
                console.log(items)
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


            }]
        );
})();
