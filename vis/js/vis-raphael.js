var bills;

// Should this be a separately created object, or should we parse the categories in
// the bills object to create this?
var categories = {"education": [ "HF 2861", "HF", "hf1021", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021" ], "health": [ "hf2011", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021", ], "taxes": ["hf1021","hf1011","hf1021","hf1021"] };

var colorMap = {
	"education": "#A6CEE3",
	"health": "#1F78B4",
	"taxes": "#B2DF8A"
};

$(document).ready(function() {
  $.getJSON('data/bills.json', function(data) {
    
    bills = data;
    visCategories();
  });
});

function visCategories() {
	var bubbleChart = Raphael(document.getElementById("bubble-chart"), 975, 200);

	for (var category in categories) {
		var size = Math.sqrt(categories[category].length) * 10;
		var circle = bubbleChart.circle(Math.random() * (975 - size), Math.random() * (200 - size), size)
			.data("name", category)
			.attr("fill", "#f00")
			.click(function() {
				listBills(this.data("name"));
			})
		var text = bubbleChart.text(circle.attrs.cx, circle.attrs.cy, category);
	}
}

function listBills(d) {
	$("#category-title").html("<h1>" + d + "</h1>");
	$("#bill-list").html("");
	for (var i in categories[d]) {
		var bill = bills[categories[d][i]];
		$("#bill-list").append("<div id='bill-list-title'><a id='" + bill.id + "' href='#' onclick=showBillDetail('" + bill.id + "')>" + bill.title + "</a></div>");
		//$("#bill-list").append("<div id='bill-list-title'><div id='" + bill.id + "'>" + bill.title + "</div></div>");
		//console.log("#" + bill.id);
		//$("#" + bill.id).click(function(e) { console.log(e.currentTarget.id); });
	}
}

function showBillDetail(id) {
	var bill = bills[id];
	$("#bill-title").html(bill.title);
	$("#bill-description").html(bill.longDescription);
	authorsHtml = "<ul>";
	for (var i in bill.legislators) {
		authorsHtml += "<li>" + bill.legislators[i] + "</li>";
	}
	authorsHtml += "</ul>";
	$("#bill-authors-list").html(authorsHtml);
	$("#bill-vote-numbers").html(bill.voteFor + " - " + bill.voteAgainst);

	$('.bill-link-selected').removeClass("bill-link-selected");
	$('#' + id).addClass("bill-link-selected");
	createTimeline(bill);
	return false;
}

function createTimeline(bill) {
	//TODO
	return false;
}
