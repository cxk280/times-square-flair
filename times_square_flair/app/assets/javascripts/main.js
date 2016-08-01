$( document ).ready(function() {
  console.log( "ready!" );


  let myName;
  let mySqFootage;
  let myAddress;
  let googleKey;


  function getEnv () {
    $.ajax({
      url: '/key',
      dataType: 'html',
      success: function(data){
        googleKey = data;
        getSign();
      }
    });
  };

  function getSign () {
    $.ajax({
      url: 'https://data.cityofnewyork.us/resource/wy54-4228.json',
      method: 'GET',
      success: function(data){
          console.log('Retrieved signs')
          // console.log(data[0].sf)
          listSigns(data);
        }
      });
  };

  function listSigns(myData){
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
              geocodeAddress();
            })
            .appendTo($('#button-number-div' + i));
    };
  }


  function geocodeAddress(){
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        method: 'GET',
        data: {'address': myAddress + ', New York, NY', key : googleKey},
        dataType: 'json',
        success: function (data){
          console.log('Successfully geocoded address!');
          $('#add-db-button').remove();
          $('#view-db-button').remove();
          createMap(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng);
        }
      })
  };

  //Streetview button on click inside a function called in the getSign success function
  function createMap(mylat, mylng){
      $('<button/>').attr('id','add-db-button').text('Add to my list').on('click', function(){
        console.log('Add DB button clicked!');
        // Help with this Ajax posting from here: http://stackoverflow.com/questions/17559563/sending-ajax-post-jquery-in-rails-application
        $.ajax({
          url: '/signs',
          method: 'POST',
          data: {'name' : myName, 'square-footage': mySqFootage, 'address': myAddress},
          dataType: 'json',
          success: function (data){
            console.log('Successfully added to DB!');
          }
        })
      })
      .appendTo('#button-div');

      // Help with the see DB button from here: http://stackoverflow.com/questions/2238368/how-to-make-a-button-redirect-to-another-page-using-jquery-or-just-javascript
      $('<button/>').attr('id','view-db-button').text('See my list').on('click', function(){
        window.location = '/signs'
      }).appendTo('#button-div');

      $('#my-street-image').attr('src', '');
      let streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?location=' + mylat + ',' + mylng + '&key=' + googleKey + '&size=400x400';
      $('#my-street-image').attr('src', streetviewURL);

      //Relevant Google Maps code from here: https://github.com/apneadiving/Google-Maps-for-Rails
      handler = Gmaps.build('Google');
      handler.buildMap({
          provider: {
            disableDefaultUI: true,
            // pass in other Google Maps API options here
            center: {lat: mylat, lng: mylng},
            zoom: 15,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true
          },
          internal: {
            id: 'one_marker'
          }
        },
        function(){
          markers = handler.addMarkers([
            {
              "lat": mylat,
              "lng": mylng
            }
          ]);
        }
      );

      //End of code taken from Google Maps for Rails
    };

  getEnv();

});
