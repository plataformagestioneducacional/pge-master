'use strict';
var app = angular.module('MobileAngularUiExamples',
    [
        'ngRoute',
        'mobile-angular-ui',
        'mobile-angular-ui.gestures',
        'ngMaterial',
        'mgo-angular-wizard',
        'platanus.rut'
    ]);
app.run(function ($transform) {
    window.$transform = $transform;
});
app.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'vistas/login.html', reloadOnSearch: false, controller: 'LoginController'});
    $routeProvider.when('/home', {templateUrl: 'vistas/home.html',reloadOnSearch: false,controller: 'homeController'});
    $routeProvider.when('/nuevaCotizacion', {templateUrl: 'vistas/nuevaCotizacion.html',reloadOnSearch: false,controller: 'nuevaCotizacionController'});
    $routeProvider.when('/registrarFichaAlumno', {templateUrl: 'vistas/registrarFichaAlumno.html',reloadOnSearch: false,controller: 'registrarFichaAlumnoController'});
});
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('indigo');
})
app.directive('dragMe', ['$drag', function ($drag) {
    return {
        controller: function ($scope, $element) {
            $drag.bind($element,
                {
                    transform: $drag.TRANSLATE_INSIDE($element.parent()),
                    end: function (drag) {
                        drag.reset();
                    }
                },
                {sensitiveArea: $element.parent()}
            );
        }
    };
}]);


app.controller('MainController', function ($rootScope, $scope, $location, $mdSidenav, $mdToast) {
  $scope.redirigir = function(url){
    $location.path(url);
    $scope.toggleSidenav('left');
  }

    $scope.toggleSidenav = function (menu) {
        $mdSidenav(menu).toggle();
    }
    $scope.toast = function (message) {
        var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
        $mdToast.show(toast);
    };
    $scope.toastList = function (message) {
        var toast = $mdToast.simple().content('You clicked ' + message + ' having selected ' + $scope.selected.length + ' item(s)').position('bottom right');
        $mdToast.show(toast);
    };
    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };

    $scope.compruebaSession = function () {

        if (localStorage.getItem('globalValues')) {
            $scope.hideNav = true;
            $rootScope.globalValues = JSON.parse(localStorage.getItem('globalValues'));
            $rootScope.nombre = localStorage.getItem('nombre');
            $rootScope.email = localStorage.getItem('email');
            $rootScope.password = localStorage.getItem('password');
            $rootScope.rol = localStorage.getItem('rol');
            $rootScope.nombreRol = localStorage.getItem('nombreRol');
            $rootScope.sections = JSON.parse(localStorage.getItem('sections'));
            $scope.construyeObjeto();

        } else {
            console.log("Es False");
            localStorage.clear();
            $rootScope.globalValues = null;
            $location.path('/')
            $scope.hideNav = false;

        }

    }


    $scope.$on('$routeChangeStart', function (next, current) {
        if ($location.path() == '/') {
            if (localStorage.getItem('globalValues')) {
                $location.path('/home');
            } else {

            }
        }
        /*if($location.path()!='/'){
         $scope.hideNav = false;
         if(!localStorage.getItem('nombre')){
         localStorage.clear();
         $location.path('/');
         }else{
         $scope.hideNav = true;
         }
         }*/
        $scope.compruebaSession();
    });


    $scope.cerrarSession = function () {
        localStorage.clear();
        $location.path('/');
    }

    $scope.data = {
        user: {
            name: $rootScope.nombre,
            email: $rootScope.email,
            icon: 'face'
        },
        toolbar: {
            buttons: [{
                name: 'Button 1',
                icon: 'add',
                link: 'Button 1'
            }],
            menus: [{
                name: 'Menu 1',
                icon: 'message',
                width: '4',
                actions: [{
                    name: 'Action 1',
                    message: 'Action 1',
                    completed: true,
                    error: true
                }, {
                    name: 'Action 2',
                    message: 'Action 2',
                    completed: false,
                    error: false
                }, {
                    name: 'Action 3',
                    message: 'Action 3',
                    completed: true,
                    error: true
                }]
            }]
        },
        sidenav: {

        },
        content: {
            lists: [{
                name: 'List 1',
                menu: {
                    name: 'Menu 1',
                    icon: 'settings',
                    width: '4',
                    actions: [{
                        name: 'Action 1',
                        message: 'Action 1',
                        completed: true,
                        error: true
                    }]
                },
                items: [{
                    name: 'Item 1',
                    description: 'Description 1',
                    link: 'Item 1'
                }, {
                    name: 'Item 2',
                    description: 'Description 2',
                    link: 'Item 2'
                }, {
                    name: 'Item 3',
                    description: 'Description 3',
                    link: 'Item 3'
                }]
            }]
        }
    };

    $scope.containsObject = function (obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (angular.equals(list[i], obj)) {
                return true;
            }
        }

        return false;
    };
    $scope.construyeObjeto = function(){
        if ($scope.hideNav) {
            $scope.data.sidenav.sections = [];
            $rootScope.sections.forEach(function (el) {
                if (!$scope.containsObject({
                        name: el.name,
                        expand: false,
                        actions: []
                    }, $scope.data.sidenav.sections))
                {
                    $scope.data.sidenav.sections.push({
                        name: el.name,
                        expand: false,
                        actions: []
                    })
                }
            })
            $rootScope.globalValues.forEach(function(el){
                $scope.data.sidenav.sections.forEach(function(elem){
                    if(el.categoria == elem.name){
                        elem.actions.push({
                            name: el.nombre,
                            icon: el.icono,
                            link: el.url})
                    }
                })
            })

        }
    }



    $scope.compruebaSession();
});
