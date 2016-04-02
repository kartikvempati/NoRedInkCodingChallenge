var app = angular.module('app', []);

app.controller('TestController', ['$scope', function($scope) {
  function generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
      setTimeout(function() {
        callback(testPassed);
      }, delay);
    };
  }

  var tests = [
    { description: "commas are rotated properly",          run: generateDummyTest() },
    { description: "exclamation points stand up straight", run: generateDummyTest() },
    { description: "run-on sentences don't run forever",   run: generateDummyTest() },
    { description: "question marks curl down, not up",     run: generateDummyTest() },
    { description: "semicolons are adequately waterproof", run: generateDummyTest() },
    { description: "capital letters can do yoga",          run: generateDummyTest() }
  ];

  $scope.testObj = [];

  for (var i = 0; i < tests.length; i++) {
    $scope.testObj[i] = {};
    $scope.testObj[i]['description'] = tests[i]['description'];
    $scope.testObj[i]['status'] = "Not Started Yet";
  }


  $scope.passed = 0;
  $scope.failed = 0;
  $scope.completed = 0;
  $scope.running = 0;
  $scope.allDone = false;

  $scope.runTests = function () {
    $scope.running =  tests.length - $scope.completed
    for (var i = 0; i < tests.length; i++) {
      $scope.testObj[i] = {};
      $scope.testObj[i]['description'] = tests[i]['description'];
      $scope.testObj[i]['status'] = "running";
      (function(i) {
        tests[i]['run'](function(testPassed) {
          $scope.$apply(function() {
            if (testPassed === true) {
              $scope.passed++;
              $scope.testObj[i]['status'] = "Passed";
            } else {
              $scope.testObj[i]['status'] = "Failed";
              $scope.failed++;
            }
            $scope.completed++;
            $scope.running--;
            if ($scope.completed === tests.length) {
              $scope.allDone = true;
            }
          });
        });
      })(i)
    }
  }
}])
