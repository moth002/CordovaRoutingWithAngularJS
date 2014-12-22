var app = angular.module("app", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            templateUrl: "app.html",
            controller: "ViewCtrl",
            resolve: {
                loadData: viewCtrl.loadData
            }
        });
    $routeProvider.when("/foo/:message?",
        {
            templateUrl: "app.html",
            controller: "FooCtrl"
        }
    );
}]);

app.directive("error", function($rootScope) {
    return {
        restrict: "E",
        template: '<div class="alert-box alert" ng-show="isError">Error!!!!!</div>',
        link: function(scope) {
            $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                scope.isError = true;
            });
        }
    }
});

app.controller("AppCtrl", ['$rootScope', function ($rootScope) {
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        //alert(rejection);
    });
}]);

var viewCtrl = app.controller("ViewCtrl", ['$scope', function ($scope) {
    $scope.model = {
        message: "I am a great app!!!"
    }
}]);

viewCtrl.loadData = function ($q, $timeout) {
    var defer = $q.defer();
    $timeout(function () {
        //defer.resolve();
        defer.reject("your network is down");
    }, 5000);
    return defer.promise;
}


app.controller("FooCtrl", ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.model = {
        message: $routeParams.message ? $routeParams.message : "This is my app!!!"
    }

}]);


