 
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
              e.dataTransfer.setData('Text', scope.comp);
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
              //var item = document.getElementById(e.dataTransfer.getData('Text'));
              var htmlItem = e.dataTransfer.getData('Text');
              console.log(htmlItem);
              var data = htmlItem;
              if(data == undefined) 
              	data = htmlItem;
              //console.log('components la : ');
              //console.log(scope.components);
              //console.log(data);
              var k = $compile(htmlItem)(scope);
              $(this).append(k);
              $(this).removeClass('empty');
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

    app.directive('ngPrev',function(){
      return{
        link: function(scope,element){
          var lenght = element.children().length;
          
          if(length <=1 )
            element.addClass('empty');
          else 
            element.removeClass('empty');;
        }
      }
    });
  	app.controller('DragDropCtrl', function($scope) {
  	  $scope.handleDrop = function(item, bin) {
  	    alert('Item ' + item + ' has been dropped into ' + bin);
  	  }

      $scope.components={
        dropdownlist: '<div class="dropdown" ng-edit><button class="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"  draggable>  Dropdown  <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1 " droppable> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li> <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li> </ul> </div>',
        button: '<button class="btn btn-primary" droppable> Button </button>',
        row: '<div class="row" style="min-height: 50px;" droppable ng-prev> </div>',
        navbar: '<nav class="navbar navbar-default" ng-edit><div class="container-fluid"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Brand</a> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li> <li><a href="#">Link</a></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="#">Action</a></li> <li><a href="#">Another action</a></li> <li><a href="#">Something else here</a></li> <li role="separator" class="divider"></li> <li><a href="#">Separated link</a></li> <li role="separator" class="divider"></li> <li><a href="#">One more separated link</a></li> </ul> </li> </ul> <form class="navbar-form navbar-left" role="search"> <div class="form-group"> <input type="text" class="form-control" placeholder="Search"> </div> <button type="submit" class="btn btn-default">Submit</button> </form> <ul class="nav navbar-nav navbar-right"> <li><a href="#">Link</a></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a> <ul class="dropdown-menu"> <li><a href="#">Action</a></li> <li><a href="#">Another action</a></li> <li><a href="#">Something else here</a></li> <li role="separator" class="divider"></li> <li><a href="#">Separated link</a></li>  </ul> </li> </ul> </div><!-- /.navbar-collapse --> </div><!-- /.container-fluid --></nav>',
        containerfluid: '<div class="container-fluid" style="min-height: 50px;" droppable ng-prev></div>',
        container: '<div class="container" style="min-height: 50px;" droppable ng-prev></div>', 
        thumbnail: '<div class="col-sm-6 col-md-4" droppable> <div class="thumbnail" droppable> <img data-src="holder.js/100%x200" alt="100%x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTRlZjZkN2VhOGUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNGVmNmQ3ZWE4ZSI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTE1NjI1IiB5PSIxMDUuMSI+MjQyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true" style="height: 200px; width: 100%; display: block;"> <div class="caption"> <h3>Thumbnail label</h3> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p> </div> </div> </div>',
        col_md_4: '<div class="col-md-4" droppable ng-prev> </div>',
        p: '<p> abc</p>'
      };
  	});
    