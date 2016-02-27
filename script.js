window.onload = function() {
  console.log('Sanity Check: main.js is working!');

  getShows(shows);

};

var shows = [];
var imagePath;

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
				var id = showData.id;
				var episode = showData.episodes;
				var image = showData.product_image_url.slice(1);
				// console.log(image);
				var title = showData.title;

				shows.push({
					id: id,
					episode: episode,
					image: image,
					title: title
				});
			}
			console.log(shows);
			renderShows(shows);
			updateContent(shows);
			createHistoryItem(shows);
		},
	    error: function(){
      console.log('sad face');
    }
	});

}

  // Create page elements
 	var img = document.createElement('img');
	var li = document.createElement('li');
	var h2 = document.createElement('h2');
	var h5 = document.createElement('h5');

	// Get references to the page elements.
	var thumbnail = document.querySelector('.footer-list');
  
	var navLinks = document.querySelectorAll('.show-selector');
	console.log(navLinks)
  // var imageElement = document.querySelector('img');
  var titleElement = document.querySelector('h2');
  var episodeElement = document.querySelector('h5'); 

// Event Listeners
// ---------------------------------------------
	
	thumbnail.addEventListener('click', updateContent);

	for(var i = 0; i < navLinks.length; i++){
		navLinks[i].addEventListener('click', createHistoryItem);
	}

	// Event Handler Functions
	// ------------------------------------------


  // Update the page content.
  function updateContent(stateObj) {
  	console.log(stateObj);
  // Check to make sure that this state object is not null.
    if (stateObj) {
      document.title = stateObj.title;
      // imageElement.innerHTML = stateObj.
      titleElement.innerHTML = stateObj.title;
      episodeElement.innerHTML = stateObj.episodes;
    }
  };

	// i think this does not work becasue
	// the elements are create by handlebars
	// how to fix?
	function createHistoryItem(event){
		// event.preventDefault();
		console.log("inside here")
		var currentURL = location.pathname;
		var pageData = currentURL.split('.')[0];
		console.log(pageData)
			// Fetch the page data using the URL in the link.
			this.shows.forEach(function(show){
				var pageURL = show.id;
				var url = pageData + "?id=" + pageURL;
				console.log(url);
			});
		  // Update the page content when the popstate event is called.
			window.addEventListener('popstate', function(event) {
				console.log('popstate fired!');
		  	updateContent(event.state)
			});

		  // Load initial content.
		  console.log(shows);
	}





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