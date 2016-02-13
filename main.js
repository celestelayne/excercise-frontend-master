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

	var img = document.createElement('img');
	var li = document.createElement('li');
	var p = document.createElement('p');

	var thumbnailPressed, imagePath;

// Events
// ---------------------------------------------
	thumbnail.addEventListener('click', toggleShow);

// Event Handler Functions
// ---------------------------------------------
	function toggleShow(event){
		// console.log(event);
		thumbnailPressed = event.target.src;
		// returns img
		imagePath = event.srcElement.attributes.src.value;
		// var array = imagePath.split("_");
		console.log(imagePath);
		console.log(shows);
		// console.log(array[1]);


		// if (imagePath === shows.image){
		// 	conslole.log("it works");
		// }

		img.setAttribute('src', thumbnailPressed);

		createImage();
	}

	function createImage(item){
		console.log(shows);
		// create element


		shows.forEach(function(show){
			
			console.log(show.image);
			if (imagePath === show.image){
				console.log("true");
				p.innerHTML = show.episode +
			"<br>" + show.title;
			} else {
				console.log('false')
			}
		});

		// insert clicked image into DOM
		li.appendChild(img);
		li.appendChild(p);

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