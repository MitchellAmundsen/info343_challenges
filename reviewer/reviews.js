
'use strict';

$(document).ready(function() {

	Parse.initialize("qD0WIpZqL6uAdy2qpzXHLs50D9LK7xCHOD0Ls4ib", "blUgryOj5npsrwKOCXaoWAL19FYJ5vYiIW654IAn");

	/*var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
 		 alert("yay! it worked");
	});
*/
		$('#starInput').raty({
		path: 'raty-2.7.0/lib/images/',
		half: true,
		halfShow: true
	});
	// grabs review object from parse database	
	var MyClass = Parse.Object.extend("review");
	// submits form ans stores information in parse as review object
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

		//resets form fields to empty
		$('#titleInput').val('');
		$('#paragraphInput').val('');
		$('#starInput>input').score(0);

		return false;
	});

	//searches parse database for review class
	var query = new Parse.Query(MyClass);
	query.find({
		success: function(results) {
			var totalScore = 0;
			var count = 0;
			// goes through each review and adds html elements to populate page
			for(var i=0; i<results.length; i++) {
				var current = results[i];
				var currentScore = current.get('score');
				totalScore = totalScore + currentScore;
				count++;
				var currentTitle = current.get('title');
				var currentParagraph = current.get('paragraph');

				//makes different id for each review 
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
			//makes overall score using average score from populating count
			var overallScore = totalScore/count;
			$('#stars').raty({
				path: 'raty-2.7.0/lib/images/',
				half: true,
				halfShow: true,
				readOnly: true,
				score: Math.round(overallScore*2)/2
			});
		}
	});

	console.log("test");
});