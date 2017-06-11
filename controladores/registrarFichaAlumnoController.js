app.controller('registrarFichaAlumnoController', function ($rootScope, $scope, $http, $timeout, $location,$mdToast,$timeout) {
  $rootScope.subHeader = ' - Registrar Ficha de Alumno';
  /*Inicializar nueva Cotizacion*/


  var onresize = function() { $timeout(function(){if( window.innerWidth < 630){ $scope.escondeWizard = true;}else{$scope.escondeWizard = false;} },10)};
  window.addEventListener("resize", onresize);onresize();

  $scope.niveles = [
    {nombre:"Sala Cuna Menor",valor:1},
    {nombre:"Sala Cuna Intermedio",valor:2},
    {nombre:"Sala Cuna Mayor",valor:3},
    {nombre:"Nivel Heterogeneo",valor:4},
    {nombre:"Medio Menor",valor:5},
    {nombre:"Medio Mayor",valor:6},
    {nombre:"Transición 1 y 2",valor:7}

  ];
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

$scope.comunas = [
{id:1,nombre:"Cerrillos"},
{id:2,nombre:"Cerro Navia"},
{id:3,nombre:"Conchalí"},
{id:4,nombre:"El Bosque"},
{id:5,nombre:"Estación Central"},
{id:6,nombre:"Huechuraba"},
{id:7,nombre:"Independencia"},
{id:8,nombre:"La Cisterna"},
{id:9,nombre:"La Florida"},
{id:10,nombre:"La Granja"},
{id:11,nombre:"La Pintana"},
{id:12,nombre:"La Reina"},
{id:13,nombre:"Las Condes"},
{id:14,nombre:"Lo Barnechea"},
{id:15,nombre:"Lo Espejo"},
{id:16,nombre:"Lo Prado"},
{id:17,nombre:"Macul"},
{id:18,nombre:"Maipú"},
{id:19,nombre:"Ñuñoa"},
{id:20,nombre:"Pedro Aguirre Cerda"},
{id:21,nombre:"Peñalolén"},
{id:22,nombre:"Providencia"},
{id:23,nombre:"Pudahuel"},
{id:24,nombre:"Quilicura"},
{id:25,nombre:"Quinta Normal"},
{id:26,nombre:"Recoleta"},
{id:27,nombre:"Renca"},
{id:28,nombre:"San Joaquín"},
{id:29,nombre:"San Miguel"},
{id:30,nombre:"San Ramón"},
{id:31,nombre:"Vitacura"},
{id:32,nombre:"Puente Alto"},
{id:33,nombre:"Pirque"},
{id:34,nombre:"San José de Maipo"},
{id:35,nombre:"Colina"},
{id:36,nombre:"Lampa"},
{id:37,nombre:"TilVl"},
{id:38,nombre:"San Bernardo"},
{id:39,nombre:"Buin"},
{id:40,nombre:"Calera de Tango"},
{id:41,nombre:"Paine"},
{id:42,nombre:"Melipilla"},
{id:43,nombre:"Alhué"},
{id:44,nombre:"Curacaví"},
{id:45,nombre:"María Pinto"},
{id:46,nombre:"San Pedro"},
{id:47,nombre:"Talagante"},
{id:48,nombre:"El Monte"},
{id:49,nombre:"Isla de Maipo"},
{id:50,nombre:"Padre Hurtado"},
{id:51,nombre:"Peñaflor"}
]

});
