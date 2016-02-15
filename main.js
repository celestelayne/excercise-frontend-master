/* JS goes here */
  $(document).ready(function(){
    console.log('Sanity Check: main.js is working!');

    getShows(shows);

  });

var shows = [];

function getShows(){
	$.ajax({
		method: 'GET',
		url: 'https://api.myjson.com/bins/3rsrp',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.length; i++){
				var showData = data[i];
				// console.log(showData);

				var episode = showData.episodes;
				var image = showData.product_image_url.slice(1);
				// console.log(image);
				var title = showData.title;

				shows.push({
					episode: episode,
					image: image,
					title: title
				});
			}
			console.log(shows);
			renderShows(shows);
		},
	    error: function(){
      console.log('sad face');
    }
	});
}

// Structure
// ---------------------------------------------
	var thumbnail = document.querySelector('.footer-list');
	var singleShow = document.querySelector('.single-show');

	var img = document.createElement('img');
	var li = document.createElement('li');
	var h2 = document.createElement('h2');
	var h5 = document.createElement('h5');

	var thumbnailPressed, imagePath;

// Event Listeners
// ---------------------------------------------
	
	window.addEventListener('popstate', function(event){
		var state = event.state;
		console.log(event);
	});

	thumbnail.addEventListener('click', toggleShow);

// Event Handler Functions
// ---------------------------------------------
	function toggleShow(event){
		// console.log(event);
		thumbnailPressed = event.target.src;
		// returns img
		imagePath = event.srcElement.attributes.src.value;
		console.log(imagePath);
		console.log(shows);

		img.setAttribute('src', thumbnailPressed);

		createImage();
	}

	function createImage(){
		console.log(shows);
		var currentUrl = window.location.href;

		// var currentUrl = window.location.href;
		// console.log(currentUrl);
		// li.setAttribute('data', currentUrl);

		// shows.forEach(function(show){
		// 	console.log(show.image);

		var page_url = li.setAttribute('data-url', currentUrl);

		shows.forEach(function(show){
			// console.log(show.image);

			if (imagePath === show.image){
				console.log("true");
				
				var episode = show.episode;
				h5.textContent = episode + ' episodes';

				var title = show.title;
				h2.textContent = title;

			} else {
				console.log('false');
			}
		});

		// insert clicked image into DOM
		li.appendChild(img);
		li.appendChild(h5);
		li.appendChild(h2);

		singleShow.appendChild(li);
	}



// Handlebars
// ---------------------------------------------
	function renderShows(show){
		console.log('rendering shows: ', show);

	  // handlebars template
	  // get the template content
	  var template = $('#showTemplate').html();

	  // compile the template data into a function
	    var compiledTemplate = Handlebars.compile(template);
	  // Render the data into the template
	    var htmlFromCompiledTemplate = compiledTemplate({ show: show });

	  // Overwrite the contents of #arts with rendered html back to document
	    $('#shows').append( htmlFromCompiledTemplate );
	}