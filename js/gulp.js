var process_gulp_plugins = function() {
    var plugins = arguments[0];
    var scope = angular.element($("#outer")).scope();
    scope.$apply(function(){
        var array;
        arr = $.grep(plugins,function(n){ return(n) });
        scope.plugins = arr;
        for(var plugin of plugins) {
            try {
                if(plugin.downloads_this_month == null) {
                    plugin.downloads_this_month = 0;
                }

                if(plugin.github_forks == null) {
                    plugin.github_forks = 0;
                }

                if(plugin.github_stars == null) {
                    plugin.github_stars = 0;
                }
                if(plugin.time == null) {
                    plugin.updated_ago = "N/A";
                } else {
                    plugin.updated_ago = jQuery.timeago(plugin.time || 0);
                }
            } catch(err) {
                var x = 5;
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
