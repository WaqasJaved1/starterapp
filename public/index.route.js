(function() {
    'use strict';

    angular
        .module('milkhaas')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        // State definitions
        $stateProvider
            .state('Dashboard', {
                url: '/',
                templateUrl: '/pages/dashboard/dashboard.html',
                controller: "dashboard"
            });

    }

})();