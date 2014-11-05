(function(window) {
    "use strict";

    /*
     * AngularJS Controller method for displaying plugins.
     */
    var PluginsController = function ($scope) {

        var jqxhr = jQuery.getJSON("https://s3.amazonaws.com/bunchofjson/gulp-plugins.jsonp?callback=?", {
            dataType: 'jsonp'
        });
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };

        $scope.doSort('downloads_this_month');

        $scope.pluginSearch = function(plugin) {
            if (plugin.blacklisted === true) {
                return false;
            }

            if (!$scope.searchFilter) {
                return true;
            } else {
                var name = plugin.name.toLowerCase();
                var desc = plugin.description.toLowerCase();
                return name.indexOf($scope.searchFilter) >= 0 || desc.indexOf($scope.searchFilter) >= 0;
            }
        };
    };

    /*
     * jQuery callback from getJSON() method
     * Note: has to be global since callback is explicitly named.
     */
    window.process_gulp_plugins = function(plugins) {
        var scope = angular.element($("#outer")).scope();
        clean_input(plugins, scope);
    };

    /*
     * Clean data retreived from jQuery callback
     */
    function clean_input(plugins, scope) {
        scope.$apply(function(){
            var array;
            array = $.grep(plugins,function(n) {
                return(n);
             });
            scope.plugins = array;
            var i;
            for(i=0;i < scope.plugins.length; i++) {
                var o = scope.plugins[i];
                o.downloads_this_month = o.downloads_this_month || 0;
                o.github_forks = o.github_forks || 0;
                o.github_stars = o.github_stars || 0;
                o.time = o.time || 0;
                o.updated_ago = jQuery.timeago(o.time);
            }
        });
    }

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
