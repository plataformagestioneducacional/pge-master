/**
 * Created by negaout on 28/05/2017.
 */
app.directive('cargandoGlobal', function () {
    return {
        restrict: 'EA',
        scope: {
            estado: '=estado'
        },
        template: '<div class="layerCargando animated fadeIn"> ' +
        '<div layout="row" layout-sm="column" layout-align="space-around " class="spinerLoading">'+
        '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'+
        '</div></div>   ',
        transclude: true,
        controller: function ($scope) {

        },
    };
});

app.directive('btnSiguiente', function () {
  return {
    restrict: 'EA',
    scope: {
      estado: '=estado'
    },
    template: '<button type="submit" wz-next class="md-fab md-fab-bottom-right docs-scroll-fab md-button md-ink-ripple scrolling"'+
    'ng-click="guardarCotizacion()" aria-label="Siguiente Paso">'+
    '<i class="material-icons iconoAceptar">keyboard_arrow_right</i>'+
    '<div class="md-ripple-container" style=""></div>'+
    '</button>',
    transclude: true,
    controller: function ($scope) {

    },
  };
});

app.directive('btnAnterior', function () {
  return {
    restrict: 'EA',
    scope: {
      estado: '=estado'
    },
    template: '<button type="submit" wz-previous  class="md-fab md-fab-bottom-left docs-scroll-fab md-button md-ink-ripple scrolling"'+
    'ng-click="guardarCotizacion()" aria-label="Siguiente Paso">'+
    '<i class="material-icons iconoAceptar">keyboard_arrow_left</i>'+
    '<div class="md-ripple-container" style=""></div>'+
    '</button>',
    transclude: true,
    controller: function ($scope) {

    },
  };
});

app.directive('googleplace', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {}
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        scope.$apply(function() {
          model.$setViewValue(element.val());
        });
      });
    }
  };
});
