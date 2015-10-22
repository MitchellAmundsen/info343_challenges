/* add your script methods and logic here */

'use strict';

	//creates base map
	var map = L.map('map-container').setView([40.475, -100.348], 4);

	L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mitchellamundsen.cifyavupf6cf1oekrtrcbopck',
		accessToken: 'pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'
			}).addTo(map);


	

	var dataProcess = function(data){
		//create layer groups
		var armedGroup = L.layerGroup();
		var unarmedGroup = L.layerGroup();

		var armedArray = [];
		var unarmedArray = [];

		// goes through and add markers to appropriate layer groups
		for(var i=0; i<data.length; i++){
			var current = data[i];
			var armed = current.armed;

			if(armed==true){
				var marker = L.circle([current.lat, current.lng], 1500, {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5
				}).bindPopup(current.summary);
				marker.addTo(armedGroup);
				armedArray.push(current);
			} 
			else{
				var marker = L.circle([current.lat, current.lng], 1500, {
					color: 'blue',
					fillColor: '#1E90FF',
					fillOpacity: 0.5
				}).bindPopup(current.summary);
				marker.addTo(unarmedGroup);
				unarmedArray.push(current);
			}
		}
		//var overlay = {
		//	"Armed" : armedGroup,
		//	"Unarmed" : unarmedGroup
		//};
		//var options = {
		//	collapsed : false
		//}
//
		//L.control.layers(null, overlay, options).addTo(map);

		//counts shots
		var ageCount = function(array){
			var totalAge = 0;
			for(var i=0; i<array.length; i++){
				if(array[i].victim != "undefined" && array[i].victim != null){
					totalAge += array[i].victim.age;
				}
			}
			return totalAge;
		}
		//counts age value
		var shotsCount = function(array){
			var totalShots = 0;
			for(var i=0; i<array.length; i++){
				if(typeof array[i].shots == "number"){
					totalShots += array[i].shots;
				}
				
			}
			return totalShots;
		}
		var armedCount = armedArray.length;
		var unarmedCount = unarmedArray.length;
		var count = 0;

		var shotsArmed = shotsCount(armedArray);
		var shotsUnarmed = shotsCount(unarmedArray);

		var ageArmed = ageCount(armedArray);
		var ageUnarmed = ageCount(unarmedArray);

		//adds and removes layer group for armed 
		$('#armed').click(function (){
			if(map.hasLayer(armedGroup)){
				var shotSave = $('#shots').text();
				map.removeLayer(armedGroup);
				var newShot = +shotSave - shotsArmed;
				count = +count - armedCount;
				$('#shots').text(newShot);
				$('#shotsavg').text(newAge/count);
			}else{
				var shotSave = $('#shots').text();
				map.addLayer(armedGroup);
				var newShot = +shotSave + shotsArmed;
				count = +count + armedCount;
				$('#shots').text(newShot);
				$('#shotsavg').text(newShot/count);
			}
		});

		//adds and removes layer group for armed
		$('#unarmed').click(function (){
			if(map.hasLayer(unarmedGroup)){
				var shotSave = $('#shots').text();
				map.removeLayer(unarmedGroup);
				count = +count - unarmedCount;
				var newShot = +shotSave - shotsUnarmed;
				$('#shots').text(newShot);
				$('#shotsavg').text(newShot/count);
			}else{
				var shotSave = $('#shots').text();
				map.addLayer(unarmedGroup);
				var newShot = +shotSave + shotsUnarmed;
				count = +count + unarmedCount;
				$('#shots').text(newShot);
				$('#shotsavg').text(newShot/count);
			}
		});

	};

	$.getJSON('data/data.min.json').then(dataProcess);

