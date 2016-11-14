/**
 * Created by Delymar on 20/08/2016.
 */
 (function(){
     angular.module('app')
         .controller('landingController', landingController);

     landingController.$inject = ['$scope', 'cubeService', '$uibModal', '$document', 'toastr'];

     function landingController($scope, cubeService, $uibModal, $document, toastr) {
         var vm = this;
         vm.result = false;
         vm.mostrar = false;

         function generateCube(n) {
           cubeService.generate(n).then(function (cube) {
             vm.cube = _.map(cube, _.clone);
             cubeService.print(vm.cube, n);
           })
         }

         vm.available = function() {
            if(_.size(vm.form) == 3){
              if(/^([0-9])*$/.test(vm.form.cs) && /^([0-9])*$/.test(vm.form.m) &&  /^([0-9])*$/.test(vm.form.n)){
                if(vm.form.cs != 0 && vm.form.m != 0 && vm.form.n != 0){
                  return false;
                } else{
                  return true;
                }
              } else{
                return true;
              }
            } else{
             return true;
            }
          }

         vm.next = function() {
             vm.T = vm.form.cs;
             vm.M = vm.form.m;
             vm.N = vm.form.n;
             generateCube(vm.N);
             vm.mostrarQuery = [];
             vm.mostrarUpdate = [];
             vm.mostrar = true;
             vm.error = false;
             vm.aux = 0;
             vm.proced = new Array();
             vm.resultados = new Array();
         }

         vm.calculate = function() {
           if(!_.isEmpty(vm.proced)) {
             for (j = 0 ; j < vm.T ; j++) {
                 var proc = _.map(vm.proced[j], _.clone);
                 if(!_.isEmpty(proc[0]) || proc[0] != undefined) {
                   if( _.size(proc[0]) === vm.M) {
                     async.each(proc[0], function(operacion, callback) {
                       if(operacion.type == 'U') {
                         cubeService.update(vm.cube, vm.N, operacion.x, operacion.y, operacion.z, operacion.w).then(function (cube) {
                           vm.cube = _.map(cube, _.clone);
                           callback();
                         }).catch(function (err) {
                           return callback(err);
                         });
                       }
                       if(operacion.type == 'Q') {
                         cubeService.query(vm.cube, vm.N, operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2)
                          .then(function (result) {
                             vm.resultados.push(result);
                             callback();
                           }).catch(function (err) {
                             return callback(err);
                           });
                      }
                    }, function (err) {
                      if (err)
                        toastr.error( err.description,err.title);
                      else
                        vm.modalInstance = $uibModal.open({
                              animation: true,
                              ariaLabelledBy: 'modal-title',
                              ariaDescribedBy: 'modal-body',
                              templateUrl: 'app/landing/modalResult/result-modal.html',
                              controller: 'resultController',
                              controllerAs: 'vm',
                              size: 'md',
                              resolve: {
                                items: function(){
                                       var resultInfo = {
                                           proced: vm.proced,
                                           result: vm.resultados,
                                           cs: vm.form.cs,
                                           m: vm.form.m,
                                           n: vm.form.n
                                       };
                                       return resultInfo;
                                   }
                             }
                        })
                    });
                   }
                   else {
                     toastr.warning( "Falta una operación por completar", "Alerta");
                   }
                }
            }
        }
        else {
          toastr.warning( "Debe seleccionar las operaciones", "Alerta");
        }
      }

         vm.getNumber= function(num){
            return num!= undefined ? new Array (parseInt(num)) : [];
         }

         vm.type= function(procedIndex, index){
           var i = procedIndex == 0 ? procedIndex + index : (procedIndex + 1) + index;
           if(vm.proced[procedIndex].operation[index].type==='U') {
              vm.mostrarQuery[i] = false;
              vm.mostrarUpdate[i] = true;
           }
           else if(vm.proced[procedIndex].operation[index].type==='Q') {
              vm.mostrarUpdate[i] = false;
              vm.mostrarQuery[i] = true;
           }
         }

       }
 })();
