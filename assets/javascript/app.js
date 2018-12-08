	var theOffset = 0;
	var movies= ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu"];

	function displayMovieInfo(){
		$("#theDiv").empty();
		$('.more').remove();
		$('.my-stats').remove()
		theOffset = 0;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("data-name")+"&api_key=dc6zaTOxFJmzC&limit=10";
		var theItem = $(this).attr("data-name");
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			for (var key in response.data) {
				var theImageHTML = response.data[key].images.original_still.url;
				var theImage =$("<img>");
				theImage.attr( "src", theImageHTML);
				theImage.attr("data-still", response.data[key].images.original_still.url);        
				theImage.attr("data-gif", response.data[key].images.original.url);        
				theImage.addClass("imageHover");
				theImage.height(200);    
				var myDiv = $("<div>");
				myDiv.addClass("my-div");
				myDiv.append("<p>Rating: " + response.data[key].rating.toUpperCase() + "</p>");
				myDiv.append(theImage);
				$("#theDiv").append(myDiv);
			}
			$(".imageHover").on("mouseover", function(){
				var theImageHTML = $(this).attr("data-gif");
				$(this).attr( "src", theImageHTML);        
			});
			$(".imageHover").on("mouseout", function(){
				var theImageHTML = $(this).attr("data-still");
				$(this).attr( "src", theImageHTML);        
			});
			$(".imageHover").on("click", function(event) {
				
				
/*
				var theImage =$("<img>");
				theImage.attr( "src", $(this).attr("data-still"));
				theImage.attr("data-still", $(this).attr("data-still"));        
				theImage.attr("data-gif", $(this).attr("data-gif"));        
				theImage.addClass("imageHover");
				theImage.height(200);    
				var myDiv = $("<div>");
				myDiv.addClass("my-div");
				myDiv.append(theImage);
				$(".my-favorites").append(myDiv);
				
				$(".imageHover").on("mouseover", function(){
					var theImageHTML = $(this).attr("data-gif");
					$(this).attr( "src", theImageHTML);        
				});
				$(".imageHover").on("mouseout", function(){
					var theImageHTML = $(this).attr("data-still");
					$(this).attr( "src", theImageHTML);        
				});
*/
				
				
				
			});
			var a = $("<button>");
			a.addClass("more");
			a.addClass("btn btn-primary");
			a.attr("data-name", $(this));
			a.text("Load More");
			$(".col-lg-3").append(a);
			$(".more").on("click", function(event) {
				theOffset +=10;
				loadMore(theItem);
			});
		});
		
		//https://pokeapi.co/api/v2/pokemon/ditto/
		var queryURL = "https://pokeapi.co/api/v2/pokemon/"+$(this).attr("data-name").toLowerCase()+"/";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {			
			var myDiv = $("<div>");
				myDiv.addClass("my-stats");
				myDiv.append("<p>Name: " + capital_letter(response.name) + "</p>");
				myDiv.append("<p>Number: "+response.id + "</p>");
			var theStats = $("<p>");
			for (var key in response.stats) {
				theStats.prepend("<p>"+capital_letter(response.stats[key].stat.name)+": "+response.stats[key].base_stat+"</p>");
			};
			
			myDiv.append(theStats);
			
			$(".my-stats-div").append(myDiv);
		});
		
		
	}
	
	function capital_letter(str) 
	{
	    str = str.split(" ");
	
	    for (var i = 0, x = str.length; i < x; i++) {
	        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
	    }
	
	    return str.join(" ");
	}
	
	function loadMore(theItem){
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+theItem+"&api_key=dc6zaTOxFJmzC&limit=10&offset="+theOffset;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			for (var key in response.data) {
				var theImageHTML = response.data[key].images.original_still.url;
				var theImage =$("<img>");
				theImage.attr( "src", theImageHTML);
				theImage.attr("data-still", response.data[key].images.original_still.url);        
				theImage.attr("data-gif", response.data[key].images.original.url);        
				theImage.addClass("imageHover");
				theImage.height(200);    
				var myDiv = $("<div>");
				myDiv.addClass("my-div");
				myDiv.append("<p>Rating: " + response.data[key].rating.toUpperCase() + "</p>");
				myDiv.append(theImage);
				$("#theDiv").append(myDiv);
			}
			$(".imageHover").on("mouseover", function(){
				var theImageHTML = $(this).attr("data-gif");
				$(this).attr( "src", theImageHTML);        
			});
			$(".imageHover").on("mouseout", function(){
				var theImageHTML = $(this).attr("data-still");
				$(this).attr( "src", theImageHTML);        
			});
			$(".imageHover").on("click", function(event) {
				
				
/*
				var theImage =$("<img>");
				theImage.attr( "src", $(this).attr("data-still"));
				theImage.attr("data-still", $(this).attr("data-still"));        
				theImage.attr("data-gif", $(this).attr("data-gif"));        
				theImage.addClass("imageHover");
				theImage.height(200);    
				var myDiv = $("<div>");
				myDiv.addClass("my-div");
				myDiv.append(theImage);
				$(".my-favorites").append(myDiv);
				
				$(".imageHover").on("mouseover", function(){
					var theImageHTML = $(this).attr("data-gif");
					$(this).attr( "src", theImageHTML);        
				});
				$(".imageHover").on("mouseout", function(){
					var theImageHTML = $(this).attr("data-still");
					$(this).attr( "src", theImageHTML);        
				});
*/

				
				
				
			});
		});
	}

	function renderButtons() {
		$("#buttons-view").empty();
		for (var i = 0; i < movies.length; i++) {
			var a = $("<button>");
			a.addClass("movie");
			a.addClass("btn btn-primary");
			a.attr("data-name", movies[i]);
			a.text(movies[i]);
			$("#buttons-view").append(a);
		}
	}
	$(document).on("click", ".movie", displayMovieInfo);

	$("#add-movie").on("click", function(event) {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		movies.push(movie);
		renderButtons();
	});
	$(document).ready(function() {
		renderButtons();
	});