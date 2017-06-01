//global variables
var currentUrl = true;

//create an array of tv shows
var items = ["doctor+who", "sherlock", "orange+is+the+new+black", "archer", "orphan+black", "how+to+get+away+with+murder", "the+walking+dead", "outlander"];

//create function to display item info
function displayItemInfo() {
	$("#items-view").empty();
	var item = $(this).attr("dataName");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";

	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done (function(response) {

		console.log(response);

		//create a variable to hold item div
		var itemDiv = $("<div class = 'item'>");

		//loop thru all 10 objects in response
		for (var i=0; i<10; i++) {

			//create variable to hold image url
			var itemUrl = response.data[i].images.original_still.url;
			
			//create an element to display the item
			var itemEl = "<div class = 'img' id = num" + i + "><img src ='" + itemUrl + "'><p>Rating: " + response.data[i].rating;

			//appending image to the element
			itemDiv.append(itemEl);

			//display on screen
			$("#items-view").prepend(itemDiv);
		}

		//click event listener for all images
		$(document).on("click", ".img", toggleGif);

		function toggleGif() {

			//get index of image
			var temp = $(this).attr("id");
			temp.split(/[0-9]+/);			
			var ix = temp[3];			
			var newId = "#num" + ix;

			if(currentUrl) {
				
				currentUrl = false;

				//create variable to hold new image url
				var newUrl = response.data[ix].images.preview_gif.url;
				
				//create an element to display the new item
				var newEl = "<img src ='" + newUrl + "'><p>Rating: " + response.data[ix].rating;

				//replace on screen
				$(newId).html(newEl);

				}

			else {
				
				currentUrl=true;

				//create variable to hold new image url
				var newUrl = response.data[ix].images.original_still.url;
				
				//create an element to display the new item
				var newEl = "<img src ='" + newUrl + "'><p>Rating: " + response.data[ix].rating;

				//replace on screen
				$(newId).html(newEl);

			}		
		}

		

	});
}

function renderButtons() {

	//empty previous buttons
	$("#buttons-view").empty();

	//loop thru the items array
	for (var i=0; i<items.length; i++) {

		//make item readable
		show = items[i].split("+").join(" ");
		var a = $("<button>");
		a.addClass("butt");
		a.attr("dataName", items[i]);
		a.text(show);
		$("#buttons-view").append(a);
	}
}



//click function for submit button on form
$("#addItem").on("click", function(event) {
	event.preventDefault();

	//grab input
	var item = $("#itemInput").val().trim();

	//convert item to url format
	item = item.split(" ").join("+").toLowerCase();

	//add input to array
	items.push(item);

	//call render button function
	renderButtons();
});

	//click event listener for all buttons
	$(document).on("click", ".butt", displayItemInfo);

	//initial buttons
	renderButtons();

