$(document).foundation();
$(document).ready(function() {

});
$.getJSON( "/api/items", function( data ) {

    $.each( data, function( index, item ) {
      appendItem(item);
    });
});

$('#item-form').submit(function( event ) {
  event.preventDefault();
  var form = $(this);
  var itemData = form.serialize();

  $.ajax({
    type: 'POST',
    url: '/api/items',
    data: itemData
  }).done(function(item){
    appendItem(item);
    form.trigger('reset');
  });
});

$('#items-container').on('click', '.delete-item', function(event){
  itemButton = $(this);
  var id = itemButton.data('item_id');
  if(confirm('Are you sure?')){
    $.ajax({
      type: 'DELETE',
      url: '/api/items/'+id
    }).done(function(){
      itemButton.parent().parent().parent('.col-item').remove();
    });
  }
});

appendItem = function(item){
  var block = "<div class='column col-item'>"
                + "<div class='item'>"
                  +"<div class='delete-item-container'>"
                    +"<span class='delete-item' data-item_id='"+ item._id +"'>X</span>"
                  +"</div>"
                   + "<h4>"+ item.title +"</h4><hr>"
                   + "<p>"+ item.description +"</p>"
                + "</div></div>";
  $('#items-container').append(block);
}
