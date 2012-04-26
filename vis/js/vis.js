var bills = {"hf1021": {"companion": "sf700", "start-date": "3/20/12", "end-date": "4/12/12", "veto": false, "vote-for": 101, "vote-against": 34, "legislators": [ "bills", "zeller" ], "short-description": "A bill to decrease state funding to private schools", "long-description": "A bill to decrease state funding to private schools. A bill to decrease state funding to private schools. A bill to decrease state funding to private schools."}};

var categories = {"education": [ "hf1021", "hf1022", "hf1021", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021" ], "health": [ "hf2111", "hf1021","hf1021","hf1021","hf1021","hf1021","hf1021","hf1021", ], "taxes": ["hf1021","hf1021","hf1021","hf1021"] };

var categoryCount = [];
var nodes = [];

$(document).ready(function() {
	parseCategories();
	visCategories();
	//compareMF();
});

function parseCategories() {
	// A function to count the number of bills in each category.

	for (var category in categories) {
		var count = categories[category].length;
		categoryCount.push(count);
		node = {
			"id": category,
			"count": count,
			"name": category,
			"x": (50 + Math.random() * 400), // Should be based on width
			"y": (50 + Math.random() * 300), // Should be based on height
			"radius": 20 * Math.sqrt(count)
		};
		nodes.push(node);
		/*
		for (var i in categories[category]) {
			console.log(categories[category][i]);
		}
		*/
	}
}

function visCategories() {
	// A function to create a bubble chart out of the categories of bills.

	var vis = d3.select("#bubble-chooser-chart").append("svg")
		.attr("width", 640)
		.attr("height", 400)
		.attr("class", "bubble");
	
	var circles = vis.selectAll("circle")
		.data(nodes, function(d) { console.log(d);return d.id; })
		.enter().append("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("cs", function(d) { return d.name; })
		.attr("fill", "#beccae")
		.attr("stroke", "#333")
		.attr("stroke-width", 2)
		.attr("opacity", 0.8)
		.attr("r", function(d) { return d.radius / 2; })
		.attr("text", function(d) { return d.name; }) // TODO show text labels
		.text(function(d) { return d.name; })
		.on("mouseover", function(d, i) { d3.select(this)
				.style("stroke-width", 3)
				.style("opacity", 1.0);
				showDetails(d, i);
			})
		.on("mouseout", function(d, i) { d3.select(this)
				.style("stroke-width", 2)
				.style("opacity", 0.8);
				showDetails(d, i);
			});
	
	circles.transition().duration(1000).attr("r", function(d) { return d.radius; });

	// TODO prevent overlaps
}

function showDetails(d, i) { // TODO make these show/hide tooltips?
	console.log("show");
	console.log(d);
}

function hideDetails(d, i) {
	console.log("hide");
	console.log(d);
}


function compareMF() {
	var chart = d3.select('#overview-chart').append('svg')
		.attr('class', 'chart')
		.attr('width', 420)
		.attr('height', 20 * data.length);
	var x = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, 420]);
	var y = d3.scale.ordinal()
		.domain(data)
		.rangeBands([0, 120]);
	chart.selectAll('rect')
		.data(data)
		.enter().append('rect')
		.attr('x', x)
		.attr('y', function(d) { return y(d) + y.rangeBand() / 2; })
}

