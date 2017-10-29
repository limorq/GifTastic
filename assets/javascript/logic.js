var currentUrl = true;
var items = ["doctor+who", "sherlock", "orange+is+the+new+black", "archer", "orphan+black", "how+to+get+away+with+murder", "the+walking+dead", "outlander"];
function displayItemInfo() {
	$("#items-view").empty();
	var item = $(this).attr("dataName");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done (function(response) {
		console.log(response);
		var itemDiv = $("<div class = 'item'>");
		for (var i=0; i<10; i++) {
			var itemUrl = response.data[i].images.original_still.url;
			var itemEl = "<div class = 'img' id = num" + i + "><img src ='" + itemUrl + "'><p>Rating: " + response.data[i].rating;
			itemDiv.append(itemEl);
			$("#items-view").prepend(itemDiv);
		$(document).on("click", ".img", toggleGif);
		function toggleGif() {
			var temp = $(this).attr("id");
			temp.split(/[0-9]+/);			
			var ix = temp[3];			
			var newId = "#num" + ix;
			if(currentUrl) {
				currentUrl = false;
				var newUrl = response.data[ix].images.fixed_height.url;
				var newEl = "<img src ='" + newUrl + "'><p>Rating: " + response.data[ix].rating;
				$(newId).html(newEl);
				}
			else {		
				currentUrl=true;
				var newUrl = response.data[ix].images.original_still.url;
				var newEl = "<img src ='" + newUrl + "'><p>Rating: " + response.data[ix].rating;
				$(newId).html(newEl);
			}		
		}
	});
}
function renderButtons() {
	$("#buttons-view").empty();
	for (var i=0; i<items.length; i++) {
		show = items[i].split("+").join(" ");
		var a = $("<button>");
		a.addClass("butt");
		a.attr("dataName", items[i]);
		a.text(show);
		$("#buttons-view").append(a);
	}
}
$("#addItem").on("click", function(event) {
	event.preventDefault();
	var item = $("#itemInput").val().trim();
	item = item.split(" ").join("+").toLowerCase();
	items.push(item);
	renderButtons();
	form.getElementsById("itemInput").innerHTML("");
});
	$(document).on("click", ".butt", displayItemInfo);
	renderButtons();

