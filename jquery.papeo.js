(function( $ ){

  var methods = {
    init : function( options ) { 
      // Create some defaults, extending them with any options that were provided
      var settings = $.extend( {
        'api_domain' : 'papeo.com',
        'https': false,
        'tumbnails': false
      }, options);

      var api_url = (settings['https'] ? 'https://' : 'http://') +
        settings['api_domain'] + '/menu/' +
        settings['restaurant_id'] + '.json?callback=?'
      ;

      var scope = this;

      if(settings['restaurant_id']) {
        $.getJSON(api_url, function(data) {
          scope.each(function() {
            var $this = $(this).html('<div class="papeo-container"></div>');
            $(data).each(function(index, category){
              $('<h1>' + category.title + '<h1>').appendTo($this);
              var ul = $('<ul></ul>').appendTo($this);
              $(category.items).each(function(index, item){
                if(item.visible){
                  switch(item.type){
                  case 'ItemTitle':
                    $('<li class="papeo-item-title"><h2>' + item.title + '</h2></li>').appendTo(ul);
                    break;
                  case 'ItemContent':
                    $('<li class="papeo-item-content">CONTENT:' + item.title + '</li>').appendTo(ul);
                    break;
                  case 'ItemSeparator':
                    $('<li class="papeo-item-separator"><hr /></li>').appendTo(ul);
                    break;
                  case 'ItemProduct':
                    li = $('<li class="papeo-item-product"></li>');
                    $('<div class="papeo-item-product-title">' + item.title + '</div>').appendTo(li);
                    $('<div class="papeo-item-product-price">' + item.price + '</div>').appendTo(li);
                    $('<div class="papeo-item-product-description">' + item.description + '</div>').appendTo(li);
                    li.appendTo(ul);
                    break;
                  default:
                  }
                }
              });
            });
          });
        });
      } else {
        $.error( 'Your restaurant_id has to be given' );
      }
      return this;
    }
  };

  $.fn.papeo = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.papeo' );
    }    
  };

})( jQuery );