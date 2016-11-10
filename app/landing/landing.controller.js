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
         vm.mostrar = false;
         vm.mostrarQuery = [];
         vm.mostrarUpdate = [];
         vm.resultados =new Array();

         vm.next= function() {
            vm.T = vm.form.cs;
            vm.M = vm.form.m;
            N = vm.form.n;
            vm.generateCube(N);
            vm.mostrar = true;
          //  vm.update(1, 1, 1, 3);
          //  vm.summation(0, 1, 1, 1, 1, 1);
         }

         vm.calculate = function(){
           for (j = 0 ; j < vm.T ; j++) {
             var proc = _.map(vm.proced[j], _.clone);
             for ( i = 0 ; i < vm.M ; i++){
               _.forEach(proc[i], function(operacion){
                 if(operacion.type === 'U'){
                   vm.update(operacion.x, operacion.y, operacion.z, operacion.w);
                 }
                 if(operacion.type === 'Q'){
                   vm.resultados.push(vm.summation(operacion.x1, operacion.y1, operacion.z1, operacion.x2, operacion.y2, operacion.z2));
                }
                 else {
                   return "not found operation";
                 }
               });
              //  console.log("esto es vm.resultados", vm.resultados)
             }
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
           for (x = 0; x < N; x++){
               vm.cube[x] = new Array(N);
               for (y = 0; y < N; y++) {
                   vm.cube[x][y] = new Array(N);
                   for (z = 0; z < N; z++){
                     vm.cube[x][y][z] = 0;
                      //console.log("x = " + x + ", y = " + y + ", z = " + z + " | valor =  " + vm.cube[x][y][z]);
                   }
               }
           }
          vm.print();
         }

         vm.update = function (xx, yy, zz, w) {
            if (xx >= N || yy >= N || zz >= N)
              return alert("Campo no existente: cubo["+xx+"]["+yy+"]["+zz+"]");
            else
              vm.cube[xx][yy][zz] = parseInt(w);
         }

         vm.print = function () {
            for (x = 0; x < N; x++)  {
                for (y = 0; y < N; y++){
                    for (z = 0; z < N; z++){
                    //  console.log("x = " + x + ", y = " + y + ", z = " + z + " | valor =  " + vm.cube[x][y][z]);
                    }
                }
            }
         }
         vm.summation = function (x1, y1, z1, x2, y2, z2) {
           if (x1 == x2 && y1 == y2 && z1 == z2) {
             return
           }
           if(x1 > x2){
             return
           }
            vm.aux = 0;
           for (x = x1; x <= x2; x++){
               for (y = y1; y <= y2; y++){
                   for (z = z1; z <= z2; z++){
                     console.log("position " + x + "-" + y+ "-" + z + "-" + " value:" +vm.cube[x][y][z])
                     vm.aux = vm.cube[x][y][z] + vm.aux;
                   }
               }
           }
           return vm.aux;
         }
}
 })();
