/* add your script methods and logic here */

'use strict';

var map = L.map('map-container').setView([34.475, -100.348], 4);

L.tileLayer('https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mitchellamundsen.cifyavupf6cf1oekrtrcbopck',
	accessToken: 'pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'
		}).addTo(map);


var armedGroup = L.layerGroup();
var unarmedGroup = L.layerGroup();


var dataProcess = function(data){
	for(var i=0; i<=data.length; i++){
		var currentObj = data[i];
		var victim = currentObj.victim;

		var marker = L.marker([currentObj.lat, currentObj.lng]);
		if(armed==true){
			armedGroup.addLayer(marker);
		} else{
			unarmedGroup.addLayer(marker);
		}
	}
};

$.getJSON('data/data.min.json').then(dataProcess);


L.control.layers(null, armedGroup).addTo(map);
L.control.layers(null, unarmedGroup).addTo(map);




