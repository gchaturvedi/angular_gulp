(function(window) {
    /*
     * AngularJS Controller method for displaying plugins.
     */
    var PluginsController = function ($scope) {
        var jqxhr = jQuery.getJSON("https://s3.amazonaws.com/bunchofjson/gulp-plugins.jsonp?callback=?", {
            dataType: 'jsonp'
        });
        $scope.reverse = false;
        $scope.sortBy = '!downloads_this_month';

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        }

        $scope.pluginSearch = function(plugin) {
            return plugin.name.indexOf($scope.pluginFilter) >= 0 || plugin.description.indexOf($scope.pluginFilter) >= 0
        }

    };

    /*
     * jQuery callback from getJSON() method
     * Note: has to be global since callback is explicitly named.
     */
    window.process_gulp_plugins = function(plugins) {
        var scope = angular.element($("#outer")).scope();
        clean_input(plugins, scope);
        console.log(plugins);
    };

    /*
     * Clean data retreived from jQuery callback
     */
    function clean_input(plugins, scope) {
        scope.$apply(function(){
            var array;
            clean_input
            array = $.grep(plugins,function(n){ return(n) });
            scope.plugins = array;
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

    /*
     * Inject $scope for Views and retrieval from
     */
    PluginsController.$inject = ['$scope'];

    /*
     * Bootstrap the angularjs module / controller
     */
    angular.module('gulpPluginApp')
      .controller('PluginsController', PluginsController);
}(window));
