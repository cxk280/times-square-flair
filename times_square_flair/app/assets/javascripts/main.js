$( document ).ready(function() {
  console.log( "ready!" );

let myName;
let mySqFootage;
let myAddress;




function listSigns(myData){
  console.log('listSigns running!');
  for (i in myData) {
    $('<div/>').addClass("row").attr("id", "row-number-" + i).appendTo($('#signs-list-container'));
      $('<div/>').addClass("three columns").attr("id", "sign-name-number-div" + i).appendTo($('#row-number-' + i));
        $('<p/>').text(myData[i].screen_name_led_vinyl_signs_).val(myData[i].screen_name_led_vinyl_signs_).attr("id", "sign-name-number-p" + i).appendTo($('#sign-name-number-div' + i));
      $('<div/>').addClass("three columns").attr("id", "square-footage-number-div" + i).appendTo($('#row-number-' + i));
        $('<p/>').text(myData[i].sf).val(myData[i].sf).attr("id", "square-footage-number-p" + i).appendTo($('#square-footage-number-div' + i));
      $('<div/>').addClass("three columns").attr("id", "address-number-div" + i).appendTo($('#row-number-' + i));
        $('<p/>').text(myData[i].building_address).val(myData[i].building_address).attr("id", "address-number-p" + i).appendTo($('#address-number-div' + i));
      $('<div/>').addClass("three columns").attr("id", "button-number-div" + i).appendTo($('#row-number-' + i));
        $('<button/>').addClass("streetview-button").attr('id', 'streetview-button-' + i).attr('name', myData[i].screen_name_led_vinyl_signs_).attr('square-footage', myData[i].sf).attr('address',myData[i].building_address).text('Streetview')
          .on('click', function(){
            myName      = $(this).attr('name');
            mySqFootage = $(this).attr('square-footage');
            myAddress   = $(this).attr('address');
            console.log('myName is: ' + myName);
            console.log('mySqFootage is: ' + mySqFootage);
            console.log('myAddress is: ' + myAddress);
          })
          .appendTo($('#button-number-div' + i));
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
function createMap(name, sqfootage, address){
    $('<button/>').attr('id','add-db-button').text('Add to my list').appendTo('#button-div');
    $('#add-db-button').on('click', function(){
      //function to add to db here
      $('<form/>').attr('id', 'db-form').appendTo('#add-db-button');
      console.log('Add DB button clicked!');
      // $('<input>').attr('name', '').appendTo('#db-form');
      // $('<input>').attr('sqfootage', '').appendTo('#db-form');
      // $('<input>').attr('address', '').appendTo('#db-form');
    });

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
};

getSign();

});
