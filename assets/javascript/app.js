var loadMoreAPIOffset = 0;
var theSelectedPokemon = "";
var pokemonArray= ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu"];
var original151Pokemon = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran","nidorina","nidoqueen","nidoran","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetch'd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr. mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];
function displayPokemonInfo(){
	$("#galleryDiv").empty();
	$('.my-stats').remove()
	loadMoreAPIOffset = 0;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).attr("data-name")+"&api_key=dc6zaTOxFJmzC&limit=10";
	var theItem = $(this).attr("data-name");
	theSelectedPokemon = theItem;
	ajaxRequest(queryURL, theItem);
	var queryURL = "https://pokeapi.co/api/v2/pokemon/"+$(this).attr("data-name").toLowerCase()+"/";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {			
		var myDiv = $("<div>");
			myDiv.addClass("my-stats");
			myDiv.append("<p>Name: " + capitalize(response.name) + "</p>");
			myDiv.append("<p>Number: "+response.id + "</p>");
		var theStats = $("<p>");
		for (var key in response.stats) {
			theStats.prepend("<p>"+capitalize(response.stats[key].stat.name)+": "+response.stats[key].base_stat+"</p>");
		};
		myDiv.append(theStats);
		$(".my-stats-div").append(myDiv);
	});
}
function capitalize(str) 
{
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}
function loadMore(theItem){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+theItem+"&api_key=dc6zaTOxFJmzC&limit=10&offset="+loadMoreAPIOffset;
	ajaxRequest(queryURL, theItem);
}
function ajaxRequest(queryURL, theItem){
	$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			for (var key in response.data) {
				var theImage =$("<img>");
				theImage.attr("src", response.data[key].images.original_still.url);
				theImage.attr("data-still", response.data[key].images.original_still.url);        
				theImage.attr("data-gif", response.data[key].images.original.url);        
				theImage.addClass("image-hover");
				theImage.attr("alt", response.data[key].title);
				theImage.height(200);    
				var imageDiv = $("<div>");
				imageDiv.addClass("image-div");
				imageDiv.append("<p>Rating: " + response.data[key].rating.toUpperCase() + "</p>");
				imageDiv.append(theImage);
				$("#galleryDiv").append(imageDiv);
			}
			$(".image-hover").unbind("click");
			$(".image-hover").on("click", function(){
				playPauseGifs($(this));
			});
			$(".image-hover").unbind("dblclick");
			$(".image-hover").on("dblclick", function(){
				var theImage =$("<img>");
				theImage.attr( "src", $(this).attr("data-still"));
				theImage.attr("data-still", $(this).attr("data-still"));        
				theImage.attr("data-gif", $(this).attr("data-gif"));        
				theImage.addClass("image-hover");
				theImage.attr("alt", "Favorited GIF");
				theImage.height(200);    
				var imageDiv = $("<div>");
				imageDiv.addClass("image-div");
				imageDiv.append(theImage);
				$(".my-favorites").prepend(imageDiv);
				$(".image-hover").unbind("click");
				$(".image-hover").on("click", function(){
					playPauseGifs($(this));
				});
				localStorage["myKey"] = JSON.stringify($(".my-favorites").html());
				$(".clear-favorites").show();
			});
		});		
}
function renderButtons() {
	$("#buttonsView").empty();
	for (var i = 0; i < pokemonArray.length; i++) {
		var button = $("<button>");
		button.addClass("pokemon btn btn-primary");
		button.attr("data-name", pokemonArray[i]);
		button.text(capitalize(pokemonArray[i]));
		$("#buttonsView").append(button);
	}
}
function playPauseGifs(theGif){
	if(theGif.attr("src")===theGif.attr("data-gif"))
	{
		var theImageHTML = theGif.attr("data-still");
		theGif.attr( "src", theImageHTML)
	}
	else{
		var theImageHTML = theGif.attr("data-gif");
		theGif.attr( "src", theImageHTML);  
	}
}
$(document).on("click", ".pokemon", displayPokemonInfo);
$("#addPokemon").on("click", function(event) {
	event.preventDefault();
	var pokemon = $("#pokemonInput").val().trim().toLowerCase();
	if($.inArray(pokemon, original151Pokemon)!="-1"){
		console.log($.inArray(pokemon, original151Pokemon));
		if($.inArray(pokemon, pokemonArray)=="-1"){
			console.log($.inArray(pokemon, pokemonArray));
			pokemonArray.push(pokemon);
			renderButtons();
		}
		else{
			$("#pokemonInput").val('Already exists!');
		}
	}
	else{
		$("#pokemonInput").val('Not a valid Pokemon');
	}
	
});
$(document).ready(function() {
	renderButtons();
	var button = $("<button>");
	button.addClass("more btn btn-primary");
	button.attr("data-name", $(this));
	button.text("Load More");
	$("#pokemonForm").append(button);
	$(".more").on("click", function(event) {
		event.preventDefault();
		loadMoreAPIOffset +=10;
		loadMore(theSelectedPokemon);
	});
	var button = $("<button>");
	button.addClass("hide-buttons btn btn-primary");
	button.attr("data-name", $(this));
	button.text("Expand");
	$("#buttonsToggle").append(button);
	$(".hide-buttons").on("click", function(event) {
		event.preventDefault();
		if($(".hide-buttons").text()==="Expand"){
			$("#buttonsView").css("display", "block");
			$(".hide-buttons").text("Collapse");
		}
		else{
			$("#buttonsView").css("display", "none");
			$(".hide-buttons").text("Expand");
		}
	});
	var button = $("<button>");
	button.addClass("clear-favorites btn btn-primary");
	button.attr("data-name", $(this));
	button.text("Clear");
	$(".clear-favorites-div").append(button);
	$(".clear-favorites").hide();
	if (localStorage["myKey"] != null) {
    	var contentsOfOldDiv = JSON.parse(localStorage["myKey"]);    
		$(".my-favorites").html(contentsOfOldDiv);
		$(".clear-favorites").show();
		$(".image-hover").unbind("click");
		$(".image-hover").on("click", function(){
			playPauseGifs($(this));
		});
    } 
    $(".clear-favorites").on("click", function(event) {
		localStorage.clear();
		$(".my-favorites").empty();
		$(".clear-favorites").hide();
	});
});