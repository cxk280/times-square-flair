Times Square Flair
==================

Anyone who visits Times Square in New York City immediately notices the profusion of bright, flashing signs. As it happens, the city keeps a database tracking these signs by size and address. Times Square Flair is an app that allows you to explore the various signs in conjunction with Google Maps (for location) and Google Streetview (to actually see the sign). It also maintains a database in which you can save your favorites.

My Approach
-----------

First, I pull a list of all Times Square signage from NYC Open Data. This displays on the left side of the page. The user chooses which sign she wishes to see and clicks the appropriate button. This sets off three sequential API calls. The Google Geocoding API provides a latitude and longitude for a given address string. These coordinates are then used to place a marker on an actual Google Map (with the help of the Gmaps4Rails gem). Finally, the coordinates are also used to call the Google Street View Image API, which provides a static street view image of the spot (if available).  

Challenges
---------- 

Since the app relies on a series of sequential API calls, I generate much of the HTML content dynamically through jQuery. While this approach comes more easily to me than others, I think it tends to generate semi-spaghetti code, limiting the willingness of others to contribute and maintain it. For this reason, I may need to reevaluate this approach in the future.  

Currently, I do not have completed functionality for editing and deleting from the user database (although the Rails routes exist). This is mostly a result of these capabilities' relatively low importance for demonstrating the app and my consequent time management choices. I do plan on adding them in the future.  


User Stories
------------

As a user, I want to select a certain sign from the list on the left and see it displayed in Google Maps Streetview on on the right.  

As a user, I want the option to add each sign to my list of favorites for easy access later.  
