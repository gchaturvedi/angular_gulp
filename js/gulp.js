var process_gulp_plugins = function() {
    var plugins = arguments[0];
    var scope = angular.element($("#outer")).scope();
    scope.$apply(function(){
        scope.plugins = plugins;
    })
};

(function() {
    var PluginsController = function ($scope) {
        var jqxhr = jQuery.getJSON("https://s3.amazonaws.com/bunchofjson/gulp-plugins.jsonp?callback=?", {
            dataType: 'jsonp'
        });
        $scope.reverse = false;
        $scope.sortBy = 'name';

        $scope.doSort = function(propName) {
            console.log(propName);
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        }
    };

    PluginsController.$inject = ['$scope'];

    angular.module('gulpPluginApp')
      .controller('PluginsController', PluginsController);
}());
