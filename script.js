console.log('Sanity Check: main.js is working!');

  var shows = [
	  {
	    "id": 1,
	    "title": "Gaycation",
	    "episodes": 12,
	    "product_image_url": "/images/show_1.png"
	  },
	  {
	    "id": 2,
	    "title": "Fuck, That's Delicious",
	    "episodes": 24,
	    "product_image_url": "/images/show_2.png"
	  },
	  {
	    "id": 3,
	    "title": "WEEDIQUETTE",
	    "episodes": 15,
	    "product_image_url": "/images/show_3.png"
	  },
	  {
	    "id": 4,
	    "title": "The Business of Life",
	    "episodes": 5,
	    "product_image_url": "/images/show_4.png"
	  }
	]

	shows.forEach(getShows);

	

	
	
	var p = document.createElement('p');


	function getShows(show){
		// console.log(show);
		var img = document.createElement('img');

		var title = show.title;
		var episode = show.episode;

		var image = show.product_image_url.slice(1);
		img.setAttribute('src', image);

		// console.log(image);
		renderShowToFooter(show)
	}

	function renderShowToFooter(show){
		var thumbnail = document.querySelector('.footer-list');
		var li = document.createElement('li');
		var img = document.createElement('img');
		var image = show.product_image_url.slice(1);
		img.setAttribute('src', image);
		thumbnail.appendChild(li);
		li.appendChild(img);
	}