console.log('chart');
var data = 
{
	min:4,
	max:96,
	avg:65,
	score:86
};
console.log(data);
var chart = d3.select(".chart");
chart.append("div").text("Min:"+data.min).style("float", "left").style("padding-right", "10px");
var bar = chart.append("div").style("height", "25px").style("float", "left");
bar.append("div").style("width",  (data.max-data.min)* 5 + "px").style("background-color","gainsboro").style("height", "25px");
bar.append("div").style("width",  (data.avg)* 5 + "px").style("background-color","grey").style("height", "10px").style("position","absolute").style("top","8px");
bar.append("div").style("width", "3px").style("background-color","black").style("height", "25px").style("position","absolute").style("top","0px").style("left",(data.score)* 5 + "px");
chart.append("div").text("Max:"+data.max).style("float", "left").style("padding-left", "10px");;
