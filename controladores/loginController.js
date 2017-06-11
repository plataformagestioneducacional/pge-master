app.controller('LoginController', function ($rootScope, $scope, $http, $timeout, $location) {


    $scope.iniciarSesion = function () {

        $rootScope.cargando = true;

        $http.get('funciones/login/validaLogin_.php?user=' + $scope.login.user + '&pass=' + $scope.login.pass).then(function (data) {
            console.log("Estos son los datos del usuario actual: ");
            console.log(data.data[0]);
            $rootScope.globalValues = $scope.getFunciones(data.data[0].concatenado);

            if (data.data[0].nombre != null) {
                localStorage.setItem("globalValues",JSON.stringify($scope.getFunciones(data.data[0].concatenado)));
                localStorage.setItem('nombre',data.data[0].nombre);
                localStorage.setItem('email',data.data[0].email);
                localStorage.setItem('password',data.data[0].password);
                localStorage.setItem('rol',data.data[0].rol);
                localStorage.setItem('nombreRol',data.data[0].nombreRol);
                $scope.hideNav = true;


                $timeout(function () {
                    $rootScope.cargando = false;
                    $timeout(function () {
                        swal("Bienvendo", "Bienvenido a Plataforma de Gestion Estudiantil", "success")
                        $location.path('/home');
                    }, 500)
                }, 1000)
                //$rootScope.cargando = false;
            }
            else {
                $timeout(function () {
                    $rootScope.cargando = false;
                    $timeout(function () {
                        swal("Oops", "Nombre de Usuario o Contraseña invalida", "error")
                    }, 500)
                }, 1000)
            }

        })
    }
    $scope.getFunciones = function (concatenado) {

        var con = "";
        var salida = "";
        var sections = "";
        var funciones = [];
        con = concatenado.split(',');
        salida = con.map(function (el) {
            var aux = "";
            aux = el.split('*');
            el = {};
            el.id = aux[1];
            el.nombre = aux[0];
            el.url = aux[2];
            el.icono = aux[3];
            el.categoria= aux[4];
            return el;
        })
        sections = con.map(function (el) {
            var aux = "";
            aux = el.split('*');
            el = {};
            el ={
                name: aux[4],
                expand: true,
                actions: []
            }
            return el;
        })
        localStorage.setItem('sections',JSON.stringify(sections))

        //console.log(salida);
        return salida;


    }
});
