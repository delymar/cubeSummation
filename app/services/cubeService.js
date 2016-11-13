/**
 * Created by Delymar on 07/09/2016.
 */
'use strict';
(function(){
    angular
        .module('app')
        .factory('cubeService', cubeService);

    cubeService.$inject = ['$q', '$log'];

    function cubeService($q, $log) {

        var cubeService = {
            generate: generate,
            update: update,
            query: query,
            print: print
        };

        return cubeService;

        function generate(N) {
          var deferred = $q.defer();
          var x, y, z;
          cube = new Array(N);
          for (x = 1; x <= N; x++){
              cube[x] = new Array(N);
              for (y = 1; y <= N; y++) {
                  cube[x][y] = new Array(N);
                  for (z = 1; z <= N; z++){
                    cube[x][y][z] = 0;
                  }
              }
          }
          deferred.resolve(cube);
          return deferred.promise;
        }

        function update(cube, N, x, y, z, W) {
          var deferred = $q.defer();
          if (validatePos(x, y, z)) {
            cube[x][y][z] = parseInt(W)
            deferred.resolve(cube);
          }
          else {
            deferred.reject({type:'warning', title: 'Alerta', description: 'La posición ['+x+','+y+','+z+'] no existe'});
          }
          return deferred.promise;
        }

        function validatePos(x, y, z, N) {
          console.log("valido? " + x + "-" + y + "-" + z, !(x > N || y > N || z > N || x < 1 || y < 1 || z < 1 ));
          if (x > N || y > N || z > N || x < 1 || y < 1 || z < 1 )
            return false;
          else
            return (/^([0-9])*$/.test(x) && /^([0-9])*$/.test(y) &&  /^([0-9])*$/.test(z))
        }

        function query (cube, N, x1, y1, z1, x2, y2, z2) {
          var deferred = $q.defer();

          if (validatePos(x2, y2, z2, N)) {
            if (validatePos(x1, y1, z1, N)) {
              if(x1 <= x2 && y1 <= y2 && z1 <= z2 ) {
                if (x1 == x2 && y1 == y2 && z1 == z2) {
                  deferred.resolve(cube[x1][y1][z1]);
                }
                else {
                  var aux = 0;
                  for (x = x1; x <= x2; x++){
                    for (y = y1; y <= y2; y++){
                      for (z = z1; z <= z2; z++){
                        aux = cube[x][y][z] + aux;
                      }
                    }
                  }
                  deferred.resolve(aux);
                }
              }
              else {
                deferred.reject({type:'warning', title: 'Alerta', description: 'La posición inicial debe ser menor a la final'});
              }
            }
            else {
            deferred.reject({type:'warning', title: 'Alerta', description: 'La posición ['+x1+','+y1+','+z1+'] no existe'});
            }
          }
          else {
            deferred.reject({type:'warning', title: 'Alerta', description: 'La posición ['+x2+','+y2+','+z2+'] no existe'});
          }
          return deferred.promise;
        }

        function print (cube, N) {
           for (x = 1; x <= N; x++)  {
               for (y = 1; y <= N; y++){
                   for (z = 1; z <= N; z++){
                    $log.info("x = " + x + ", y = " + y + ", z = " + z + " | valor =  " + cube[x][y][z]);
                   }
               }
           }
        }
    }
})();
