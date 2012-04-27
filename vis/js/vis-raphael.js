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

$(document).ready(function() {
	visCategories();
});

function visCategories() {
	var bubbleChart = Raphael(document.getElementById("bubble-chart"), 975, 400);

	for (var category in categories) {
		var size = Math.sqrt(categories[category].length) * 10;
		var circle = bubbleChart.circle(Math.random() * (975 - size), Math.random() * (400 - size), size);
		circle.attr("fill", "#f00");
	}
}


