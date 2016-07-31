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
        $('<button/>').addClass("streetview-button").text('Streetview').appendTo($('#button-number-' + i))
  };
  createMap();
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



//Streetview button on click inside a function called in the getSign success function
function createMap(){
  $('.streetview-button').on("click", function() {
    $('<button/>').text('Add to my list').appendTo('#button-div');

    //Relevant Google Maps code from here: https://github.com/apneadiving/Google-Maps-for-Rails
    handler = Gmaps.build('Google');
    handler.buildMap({
        provider: {
          disableDefaultUI: true,
          // pass in other Google Maps API options here
          center: {lat: 40.758899, lng: -73.987325},
          zoom: 17,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true
        },
        internal: {
          id: 'one_marker'
        }
      }
      // },
      // function(){
      //   console.log('Adding markers');
      //   markers = handler.addMarkers([
      //     {
      //       "lat": 40.712784,
      //       "lng": -74.005941,
      //       "picture": {
      //         "url": "http://people.mozilla.com/~faaborg/files/shiretoko/firefoxIcon/firefox-32.png",
      //         "width":  32,
      //         "height": 32
      //       },
      //       "infowindow": "hello!"
      //     }
      //   ]);
      //   handler.bounds.extendWith(markers);
      //   handler.fitMapToBounds();
      // }
    );

    //End of code taken from Google Maps for Rails
  });
};

getSign();

});
