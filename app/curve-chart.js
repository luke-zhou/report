

var updateCurveChart = function (score){

//setting up empty data array
var data = [];

getData(); // popuate data 

// line chart based on http://bl.ocks.org/mbostock/3883245
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 750 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) {
        return x(d.q);
    })
    .y(function(d) {
        return y(d.p);
    });

var svg = d3.select(".curve-chart svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .select("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(data, function(d) {
    return d.q;
}));
y.domain(d3.extent(data, function(d) {
    return d.p;
}));

svg.select("g .x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.select("g .y")
    .call(yAxis);

svg.select(".line")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

var legend = svg.select("g#legend")
    .attr("transform", "translate("+(width-100)+"," + (height-200)/2 + ")");

legend.append("rect").attr("y", 20).attr("height", 10).attr("fill", "#FF0000").attr("width", 20);
legend.append("rect").attr("y", 40).attr("height", 10).attr("fill", "#00FF00").attr("width", 20);
legend.append("rect").attr("y", 60).attr("height", 10).attr("fill", "#FFFF00").attr("width", 20);
legend.append("rect").attr("y", 80).attr("height", 10).attr("fill", "#FF9900").attr("width", 20);

legend.append("text").attr("y", 30).attr("x", 30).text("MIN");
legend.append("text").attr("y", 50).attr("x", 30).text("MAX");
legend.append("text").attr("y", 70).attr("x", 30).text("AVG");
legend.append("text").attr("y", 90).attr("x", 30).text("CURRENT");
	
var scores = [{color:"#FF0000",score:score.min},{color:"#00FF00",score:score.max},{color:"#FFFF00",score:score.avg},{color:"#FF9900",score:score.score}]

var scoreGroup = svg.select("g#score").selectAll("g").data(scores)
scoreGroup.enter().append("g").append("rect");

scoreGroup.attr("transform", function(d){return "translate("+x(d.score)+",0)";});

scoreGroup.select("rect").attr("y", function(d) { return y(gaussian(d.score)); })
  .attr("height", function(d) { return height - y(gaussian(d.score)); })
  .attr("fill", function(d) { return d.color; })
  .attr("width", 3);
	
function getData() {

// loop to populate data array with 
// probabily - quantile pairs
for (var i = 0; i < 100000; i++) {
    q = normal() // calc random draw from normal dist
    p = gaussian(q) // calc prob of rand draw
    el = {
        "q": q,
        "p": p
    }
    data.push(el)
};

// need to sort for plotting
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
data.sort(function(x, y) {
    return x.q - y.q;
});	
}

// from http://bl.ocks.org/mbostock/4349187
// Sample from a normal distribution with mean 0, stddev 1.
function normal() {
    var x = 0,
        y = 0,
        rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c*12.5+50; // throw away extra sample y * c
}

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
		mean = 50,
    	sigma = 12.5;

    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};
};