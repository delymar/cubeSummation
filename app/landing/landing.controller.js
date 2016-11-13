/**
 * Created by Delymar on 20/08/2016.
 */
 (function(){
     angular.module('app')
         .controller('landingController', landingController);

     landingController.$inject = ['cubeService'];

     function landingController(cubeService) {
         var vm = this;
         vm.result = false;
         vm.mostrar = false;
         vm.mostrarQuery = [];
         vm.mostrarUpdate = [];

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
             vm.mostrar = true;
             vm.result = false;
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
                     _.forEach(proc[0], function(operacion) {
                       if(operacion.type == 'U') {
                         return vm.update(operacion.x, operacion.y, operacion.z, operacion.w);
                       }
                       if(operacion.type == 'Q') {
                         cubeService.query(vm.cube, vm.N, operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2)
                          .then(function (result) {
                             console.log("dentro del query function: ", result);
                             vm.resultados.push(result);
                           }).catch(function (err) {
                             return swal(err.title, err.description, err.type);
                           });
                        //  console.log("Entre a un query");
                        //  var value = vm.query(operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2);
                        //  console.log("recibi ", value);
                        //  vm.resultados.push(value);
                        //  console.log("ahora resultados es: ", vm.resultados);
                      }
                    });
                   }
                   else {
                     vm.result = false;
                     return swal("Alerta", "Falta una operación por completar", "warning");
                   }
                }
                console.log("Resultado total: ", vm.resultados);
                vm.result=true;
            }
          }
           else {
            return swal("Alerta", "Debe seleccionar las operaciones", "warning");
          }
          if(!_.isEmpty(vm.resultados)) {
            return swal("Sumatoria de Cubo", vm.resultados)
          }
          else {
            return swal("Sumatoria de Cubo", "No se realizó ningún Query")
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

         vm.update = function (x, y, z, W) {
           cubeService.update(vm.cube, vm.N, x, y, z, W).then(function (cube) {
             vm.cube = _.map(cube, _.clone);
            //  cubeService.print(vm.cube, vm.N);
           }).catch(function (err) {
             return swal(err.title, err.description, err.type);
           });
         }

         vm.query = function (x1, y1, z1, x2, y2, z2) {
           cubeService.query(vm.cube, vm.N, x1, y1, z1, x2, y2, z2).then(function (result) {
             console.log("dentro del query function: ", result);
             return result;
           }).catch(function (err) {
             return swal(err.title, err.description, err.type);
           });
         }

       }
 })();
