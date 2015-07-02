var updateChart = function(data){
console.log(data);
var chart = d3.select(".chart");


chart.select("div.background").style("width",  99* 5 + "px");
chart.select("div.score-range").style("width",  (data.max-data.min)* 5 + "px").style("height", "25px").style("left",(data.min)* 5 + "px");

if(data.avg<data.score){
var avgTop = '-20px';
var scoreTop = '25px';
}
else{
var avgTop = '25px';
var scoreTop = '-20px';
}

//min measurement
chart.select("div.min-text").text("Min("+data.min+")").style("left",(data.min)* 5-25 + "px");

//average bar
chart.select("div.avg-bar").style("width", "3px").style("left",(data.avg)* 5 + "px");
chart.select("div.avg-text").text("Avg("+data.avg+")").style("left",(data.avg)* 5-25 + "px").style("top",avgTop);

chart.select("div.score-bar").style("width", "3px").style("left",(data.score)* 5 + "px");
chart.select("div.score-text").text("Score("+data.score+")").style("left",(data.score)* 5-30 + "px").style("top",scoreTop);

chart.select("div.max-text").text("Max("+data.max+")").style("left",(data.max)* 5-25 + "px");
};
