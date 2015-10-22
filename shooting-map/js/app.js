/* add your script methods and logic here */

'use strict';

	var map = L.map('map-container').setView([45.475, -100.348], 4);

	L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mitchellamundsen.cifyavupf6cf1oekrtrcbopck',
		accessToken: 'pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'
			}).addTo(map);


	

	var dataProcess = function(data){
		var armedGroup = L.layerGroup();
		var unarmedGroup = L.layerGroup();

		var armedArray = [];
		var unarmedArray = [];

		for(var i=0; i<data.length; i++){
			var current = data[i];
			var armed = current.armed;

			if(armed==true){
				var marker = L.circle([current.lat, current.lng], 1000, {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5
				}).bindPopup(current.summary);
				marker.addTo(armedGroup);
				armedArray.push(current);
			} 
			else{
				var marker = L.circle([current.lat, current.lng], 1000, {
					color: 'blue',
					fillColor: '#1E90FF',
					fillOpacity: 0.5
				}).bindPopup(current.summary);
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

		var shotsCount = function(array){
			var totalShots = 0;
			for(var i=0; i<array.length; i++){
				totalShots += array[i].victim.age;
			}
			return totalShots;
		}
		var ageCount = function(array){
			var totalAge = 0;
			for(var i=0; i<array.length; i++){
				totalAge = array[i].shots;
			}
			return totalAge;
		}

		var shotsArmed = shotsCount(armedArray);
		var shotsUnarmed = shotsCount(unarmedArray);

		var ageArmed = ageCount(armedArray);
		var ageUnarmed = ageCount(unarmedArray);

		map.on(layerAdd, function(){
			
		})

	};

	$.getJSON('data/data.min.json').then(dataProcess);

