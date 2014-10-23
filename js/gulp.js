var process_gulp_plugins = function() {
    var plugins = arguments[0];
    var scope = angular.element($("#outer")).scope();
    scope.$apply(function(){
        scope.plugins = plugins;
        for(var plugin of plugins) {
            try {
                plugin.updated_ago = jQuery.timeago(plugin.time);

                if(plugin.downloads_this_month == null) {
                    plugin.downloads_this_month = 0;
                }

                if(plugin.github_forks == null) {
                    plugin.github_forks = 0;
                }

                if(plugin.github_stars == null) {
                    plugin.github_stars = 0;
                }

            } catch(err) {

            }
        }
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
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        }
    };

    PluginsController.$inject = ['$scope'];

    angular.module('gulpPluginApp')
      .controller('PluginsController', PluginsController);
}());
