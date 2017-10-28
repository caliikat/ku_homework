$(document).ready(function(){

	//global variables//
	var topics = ["Hello Kitty", "There's Something About Mary", "Betty Boop", "Khal Drogo"];
	var limit = 10;

	//dynamically creates buttons from the topics array//
	function createButtons(){
		$('#buttons').empty();
		for(var i = 0; i < topics.length; i++){
			var b = $("<button>");
			b.attr('class', 'button btn btn-lg');
			b.attr('data-name', topics[i]);
			b.text(topics[i]);
			$("#buttons").append(b);
		}
	}
	createButtons();

	//queries the giphy api based on which button the user clicks//
	function gifQuery(){
		$("#gifs").empty();
		var comedy = $(this).data('name');
		var queryURL = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + comedy + "&limit=" + limit;
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			//inputs the gifs into the DOM//
			for(var i = 0; i < response.data.length; i++){
				var div = $('<div>');
				var img = $("<img>");
				var p = $('<p>');
				p.text('Rating: ' + response.data[i].rating);
				p.attr('class', 'text-center');
				div.attr('class', 'div-gif');
				img.attr('class', 'gif')
				img.attr('data-state', 'still');
				img.attr('data-still', response.data[i].images.fixed_width_still.url);
				img.attr('data-animate', response.data[i].images.fixed_width.url);
				img.attr('src', response.data[i].images.fixed_width_still.url);
				div.append(p, img);
				$("#gifs").append(div);
			}
		});
	}

	//function to add button based on user input//
	function addButton(){
		var input = $('#search').val();
		topics.push(input);
		createButtons();
	}
	//on click functions//
	$('#search-button').on('click', addButton);
	$(document).on('click', '.button', gifQuery);

	//'switch' function to animate or pause the gif based on user click//
	$(document).on('click', '.gif', function(){
		var state = $(this).attr('data-state');
		var still = $(this).attr('data-still');
		var animate = $(this).attr('data-animate');
		if(state === 'still'){
			$(this).attr('data-state', 'animate');
			$(this).attr('src', animate);
		} else{
			$(this).attr('data-state', 'still');
			$(this).attr('src', still);
		}
	});

});
