'use strict';

var dndApp = angular.module('dndApp',[]);


dndApp.directive('dndDroppableIframe', function($compile) {
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
            if (element.prop('tagName') !== 'IFRAME') { return; }

            element.ready(function () {
                var ifrBody = element.contents().find('body');                
                ifrBody.attr('dnd-droppable', '');
                console.log(ifrBody);
                console.log("1234");
                //dropDiv.attr('dnd-droppable', '');
                //dropDiv.attr('data-greedy', 'false');
                $compile(ifrBody)(scope);
            });
        }
    }
});
