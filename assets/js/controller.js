app.controller('Ctrl', function ($scope, $rootScope, $http, mdDialog, AuthService, $localStorage) {

    $scope.logOut = function(){
        AuthService.logout();
    }

});
