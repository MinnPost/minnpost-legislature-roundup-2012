// Constants
var height = 650;
var width = 975;
var bubbleConstant = 6;
var xBubbleSpacing = 50;
var yBubbleSpacing = 160;

// Created using extract_categories.py
var categories = {
	"Commerce": ["HF 2335"],
	"Transportation": ["HF 2246", "HF 1175"],
	"Legal Issues": ["HF 2335", "SF 1675", "SF 1678", "HF 2160"],
	"Municipal \nand County Issues": ["HF 2861", "HF 1175", "SF 248", "HF 2174"],
	"Senior Issues": ["HF 2614"],
	"Public Services": ["HF 2861", "HF 469", "SF 2464", "HF 1175", "HF 2149", "HF 2373", "SF 1675", "HF 738"],
	"Judiciary": ["HF 469", "HF 2614", "SF 1675", "SF 1678", "HF 738", "SF 2379"],
	"Crime": ["HF 2246", "SF 2464", "HF 2149", "HF 2373", "SF 1678", "HF 2160"],
	"Family and \nChildren Issues": ["SF 1675", "SF 1678"],
	"Labor and \nEmployment": ["HF 2614", "SF 1678"],
	"Other": ["SF 1678", "SF 2316"],
	"Federal, State,\n and Local Relations": ["HF 2861", "HF 1813", "HF 2174"],
	"Technology and \nCommunication": ["SF 2379"],
	"Budget, Spending,\n and Taxes": ["SF 248"],
	"Housing and Property": ["HF 2373"],
	"Military": ["SF 2316"],
	"Health": ["HF 2276", "SF 248", "HF 1236"],
	"State Agencies": ["HF 469", "HF 2614", "SF 2464", "HF 1175", "HF 1813", "HF 2149", "HF 2373", "SF 1675", "HF 738"],
	"Business and \nConsumers": ["SF 2379"],
	"Campaign Finance and \nElection Issues": ["SF 2379"]
};

$(document).ready(function() {
	visCategories();
	
	$('.all-categories').live('click', function(e) {
    e.preventDefault();
    $('#bubble-chooser').slideDown('fast');
    $('#category-details').slideUp('fast');
  });
});

var reordered = [];

function visCategories(data) {
	var bubbleChart = Raphael(document.getElementById("bubble-chart"), width, height);

	//var xPos = 0;
	var xPos = -50;
	var yPos = 125;

	for (var category in categories) {
		var radius = (categories[category].length) * bubbleConstant;
		
		// Update x and y positions
		xPos += 150;
		if (xPos + radius >= width) {
			xPos = 100;
			yPos += yBubbleSpacing;
		}
		/*
		xPos += (2 * radius) + xBubbleSpacing;
		if (xPos >= width) {
			xPos = (2 * radius);
			yPos += yBubbleSpacing;
		}
		*/

		var circle = bubbleChart.circle(Math.random() * (975 - radius), Math.random() * (height - radius), 0)
			.data("name", category)
			.data("spreadX", xPos)
			.data("spreadY", yPos)
			.data("radius", radius)
			.attr("fill", Raphael.rgb(255, Math.random() * 255, 0))
			.attr("opacity", "0.7")
			.attr("stroke-width", 0.5)
			.attr("cursor", "pointer")
			.mouseover(function() {
				this.attr("opacity", "1.0");
			})
			.mouseout(function() {
				this.attr("opacity", "0.7");
			})
			.click(function() {
				//TODO
				if (typeof billList != 'undefined') {
				  billList.filterCategory(this.data("name").replace('\n', ''));
				  $('#bubble-chooser').slideUp('fast');
				  $('#category-details').slideDown('fast');
				}
			});
		var text = bubbleChart.text(circle.attrs.cx, circle.attrs.cy, category)
			.attr("font-size", 12)
			.attr("fill", "#444")
			.data("spreadX", xPos)
			.data("spreadY", yPos + 20);
		var enlarge = Raphael.animation({"r": radius}, 1000, "easeIn");
		circle.animate(enlarge.delay(Math.random() * 1000));

	}
	spreadVis(bubbleChart);
}

function spreadVis(paper) {
	paper.forEach(function(el) {
		if (el.type === "circle") {
			var spread = Raphael.animation({"cx": el.data("spreadX"), "cy": el.data("spreadY") - el.data("radius")}, 1000, "backOut");
			el.animate(spread.delay(Math.random() * 1000));
		} else if (el.type === "text") {
			var textSpread = Raphael.animation({"x": el.data("spreadX"), "y": el.data("spreadY")}, 1000, "backOut");
			el.animate(textSpread.delay(Math.random() * 1000));
		}
	});
}
