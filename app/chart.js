var updateChart = function(data){
console.log(data);
var chart = d3.select(".chart");


chart.select("div.background").style("width",  99* 5 + "px");
chart.select("div.score-range").style("width",  (data.max-data.min)* 5 + "px").style("height", "25px").style("left",(data.min)* 5 + "px");

//min measurement
chart.select("div.min-text").text("Min").style("left",(data.min)* 5-10 + "px");
chart.select("div.min-num").text(data.min).style("left",(data.min)* 5-5 + "px");

//average bar
chart.select("div.avg-bar").style("width", "3px").style("left",(data.avg)* 5 + "px");
chart.select("div.avg-text").text("Avg").style("left",(data.avg)* 5-10 + "px");
chart.select("div.avg-num").text(data.avg).style("left",(data.avg)* 5-7 + "px");

chart.select("div.score-bar").style("width", "3px").style("left",(data.score)* 5 + "px");
chart.select("div.score-text").text("Score").style("left",(data.score)* 5-17 + "px");
chart.select("div.score-num").text(data.score).style("left",(data.score)* 5-7 + "px");

chart.select("div.max-text").text("Max").style("left",(data.max)* 5-15 + "px");
chart.select("div.max-num").text(data.max).style("left",(data.max)* 5-7 + "px");
};
