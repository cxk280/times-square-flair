$( document ).ready(function() {
  console.log( "ready!" );


function listSigns(myData){
  for (i in myData) {
    $('<div/>').addClass("row").attr("id", "row-number-" + i).appendTo($('#signs-list-container'))
      $('<div/>').addClass("three columns").attr("id", "sign-name-number-" + i).appendTo($('#row-number-' + i))
        $('<p/>').text(myData[i].screen_name_led_vinyl_signs_).appendTo($('#sign-name-number-' + i))
      $('<div/>').addClass("three columns").attr("id", "square-footage-number-" + i).appendTo($('#row-number-' + i))
        $('<p/>').text(myData[i].sf).appendTo($('#square-footage-number-' + i))
      $('<div/>').addClass("three columns").attr("id", "address-number-" + i).appendTo($('#row-number-' + i))
        $('<p/>').text(myData[i].building_address).appendTo($('#address-number-' + i))
      $('<div/>').addClass("three columns").attr("id", "button-number-" + i).appendTo($('#row-number-' + i))
        $('<button/>').text('Streetview').appendTo($('#button-number-' + i))
  }
}




function getSign () {
  $.ajax({
    url: 'https://data.cityofnewyork.us/resource/wy54-4228.json',
    method: 'GET',
    success: function(data){
        console.log('Retrieved signs')
        // console.log(data[0].sf)
        listSigns(data);
      }
    })
  };





getSign();





});
