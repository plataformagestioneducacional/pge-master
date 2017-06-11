/**
 * Easy to use Wizard library for Angular JS
 * @version v1.1.1 - 2017-06-07 * @link https://github.com/mgonto/angular-wizard
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function wizardButtonDirective(a) {
  angular.module("mgo-angular-wizard").directive(a, function () {
    return {
      restrict: "A", replace: !1, require: "^wizard", link: function (b, c, d, e) {
        c.on("click", function (c) {
          c.preventDefault(), b.$apply(function () {
            b.$eval(d[a]), e[a.replace("wz", "").toLowerCase()]()
          })
        })
      }
    }
  })
}
angular.module("templates-angularwizard", ["step.html", "wizard.html"]), angular.module("step.html", []).run(["$templateCache", function (a) {
  a.put("step.html", '<section ng-show="selected" ng-class="{current: selected, done: completed}" class="step" ng-transclude>\n</section>')
}]), angular.module("wizard.html", []).run(["$templateCache", function (a) {
  a.put("wizard.html", '<div>\n    <h2 ng-show="selectedStep.wzHeadingTitle != \'\'">{{ selectedStep.wzHeadingTitle }}</h2>\n\n    <div class="steps" ng-if="indicatorsPosition === \'bottom\'" ng-transclude></div>\n    <ul class="steps-indicator steps-{{getEnabledSteps().length}}" ng-if="!hideIndicators">\n      <li ng-class="{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}" ng-repeat="step in getEnabledSteps()">\n        <a ng-click="goTo(step)">{{step.title || step.wzTitle}}</a>\n      </li>\n    </ul>\n    <div class="steps" ng-if="indicatorsPosition === \'top\'" ng-transclude></div>\n</div>\n')
}]), angular.module("mgo-angular-wizard", ["templates-angularwizard"]), angular.module("mgo-angular-wizard").directive("wzStep", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    scope: {
      wzTitle: "@",
      wzHeadingTitle: "@",
      canenter: "=",
      canexit: "=",
      disabled: "@?wzDisabled",
      description: "@",
      wzData: "=",
      wzOrder: "@?"
    },
    require: "^wizard",
    templateUrl: function (a, b) {
      return b.template || "step.html"
    },
    link: function (a, b, c, d) {
      c.$observe("wzTitle", function (b) {
        a.title = a.wzTitle
      }), a.title = a.wzTitle, d.addStep(a), a.$on("$destroy", function () {
        d.removeStep(a)
      })
    }
  }
}), angular.module("mgo-angular-wizard").directive("wizard", function () {
  return {
    restrict: "EA",
    replace: !0,
    transclude: !0,
    scope: {
      currentStep: "=",
      onCancel: "&",
      onFinish: "&",
      hideIndicators: "=",
      editMode: "=",
      name: "@",
      indicatorsPosition: "@?"
    },
    templateUrl: function (a, b) {
      return b.template || "wizard.html"
    },
    controller: ["$scope", "$element", "$log", "WizardHandler", "$q", "$timeout", function ($scope, $element, $log, WizardHandler, $q, $timeout) {
      function canEnterStep(step) {
        var defer, canEnter;
        if (void 0 === step.canenter)return !0;
        if ("boolean" == typeof step.canenter)return step.canenter;
        if ("string" == typeof step.canenter) {
          var splitFunction = step.canenter.split("(");
          canEnter = eval("$scope.$parent." + splitFunction[0] + "($scope.context" + splitFunction[1])
        } else canEnter = step.canenter($scope.context);
        return angular.isFunction(canEnter.then) ? (defer = $q.defer(), canEnter.then(function (a) {
          defer.resolve(a)
        }), defer.promise) : canEnter === !0
      }

      function canExitStep(step, stepTo) {
        var defer, canExit;
        if ("undefined" == typeof step.canexit || $scope.getStepNumber(stepTo) < $scope.currentStepNumber())return !0;
        if ("boolean" == typeof step.canexit)return step.canexit;
        if ("string" == typeof step.canexit) {
          var splitFunction = step.canexit.split("(");
          canExit = eval("$scope.$parent." + splitFunction[0] + "($scope.context" + splitFunction[1])
        } else canExit = step.canexit($scope.context);
        return angular.isFunction(canExit.then) ? (defer = $q.defer(), canExit.then(function (a) {
          defer.resolve(a)
        }), defer.promise) : canExit === !0
      }

      function unselectAll() {
        angular.forEach($scope.getEnabledSteps(), function (a) {
          a.selected = !1
        }), $scope.selectedStep = null
      }

      void 0 == $scope.indicatorsPosition && ($scope.indicatorsPosition = "bottom");
      var firstRun = !0;
      WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this), $scope.$on("$destroy", function () {
        WizardHandler.removeWizard($scope.name || WizardHandler.defaultName)
      }), $scope.steps = [];
      var stepIdx = function (a) {
        var b = 0, c = -1;
        return angular.forEach($scope.getEnabledSteps(), function (d) {
          d === a && (c = b), b++
        }), c
      }, stepByTitle = function (a) {
        var b = null;
        return angular.forEach($scope.getEnabledSteps(), function (c) {
          c.wzTitle === a && (b = c)
        }), b
      }, handleEditModeChange = function () {
        var a = $scope.editMode;
        if (!angular.isUndefined(a) && null !== a && (angular.forEach($scope.steps, function (b) {
            b.completed = a
          }), !a)) {
          var b = $scope.currentStepNumber() - 1;
          angular.forEach($scope.getEnabledSteps(), function (a, c) {
            b > c && (a.completed = !0)
          })
        }
      };
      $scope.context = {}, $scope.$watch("currentStep", function (a) {
        if (a) {
          var b = $scope.selectedStep.wzTitle;
          $scope.selectedStep && b !== $scope.currentStep && $scope.goTo(stepByTitle($scope.currentStep))
        }
      }), $scope.$watch("[editMode, steps.length]", function () {
        handleEditModeChange()
      }, !0), this.addStep = function (a) {
        var b = a.wzOrder >= 0 && !$scope.steps[a.wzOrder] ? a.wzOrder : $scope.steps.length;
        $scope.steps[b] = a, $scope.getEnabledSteps()[0] === a && $scope.goTo($scope.getEnabledSteps()[0])
      }, this.removeStep = function (a) {
        var b = $scope.steps.indexOf(a);
        b > 0 && $scope.steps.splice(b, 1)
      }, this.context = $scope.context, $scope.getStepNumber = function (a) {
        return stepIdx(a) + 1
      }, $scope.goTo = function (a) {
        if (firstRun) unselectAll(), $scope.selectedStep = a, angular.isUndefined($scope.currentStep) || ($scope.currentStep = a.wzTitle), a.selected = !0, $scope.$emit("wizard:stepChanged", {
          step: a,
          index: stepIdx(a)
        }), firstRun = !1; else {
          var b;
          $scope.currentStepNumber() > 0 ? b = $scope.currentStepNumber() - 1 : 0 === $scope.currentStepNumber() && (b = 0), $q.all([canExitStep($scope.getEnabledSteps()[b], a), canEnterStep(a)]).then(function (b) {
            b[0] && b[1] ? (unselectAll(), $scope.selectedStep = a, angular.isUndefined($scope.currentStep) || ($scope.currentStep = a.wzTitle), a.selected = !0, $scope.$emit("wizard:stepChanged", {
              step: a,
              index: stepIdx(a)
            })) : $scope.$emit("wizard:stepChangeFailed", {step: a, index: _.indexOf($scope.getEnabledSteps(), a)})
          })
        }
      }, $scope.currentStepNumber = function () {
        return stepIdx($scope.selectedStep) + 1
      }, $scope.getEnabledSteps = function () {
        return $scope.steps.filter(function (a) {
          return a && "true" !== a.disabled
        })
      }, this.currentStepTitle = function () {
        return $scope.selectedStep.wzTitle
      }, this.currentStepDescription = function () {
        return $scope.selectedStep.description
      }, this.currentStep = function () {
        return $scope.selectedStep
      }, this.totalStepCount = function () {
        return $scope.getEnabledSteps().length
      }, this.getEnabledSteps = function () {
        return $scope.getEnabledSteps()
      }, this.currentStepNumber = function () {
        return $scope.currentStepNumber()
      }, this.next = function (a) {
        var b = $scope.getEnabledSteps(), c = stepIdx($scope.selectedStep);
        if (angular.isFunction(a)) {
          if (!a())return;
          c === b.length - 1 ? this.finish() : $scope.goTo(b[c + 1])
        }
        a || ($scope.selectedStep.completed = !0), c === b.length - 1 ? this.finish() : $scope.goTo(b[c + 1])
      }, this.goTo = function (a) {
        $timeout(function () {
          var b, c = $scope.getEnabledSteps();
          b = angular.isNumber(a) ? c[a] : stepByTitle(a), $scope.goTo(b)
        })
      }, this.finish = function () {
        $scope.onFinish && $scope.onFinish()
      }, this.previous = function () {
        var a = stepIdx($scope.selectedStep);
        if (0 === a)throw new Error("Can't go back. It's already in step 0");
        $scope.goTo($scope.getEnabledSteps()[a - 1])
      }, this.cancel = function () {
        if ($scope.onCancel) $scope.onCancel(); else {
          var a = stepIdx($scope.selectedStep);
          if (0 === a)throw new Error("Can't go back. It's already in step 0");
          $scope.goTo($scope.getEnabledSteps()[0])
        }
      }, this.reset = function () {
        angular.forEach($scope.getEnabledSteps(), function (a) {
          a.completed = !1
        }), this.goTo(0)
      }, this.setEditMode = function (a) {
        $scope.editMode = a, handleEditModeChange()
      }
    }]
  }
}), wizardButtonDirective("wzNext"), wizardButtonDirective("wzPrevious"), wizardButtonDirective("wzFinish"), wizardButtonDirective("wzCancel"), wizardButtonDirective("wzReset"), angular.module("mgo-angular-wizard").factory("WizardHandler", function () {
  var a = {}, b = {};
  return a.defaultName = "defaultWizard", a.addWizard = function (a, c) {
    b[a] = c
  }, a.removeWizard = function (a) {
    delete b[a]
  }, a.wizard = function (c) {
    var d = c;
    return c || (d = a.defaultName), b[d]
  }, a
});
