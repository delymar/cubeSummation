/**
 * Created by Delymar on 20/08/2016.
 */
 (function(){
     angular.module('app')
         .controller('landingController', landingController);

     landingController.$inject = [];

     function landingController() {
         var vm = this;
         var T = 0;
         var M = 0;
         var N = 0;
         var To = new Array(T);
         var resultados = new Array();
         vm.result=false;
         vm.mostrar = false;
         vm.mostrarQuery = [];
         vm.mostrarUpdate = [];
         vm.resultados =new Array();

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
             N = vm.form.n;
             vm.generateCube(N);
             vm.mostrar = true;
             vm.result = false;
             vm.aux = 0;
             vm.proced = new Array();
             vm.resultados = new Array();
         }

        vm.validatePos = function(x, y, z){
          if (x > N || y > N || z > N || x < 1 || y < 1 || z < 1 )
            return false;
          else{
              if(/^([0-9])*$/.test(x) && /^([0-9])*$/.test(y) &&  /^([0-9])*$/.test(z)){
                return true;
              }
              else{
                swal("Alerta", "La posición ["+x+","+y+","+z+"] no existe", "warning");
              }
          }

        }

         vm.calculate = function(){
           if(!_.isEmpty(vm.proced)){
             for (j = 0 ; j < vm.T ; j++) {
                 var proc = _.map(vm.proced[j], _.clone);
                 if(!_.isEmpty(proc[0]) || proc[0] != undefined){
                   if( _.size(proc[0]) === vm.M){
                     _.forEach(proc[0], function(operacion){
                       if(operacion.type == 'U'){
                         return vm.update(operacion.x, operacion.y, operacion.z, operacion.w);
                       }
                       if(operacion.type == 'Q'){
                         vm.resultados.push(vm.summation(operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2));
                      }
                    });
                   }
                   else{
                     vm.result=false;
                     return swal("Alerta", "Falta una operación por completar", "warning");
                   }
                }
                vm.result=true;
            }
          }
           else {
            return swal("Alerta", "Debe seleccionar las operaciones", "warning");
          }
          if(!_.isEmpty(vm.resultados)){
            return swal("Sumatoria de Cubo", vm.resultados)
          }
          else{
            return swal("Sumatoria de Cubo", "No se realizo ningún Query")
          }
         }

         vm.getNumber= function(num){
            return num!= undefined ? new Array (parseInt(num)) : [];
         }

         vm.type= function(procedIndex, index){
           var i = procedIndex == 0 ? procedIndex + index : (procedIndex + 1) + index;
           if(vm.proced[procedIndex].operation[index].type==='U'){
              vm.mostrarQuery[i] = false;
              vm.mostrarUpdate[i] = true;
           }
           else if(vm.proced[procedIndex].operation[index].type==='Q') {
              vm.mostrarUpdate[i] = false;
              vm.mostrarQuery[i] = true;
           }

         }

         vm.generateCube = function(N) {
           var x, y, z;
           vm.cube = new Array(N);
           for (x = 1; x <= N; x++){
               vm.cube[x] = new Array(N);
               for (y = 1; y <= N; y++) {
                   vm.cube[x][y] = new Array(N);
                   for (z = 1; z <= N; z++){
                     vm.cube[x][y][z] = 0;
                   }
               }
           }
          vm.print();
         }

         vm.update = function (xx, yy, zz, w) {
              if (vm.validatePos(xx, yy, zz))
                return vm.cube[xx][yy][zz] = parseInt(w);
              else
                swal("Alerta", "La posición ["+xx+","+yy+","+zz+"] no existe", "warning");
         }

         vm.print = function () {
            for (x = 1; x <= N; x++)  {
                for (y = 1; y <= N; y++){
                    for (z = 1; z <= N; z++){
                     console.log("x = " + x + ", y = " + y + ", z = " + z + " | valor =  " + vm.cube[x][y][z]);
                    }
                }
            }
         }

         vm.summation = function (x1, y1, z1, x2, y2, z2) {
           if(!vm.validatePos(x1, y1, z1)){
            return swal("Alerta", "La posición ["+x1+","+y1+","+z1+"] no existe", "warning");
           }
           if(!vm.validatePos(x2, y2, z2)){
            return swal("Alerta", "La posición ["+x2+","+y2+","+z2+"] no existe", "warning");
           }
           if(x1 > x2){
             return swal("Alerta", "La posición inicial debe ser menor a la final", "warning");
           }
           if (x1 == x2 && y1 == y2 && z1 == z2) {
             return vm.cube[x1][y1][z1]
           }
           vm.aux = 0;
           for (x = x1; x <= x2; x++){
               for (y = y1; y <= y2; y++){
                   for (z = z1; z <= z2; z++){
                     vm.aux = vm.cube[x][y][z] + vm.aux;
                   }
               }
           }
           return vm.aux;
         }
}
 })();
