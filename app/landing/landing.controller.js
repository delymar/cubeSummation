/**
 * Created by Delymar on 20/08/2016.
 */
 (function(){
     angular.module('app')
         .controller('landingController', landingController);

     landingController.$inject = ['$scope', 'cubeService'];

     function landingController($scope, cubeService) {
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
             vm.result = false;
             vm.aux = 0;
             vm.proced = new Array();
             vm.resultados = new Array();
             $scope.$apply();
         }

         vm.calculate = function() {
           if(!_.isEmpty(vm.proced)) {
             for (j = 0 ; j < vm.T ; j++) {
                 var proc = _.map(vm.proced[j], _.clone);
                 if(!_.isEmpty(proc[0]) || proc[0] != undefined) {
                   if( _.size(proc[0]) === vm.M) {
                     _.forEach(proc[0], function(operacion) {
                       if(operacion.type == 'U') {
                         return vm.update(operacion.x, operacion.y, operacion.z, operacion.w);
                       }
                       if(operacion.type == 'Q') {
                         cubeService.query(vm.cube, vm.N, operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2)
                          .then(function (result) {
                             vm.resultados.push(result);
                           }).catch(function (err) {
                             return swal(err.title, err.description, err.type);
                           });
                      }
                    });
                   }
                   else {
                     vm.result = false;
                     return swal("Alerta", "Falta una operación por completar", "warning");
                   }
                }
                vm.result=true;
            }
          }
           else {
            return swal("Alerta", "Debe seleccionar las operaciones", "warning");
          }
         }

         vm.getNumber= function(num){
            return num!= undefined ? new Array (parseInt(num)) : [];
         }

         vm.type= function(procedIndex, index){
           var i = procedIndex == 0 ? procedIndex + index : (procedIndex + 1) + index;
           console.log("procedIndex " + procedIndex + ", index: " + index);
           if(vm.proced[procedIndex].operation[index].type==='U') {
              vm.mostrarQuery[i] = false;
              vm.mostrarUpdate[i] = true;
           }
           else if(vm.proced[procedIndex].operation[index].type==='Q') {
              vm.mostrarUpdate[i] = false;
              vm.mostrarQuery[i] = true;
           }
         }

         vm.update = function (x, y, z, W) {
           cubeService.update(vm.cube, vm.N, x, y, z, W).then(function (cube) {
             vm.cube = _.map(cube, _.clone);
           }).catch(function (err) {
             return swal(err.title, err.description, err.type);
           });
         }

         vm.query = function (x1, y1, z1, x2, y2, z2) {
           cubeService.query(vm.cube, vm.N, x1, y1, z1, x2, y2, z2).then(function (result) {
             return result;
           }).catch(function (err) {
             return swal(err.title, err.description, err.type);
           });
         }

       }
 })();
