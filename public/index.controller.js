(function() {
    'use strict';

    angular.module('milkhaas')
        .controller('main', main)

    function main($scope, $mdSidenav) {

        $scope.toggle = function(componentId) {
            $mdSidenav(componentId).toggle();
        }

        

        

    }
})();