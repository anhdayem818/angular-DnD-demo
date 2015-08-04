 
  $(document).ready(function(){
    //kiem tra xem body cua html iframe co thuoc tinh de nhan keo tha hay chua? chua thi reload page
    var b = $('iframe').contents().find('body');
    console.log("thuoc tinh body la");
    console.log(b);
    
  });
  'use strict';

	var app = angular.module('dragDrop', []);

    app.directive('draggable', function() {
      return {
        scope:{
          comp: '='
        },
        link: function(scope, element) {
          // this gives us the native JS object

          var el = element[0];
          
          el.draggable = true;
          
          el.addEventListener(
            'dragstart',
            function(e) {
               if (e.stopPropagation) e.stopPropagation();
              e.dataTransfer.effectAllowed = 'copy';
              console.log("dang keo : " + el.id);
              e.dataTransfer.setData('Text', this.id);
              this.classList.add('drag');
              return false;
            },
            false
          );
          
          el.addEventListener(
            'dragend',
            function(e) {
              this.classList.remove('drag');
              return false;
            },
            false
          );
        }
      }
    });

    
    app.directive('droppableIframe', function($compile) {
      return {
        link: function(scope,element,attrs){
            if (element.prop('tagName') !== 'IFRAME') { return; }
            console.log(element);
            console.log(attrs);
            element.ready(function () {
                var ifrBody = element.contents().find('body');
                console.log("1");
                console.log(element.find('body'));
                console.log("2");
                console.log(element.contents().find('body'));
                console.log($('body').attr('droppable',''));
                ifrBody.attr('droppable','');

                $compile(ifrBody)(scope);
            });
        }
      }
    });

    app.directive('droppable', function($compile) {
      return {
        scope: {
          drop: '&'       
        },
        link: function(scope, element) {
          // again we need the native object
          var el = element[0];
          
          el.addEventListener(
            'dragover',
            function(e) {
              if (e.stopPropagation) e.stopPropagation();
              e.dataTransfer.dropEffect = 'copy';
              // allows us to drop
              if (e.preventDefault) e.preventDefault();
              this.classList.add('over');
              //console.log("drop over" + element[0].id);
                            
              //console.log("X : " + e.clientX + " Y :" + e.clientY);
              <!-- Tim do dai va cao cua element-->
              //var b = element.height();
              //console.log("height: " + b);
              return false;
            },
            false
          );
          
          el.addEventListener(
            'dragenter',
            function(e) {
              if (e.stopPropagation) e.stopPropagation();
              this.classList.add('over');
              console.log("drop enter" + element.prop('tagName'));
              return false;
            },
            false
          );
          
          el.addEventListener(
            'dragleave',
            function(e) {
              this.classList.remove('over');
              console.log("drop leave" + element[0].id);
              return false;
            },
            false
          );
          
          el.addEventListener(
            'drop',
            function(e) {
              // Stops some browsers from redirecting.
              if (e.stopPropagation) e.stopPropagation();
              
              this.classList.remove('over');
              
              var binId = this.id;
              var item = document.getElementById(e.dataTransfer.getData('Text'));
              var htmlItem = $('#'+e.dataTransfer.getData('Text'));
              var data = htmlItem.data('raw');
              if(data == undefined) 
              	data = htmlItem;
              console.log('components la : ');
              console.log(scope.components);
              //console.log(data);
              var k = $compile(data)(scope);
              $(this).append(k);
              // call the passed drop function
              scope.$apply(function(scope) {
                var fn = scope.drop();
                if ('undefined' !== typeof fn) {            
                  fn(item.id, binId);
                }
              });
              return false;
    	        },
    	        false
    	      );
    	    }
    	  }
    	});

    app.directive('overElement', function(){     
      return function(scope,element){
        
        var el = element[0];
        el.addEventListener(
          'mouseover',
          function(e){
            if (e.stopPropagation) e.stopPropagation();
            console.log("event: onmouseover");
          },
          false
        );
      }
    });

    app.directive('ngEdit',function($compile){
      return {
        link: function(scope, element)
        {
          var el = element[0];
          el.addEventListener(
            'click',
            function(e){
             // $(this).remove();
            },
            false
          );
        }
      }
    });

  	app.controller('DragDropCtrl', function($scope) {
  	  $scope.handleDrop = function(item, bin) {
  	    alert('Item ' + item + ' has been dropped into ' + bin);
  	  }

      $scope.components={
        button: "<button class='btn btn-primary' draggable droppable> </div>"
      };
  	});
    