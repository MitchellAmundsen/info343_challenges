
'use strict';

$(document).ready(function() {

	Parse.initialize("qD0WIpZqL6uAdy2qpzXHLs50D9LK7xCHOD0Ls4ib", "blUgryOj5npsrwKOCXaoWAL19FYJ5vYiIW654IAn");

	/*var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
 		 alert("yay! it worked");
	});
*/
	$('#stars').raty({
		path: 'raty-2.7.0/lib/images/',
		half: true,
		halfShow: true,
		readOnly: true
	});
		$('#starInput').raty({
		path: 'raty-2.7.0/lib/images/',
		half: true,
		halfShow: true
	});

	var MyClass = Parse.Object.extend("review");

	$('form').submit(function(){
		var review = new MyClass();

		var box1 = $('#titleInput').val();
		var box2 = $('#paragraphInput').val();
		var num = parseFloat($('#starInput>input').val());

		//var starScore = 
		console.log("test123");
		review.set('title', box1);
		review.set('paragraph', box2);
		review.set('score', num);
		review.set('votes', 0);
		review.set('upvotes', 0);

		review.save(null, {
			success: function(){
		}});

		$('#titleInput').val('');
		$('#paragraphInput').val('');
		$('#starInput>input').score(0);

		return false;
	});

	var query = new Parse.Query(MyClass);
	query.find({
		success: function(results) {
			for(var i=0; i<results.length; i++) {
				var current = results[i];
				var currentScore = current.get('score');
				var currentTitle = current.get('title');
				var currentParagraph = current.get('paragraph');

				var currentID = '#'+i;

				var division = '<div class="container-fluid existing" id="'+i+'"></div>'
				var stars = $("<div></div>").raty({
					path: 'raty-2.7.0/lib/images/',
					readOnly:true,
					score: currentScore
				});
				var titleTag = '<h3 class="container-fluid textbox">'+ currentTitle + '</h3>';
				var paraTag = '<h4 class="container-fluid textbox">'+ currentParagraph + '</h4>';

				$('#previousReviews').append(division);
				$(currentID).append(stars);
				$(currentID).append(titleTag);
				$(currentID).append(paraTag);
				$('#previousReviews').append("<div class='spacing'></div>");
			}
		}
	});

	console.log("test");
});