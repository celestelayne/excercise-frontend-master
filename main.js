/* JS goes here */
  $(document).ready(function(){
    console.log('Sanity Check: app.js is working!');

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
			// console.log(shows);
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

	var thumbnailPressed;

// Events
// ---------------------------------------------
	thumbnail.addEventListener('click', functionName);

// Event Handler Functions
// ---------------------------------------------
	function functionName(event){
		thumbnailPressed = event.target;
		console.log(thumbnailPressed);

		createImage();
		// createName();
	}

	function createImage(item){
		console.log(shows);
		// create element
		var li = document.createElement('li');
		var bodyText = document.createElement('div');

		shows.forEach(function(show){
			bodyText.innerHTML = show.episode +
			"<br>" + show.title;
		});

		// insert clicked image into DOM
		li.appendChild(thumbnailPressed);
		li.appendChild(bodyText);

		singleShow.appendChild(li);
	}

	function createName(item){
		console.log(shows);
		// create element
		var li = document.createElement('li');
		// style element
		li.textContent = shows;
		// insert into the DOM
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