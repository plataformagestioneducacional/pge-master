app.controller('nuevaCotizacionController', function ($rootScope, $scope, $http, $timeout, $location,$mdToast) {
  $rootScope.subHeader = ' - Confeccionar cotización';
  /*Inicializar nueva Cotizacion*/
  $scope.nuevaCotizacion = {};

  $scope.items = [
    {nombre:"Almuerzo",valor:1,selected:false},
    {nombre:"Cena",valor:1,selected:false},
    {nombre:"Postre",valor:1,selected:false},
    {nombre:"Ensaladas",valor:1,selected:false},
    {nombre:"Jugos Naturales",valor:1,selected:false},

  ];
  $scope.dias = [
    {nombre:"Lunes",valor:1},
    {nombre:"Martes",valor:2},
    {nombre:"Miercoles",valor:3},
    {nombre:"Jueves",valor:4},
    {nombre:"Viernes",valor:5},
    {nombre:"Sabado",valor:6},
    {nombre:"Domingo",valor:7}

  ];

  $scope.niveles = [
    {nombre:"Sala Cuna Menor",valor:1},
    {nombre:"Sala Cuna Intermedio",valor:2},
    {nombre:"Sala Cuna Mayor",valor:3},
    {nombre:"Nivel Heterogeneo",valor:4},
    {nombre:"Medio Menor",valor:5},
    {nombre:"Medio Mayor",valor:6},
    {nombre:"Transición 1 y 2",valor:7}

  ];




  $scope.seleccionarHorario = function(horario){
    $scope.horarios.map(function(el){
      el.selected = false;
      return el;
    })
     horario.selected = true;
    //console.log($scope.horarios)
  }
  $scope.setTipoCotizacion = function(tipo){
    $scope.hide = true;
    if(tipo=='particular'){
      $scope.esParticular = true
    }else{
      $scope.esParticular = false
    }


  }

  $scope.horarios = [
  { selected:false,color:"rgb(69, 94, 222)",nombre:"Jornada Media    Mañana         ", horas:"4 horas       ", horario: "08:00 a 11:00 / 09:00 a 13:00"},
  { selected:false,color:"rgb(2, 136, 209)",nombre:"Jornada Media    Tarde          ", horas:"4 horas       ", horario: "14:30 a 18:30 / 15:00 a 17:00"},
  { selected:false,color:"rgb(0, 151, 167)",nombre:"Jornada Media    Especial mañana", horas:"6 horas       ", horario: "08:00 a 13:00"},
  { selected:false,color:"rgb(0, 121, 107)",nombre:"Jornada Media    Especial tarde ", horas:"6 horas       ", horario: "14:00 a 19:00"},
  { selected:false,color:"rgb(10, 126, 7)",nombre:"Jornada Completa                ", horas:"8 horas       ", horario: "08:00 a 15:00"},
  { selected:false,color:"rgb(104, 159, 56)",nombre:"Jornada Completa Extensa        ", horas:"9 a 10 horas  ", horario: "08:00 a 18:00"},
  { selected:false,color:"rgb(175, 180, 43)",nombre:"Jornada Completa Extensa        ", horas:"11 horas      ", horario: "08:00 a 19:00"},
  { selected:false,color:"rgb(251, 192, 45)",nombre:"Jornada Extensa                 ", horas:"12 horas      ", horario: "08:00 a 20:00"}

]

  $scope.selected = [];
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
    $scope.selected.length !== $scope.items.length);
  };

  $scope.isChecked = function() {
    return $scope.selected.length === $scope.items.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.items.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.items.slice(0);
    }
  };


  $scope.guardarCotizacion = function(){
    $scope.nuevaCotizacion.servicios = $scope.selected;
    $scope.horarios.forEach(function(el){
      if(el.selected == true){
        $scope.nuevaCotizacion.horarioSeleccionado = el;
      }
    })
    console.log($scope.nuevaCotizacion)
    $mdToast.show(
      $mdToast.simple()
        .textContent('Todos los datos son necesarios!!')
        .position('bottom right')
        .hideDelay(3000)
    );
  }
});
