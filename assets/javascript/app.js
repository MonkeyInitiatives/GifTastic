	var theOffset = 0;
	var thePokemon = "";
	var movies= ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu"];

	function displayMovieInfo(){
		$("#theDiv").empty();
		$('.my-stats').remove()
		theOffset = 0;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("data-name")+"&api_key=dc6zaTOxFJmzC&limit=10";
		var theItem = $(this).attr("data-name");
		thePokemon = theItem;
		ajaxRequest(queryURL, theItem);
		
		var queryURL = "https://pokeapi.co/api/v2/pokemon/"+$(this).attr("data-name").toLowerCase()+"/";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {			
			var myDiv = $("<div>");
				myDiv.addClass("my-stats");
				myDiv.append("<p>Name: " + capital_letter(response.name) + "</p>");
				myDiv.append("<p>Number: "+response.id + "</p>");
// 				cards?name=charizard&setCode=base1
// 				myDiv.append("<img src='"+"https://api.pokemontcg.io/v1/cards?name="+capital_letter(response.name)+"&setCode=base1'>")
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
		ajaxRequest(queryURL, theItem);
	}
	
	function ajaxRequest(queryURL, theItem){
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
					theImage.attr("alt", response.data[key].title);
					theImage.height(200);    
					var myDiv = $("<div>");
					myDiv.addClass("my-div");
					myDiv.append("<p>Rating: " + response.data[key].rating.toUpperCase() + "</p>");
					myDiv.append(theImage);
// 					myDiv.append("<a class='button  btn-primary downloadButton' href='"+response.data[key].images.original.url+"' download='smile.gif'>Download</a>");
					
					$("#theDiv").append(myDiv);
				}
				$(".imageHover").unbind("click");
				$(".imageHover").on("click", function(){
					
					if($(this).attr("src")===$(this).attr("data-gif"))
					{
						var theImageHTML = $(this).attr("data-still");
						$(this).attr( "src", theImageHTML)
					}
					else{
						var theImageHTML = $(this).attr("data-gif");
						$(this).attr( "src", theImageHTML);  
					}
				});
				$(".imageHover").unbind("dblclick");
				$(".imageHover").on("dblclick", function(){
					var theImage =$("<img>");
					theImage.attr( "src", $(this).attr("data-still"));
					theImage.attr("data-still", $(this).attr("data-still"));        
					theImage.attr("data-gif", $(this).attr("data-gif"));        
					theImage.addClass("imageHover");
					theImage.height(200);    
					var myDiv = $("<div>");
					myDiv.addClass("my-div");
					myDiv.append(theImage);
					$(".my-favorites").prepend(myDiv);
					
					$(".imageHover").unbind("click");
					$(".imageHover").on("click", function(){
						
						if($(this).attr("src")===$(this).attr("data-gif"))
						{
							var theImageHTML = $(this).attr("data-still");
							$(this).attr( "src", theImageHTML)
						}
						else{
							var theImageHTML = $(this).attr("data-gif");
						$(this).attr( "src", theImageHTML);  
						}
					});
					localStorage["myKey"] = JSON.stringify($(".my-favorites").html());
					$(".clear-favorites").show();
				});
			});		
	}

	function renderButtons() {
		$("#buttons-view").empty();
		for (var i = 0; i < movies.length; i++) {
			var button = $("<button>");
			button.addClass("movie");
			button.addClass("btn btn-primary");
			button.attr("data-name", movies[i]);
			button.text(movies[i]);
			$("#buttons-view").append(button);
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
		var a = $("<button>");
		a.addClass("more");
		a.addClass("btn btn-primary");
		a.attr("data-name", $(this));
		a.text("Load More");
		$("#movie-form").append(a);
		$(".more").on("click", function(event) {
			event.preventDefault();
			theOffset +=10;
			loadMore(thePokemon);
		});
		var a = $("<button>");
		a.addClass("hide-buttons");
		a.addClass("btn btn-primary");
		a.attr("data-name", $(this));
		a.text("Expand");
		$("#buttons-toggle").append(a);
		$(".hide-buttons").on("click", function(event) {
			event.preventDefault();
			if($(".hide-buttons").text()==="Expand"){
				$("#buttons-view").css("display", "block");
				$(".hide-buttons").text("Collapse");
			}
			else{
				$("#buttons-view").css("display", "none");
				$(".hide-buttons").text("Expand");
			}
		});
		var a = $("<button>");
		a.addClass("clear-favorites");
		a.addClass("btn btn-primary");
		a.attr("data-name", $(this));
		a.text("Clear");
		$(".clear-favorites-div").append(a);
		$(".clear-favorites").hide();
		if (localStorage["myKey"] != null) {
	    	var contentsOfOldDiv = JSON.parse(localStorage["myKey"]);    
			$(".my-favorites").html(contentsOfOldDiv);
			$(".clear-favorites").show();
			$(".imageHover").unbind("click");
			$(".imageHover").on("click", function(){
				
				if($(this).attr("src")===$(this).attr("data-gif"))
				{
					var theImageHTML = $(this).attr("data-still");
					$(this).attr( "src", theImageHTML)
				}
				else{
					var theImageHTML = $(this).attr("data-gif");
				$(this).attr( "src", theImageHTML);  
				}
			});
	    } 
	    $(".clear-favorites").on("click", function(event) {
			localStorage.clear();
			$(".my-favorites").empty();
			$(".clear-favorites").hide();
		});
	});