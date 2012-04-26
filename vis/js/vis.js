var bills = {"hf1021": {"title": "HF 1021", "companion": "sf700", "startDate": "3/20/12", "endDate": "4/12/12", "veto": false, "voteFor": 101, "voteAgainst": 34, "legislators": [ "bills", "zeller" ], "shortDescription": "A bill to decrease state funding to private schools", "longDescription": "A bill to decrease state funding to private schools. A bill to decrease state funding to private schools. A bill to decrease state funding to private schools."}};

var categories = {"education": [ "hf1021", "hf1022", "hf1021", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021" ], "health": [ "hf2111", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021", ], "taxes": ["hf1021","hf1021","hf1021","hf1021"] };

var nodes = [];
var width = 600;
var height = 400;

$(document).ready(function() {
	parseCategories();
	visCategories();
	//compareMF();
});

function parseCategories() {
	// A function to count the number of bills in each category.

	for (var category in categories) {
		var count = categories[category].length;
		node = {
			"id": category,
			"count": count,
			"name": category,
			"x": (Math.random() * width), // TODO Do some math so bubbles are always fully in vis
			"y": (Math.random() * height), // TODO same as above
			"radius": 20 * Math.sqrt(count) // TODO get this constant out of here
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
		.data(nodes, function(d) { console.log(d);return d.id; })
		.enter().append("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("cs", function(d) { return d.name; })
		.attr("fill", "#beccae")
		.attr("stroke", "#333") // TODO colors based on something else (category? size?)
		.attr("stroke-width", 2)
		.attr("opacity", 0.8)
		.attr("r", function(d) { return d.radius / 2; })
		.attr("charge", function(d) { return charge(d); })
		.attr("text", function(d) { return d.name; }) // TODO show text labels
		.text(function(d) { return d.name; })
		.on("mouseover", function(d, i) { d3.select(this)
				.style("stroke-width", 3)
				.style("opacity", 1.0);
				//showDetails(d, i);
			})
		.on("mouseout", function(d, i) { d3.select(this)
				.style("stroke-width", 2)
				.style("opacity", 0.8);
				//showDetails(d, i);
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
		})
		.start();
}

function listBills(d) {
	$("#bill-list").html("<h1>" + d.name + "</h1>");
	
	for (var i in categories[d.id]) {
		var bill = bills[categories[d.id][i]];
		console.log(bill);
		$("#bill-list").append("<div id='bill-title'><h2>" + bill.title + "</h2></div>")
			.append("<div id='bill-vote'>" + bill.voteFor + " - " + bill.voteAgainst + "</div>")
			.append("<div id='bill-timeline'>" + bill.startDate + "|----------------|" + bill.endDate + "</div>")
			.append("<div id='bill-short-description'>" + bill.shortDescription + "</div>");
	}
}

function charge(d) {
	return - Math.pow(d.radius, 2.0) / (d.radius / 10);
}

function showDetails(d, i) { // TODO make these show/hide tooltips?
	console.log("show");
}

function hideDetails(d, i) {
	console.log("hide");
}

