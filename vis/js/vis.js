var bills = {
	"hf1021": {
			"title": "HF 1021",
			"companion": "sf700",
			"startDate": "3/20/12",
			"endDate": "4/12/12",
			"veto": false,
			"voteFor": 101,
			"voteAgainst": 34,
			"legislators": [ "bills", "zeller" ],
			"shortDescription": "A bill to decrease state funding to private schools",
			"longDescription": "A bill to decrease state funding to private schools. A bill to decrease state funding to private schools. A bill to decrease state funding to private schools."
	},
	"hf1011": {
		"title": "HF 1011",
		"companion": "sf760",
		"startDate": "8/20/11",
		"endDate": "3/12/12",
		"veto": false,
		"voteFor": 80,
		"voteAgainst": 42,
		"legislators": [ "smith", "zeller" ],
		"shortDescription": "A bill to find volunteer basket holders.",
		"longDescription": "A bill to find volunteer basket holders. A bill to find volunteer basket holders. A bill to find volunteer basket holders. A bill to find volunteer basket holders."
	}
};

var categories = {"education": [ "hf1021", "hf1011", "hf1021", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021" ], "health": [ "hf2011", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021", ], "taxes": ["hf1021","hf1011","hf1021","hf1021"] };

var colorMap = {
	"education": "#A6CEE3",
	"health": "#1F78B4",
	"taxes": "#B2DF8A"
};

var nodes = [];
var width = 975;
var height = 400;

$(document).ready(function() {
	parseCategories();
	visCategories();
});

function parseCategories() {
	// A function to count the number of bills in each category.

	for (var category in categories) {
		var count = categories[category].length;
		node = {
			"id": category,
			"count": count,
			"name": category,
			"x": (Math.random() * width),
			"y": (Math.random() * height),
			"radius": 20 * Math.sqrt(count)
		};
		nodes.push(node);
	}
}

function visCategories() {
	// A function to create a bubble chart out of the categories of bills.

	var vis = d3.select("#bubble-chooser-chart").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "bubble");
	
	var circles = vis.selectAll("circle")
		.data(nodes, function(d) { return d.id; })
		.enter().append("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("cs", function(d) { return d.name; })
		.attr("fill", function(d) { return colorMap[d.id]; })
		.attr("stroke", "#666")
		.attr("stroke-width", 2)
		.attr("opacity", 0.8)
		.attr("r", function(d) { return d.radius / 2; })
		.attr("r", 200)
		.attr("charge", function(d) { return charge(d); })
		.on("mouseover", function(d, i) { d3.select(this)
		// FIXME hover over text doesn't work .. may not be a solution for this
				.style("stroke-width", 3)
				.style("opacity", 1.0);
			})
		.on("mouseout", function(d, i) { d3.select(this)
				.style("stroke-width", 2)
				.style("opacity", 0.8);
			})
		.on("mousedown", function(d, i) { listBills(d); });
	
	circles.transition().duration(1000).attr("r", function(d) { return d.radius; });

	var force = d3.layout.force()
		.nodes(nodes)
		.size([width, height])
		.charge(this.charge)
		.on("tick", function(e) {
			circles
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			labels	
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d) { return d.y; });
		})
		.start();
	
	var labels = vis.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.text(function(d) { return d.name; })
		.attr("text-anchor", "middle")
		.attr("x", function(d) { return d.x; })
		.attr("y", function(d) { return d.y; });
}

function listBills(d) {
	$("#category-title").html("<h1>" + d.name + "</h1>");
	$("#bill-list").html("");
	for (var i in categories[d.id]) {
		var bill = bills[categories[d.id][i]];
		$("#bill-list").append("<div id='bill-list-title'><a id='" + categories[d.id][i] + "' href='#' onclick=showBillDetail('" + categories[d.id][i] + "')>" + bill.title + "</a></div>");
	}
}

function showBillDetail(id) {
		var bill = bills[id];
		console.log(bill);
		console.log(bill.title);
		console.log(bill.voteFor);
		$("#bill-title").html(bill.title);
		//$("bill-timeline").html();
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

var legStartDate = Date.parse(1/24/12);
var legEndDate = Date.parse(4/21/12);

var timelineWidth = 400;
var timelineHeight = 100;

function createTimeline(bill) {
	$("#bill-timeline").html("");
	var nodes = [];
	var node = {
		"id": "legStartDate",
		"x": 0,
		"y": timelineHeight / 2
	};
	nodes.push(node);
	node = {
		"id": "legEndDate",
		"x": timelineWidth - 5, //TODO take this constant out
		"y": timelineHeight / 2
	};
	nodes.push(node);

	var startDate = Date.parse(bill.startDate);
	var endDate = Date.parse(bill.endDate);

	var startFromLegStart = daysFromLegStart(startDate);
	var endFromLegStart = daysFromLegStart(endDate);

	var chart = d3.select("#bill-timeline").append("svg")
		.attr("class", "chart")
		.attr("width", 400)
		.attr("height", 100);
	
	var rects = chart.selectAll("rect")
		.data(nodes, function(d) { return d.id; })
		.enter().append("rect")
		.attr("height", 20)
		.attr("width", 5)
		.attr("y", function(d) { return d.y; })
		.attr("x", function(d) { return d.x; });
}

function daysFromLegStart(theDate) {
	return theDate - legStartDate;
}

// This denotes how much negative magnetism each node will have
function charge(d) {
	return - Math.pow(d.radius, 2.0) / 6;
}

