/* add your script methods and logic here */

'use strict';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/51.505/-0.09/13.png?access_token=pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'), {
	attribution:
	maxZoom: 18,
	id: 'mitchellamundsen.cifyavupf6cf1oekrtrcbopck',
	accessToken: 'pk.eyJ1IjoibWl0Y2hlbGxhbXVuZHNlbiIsImEiOiJjaWZ5YXZ2ejY1MDNmdHRtMXMxN3Rya3QyIn0.jirD-JAi2WCl4wft_KTKUA'
}
