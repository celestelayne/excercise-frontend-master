/* JS goes here */
  $(document).ready(function(){
    console.log('Sanity Check: main.js is working!');

    getShows(shows);

  });

var shows = [];

// get the data
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

	// get references to page elements
	var thumbnail = document.querySelector('.footer-list');
	var contentElement = document.querySelector('.single-show');

	// grab each thumbnail
	var thumbnailElements = document.querySelectorAll('.show-selector');
	var titleEl = document.querySelector('.title');
	var imageEl = document.querySelector('.show-image');

	var img = document.createElement('img');
	var li = document.createElement('li');
	var h2 = document.createElement('h2');
	var h5 = document.createElement('h5');

	var thumbnailPressed, imagePath;

// Event Listeners
// ---------------------------------------------
	
	thumbnail.addEventListener('click', getPageData);
	thumbnail.addEventListener('click', toggleShow);

// Event Handler Functions
// ---------------------------------------------
	function toggleShow(event){
		// console.log(event);
		thumbnailPressed = event.target.src;
		// returns img
		imagePath = event.srcElement.attributes.src.value;
		// console.log(imagePath);
		// console.log(shows);

		img.setAttribute('src', thumbnailPressed);

		h2.classList.add('title');
		img.classList.add('show-image');

		createImage();
		// updateContent()

	}

	// Functions
	// ---------------------------------------------

	function createImage(){
		console.log(shows);
		var currentUrl = thumbnailPressed;

		// var currentUrl = window.location.href;
		console.log(currentUrl);

		// data-url ==> img src (event.target.src) <== thumbnailPressed
		// var showURL = li.setAttribute('data-url', currentUrl);

		var pageData = currentUrl.split('.')[0];
		console.log(pageData);

		// Creates a new history entry.
		// window.history.pushState(stateObj, title, URL);
		// window.history.pushState(pageData, showURL);

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

		contentElement.appendChild(li);

		// updateContent(pageData);

	}

	function updateContent(stateObj){
	// 	// get page elements
	// 	var titleEl = document.querySelector('.title');
	// 	var episodeEl = document.querySelector('.episode');

		console.log(stateObj);
	// 	// check to make sure the state isn't null
		if(stateObj){
			document.title = stateObj.title;
			titleEl.innerHTML = stateObj.title;
			iamgeEl.innerHTML = stateObj.episode;
		}
	};

	function getPageData(event){
			console.log('in here');
		for (var i = 0; i < thumbnailElements.length; i++) {
			var check = thumbnailElements[i];
			console.log(check)
		}

					// event.preventDefault();

					// var showURL = this.attributes;
					// console.log(showURL)

			


			
			// console.log(showURL)
			// 	var showData = shows[showURL.split('.')[0]];
			// 	console.log(showData)

					// Update the title and content.
		      // updateContent(showData);

		      // Create a new history item.
		      // history.pushState(showData, showData.title, showURL);

			// updateContent();
	}


	// Update the page content when the popstate event is called.
	window.addEventListener('popstate', function(event) {
	  updateContent(event.state)
	});

	// Load initial content.
	updateContent(shows[0]);

  // Update this history event so that the state object contains the data
  // for the homepage.
  // history.replaceState(shows[0], shows[0]['id'], '');

// Handlebars
// ---------------------------------------------
	function renderShows(show){
		// console.log('rendering shows: ', show);

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