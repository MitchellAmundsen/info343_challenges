/* add your script methods and logic here */

'use strict';


	var map = L.map('map-container').setView([45.475, -100.348], 4);

	L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mitchellamundsen.cifyavupf6cf1oekrtrcbopck',
		accessToken: 'pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'
			}).addTo(map);


	var armedGroup = L.layerGroup();
	var unarmedGroup = L.layerGroup();

	var armedArray = [];
	var unarmedArray = [];

	var dataProcess = function(data){
		for(var i=0; i<data.length; i++){
			var current = data[i];
			var armed = current.armed;
			
			if(armed==true){
				var marker = L.circle([current.lat, current.lng], 1000, {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5
				});
				marker.addTo(armedGroup);
				armedArray.push(current);
			} 
			else{
				var marker = L.circle([current.lat, current.lng], 1000, {
					color: 'blue',
					fillColor: '#1E90FF',
					fillOpacity: 0.5
				});
				marker.addTo(unarmedGroup);
				unarmedArray.push(current);
			}
		}
		
		var overlay = {
			"Armed" : armedGroup,
			"Unarmed" : unarmedGroup
		};
		var options = {
			collapsed : false
		}

		L.control.layers(null, overlay, options).addTo(map);

		if(options)
		// how do you call checkbox for groups (armed unarmed)
		//popup not working



	};

	$.getJSON('data/data.min.json').then(dataProcess);




