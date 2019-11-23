var optionFields;

function insertOptions(data) {
    optionFields = data;

    let xselect = d3.select('#xselect').html('');
    let yselect = d3.select('#yselect').html('');
    data.forEach(row => {
        if (row == '# of Cores') {
            xselect
                .append('option')
                .attr('selected','selected')
                .text(row);
        } else {
            xselect
                .append('option')
                .text(row);
            }
        if (row == '# of Threads') {
            yselect
                .append('option')
                .attr('selected','selected')
                .text(row);
        } else {
            yselect
                .append('option')
                .text(row);
        }
    });
}

function updateOptions() {
    d3.json('/fields').then(insertOptions);
}

var xdata = [];
var ydata = [];
function scatterStuff() {
    let width = parseInt(d3.select("#scatter").style("width"));
    let height = width - width / 3.9;
    let margin = 20;
    let labelArea = 90;

    let svg = d3.select("#scatter").html('')
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "chart");

    let xselect = d3.select('#xselect option:checked').text()
    let yselect = d3.select('#yselect option:checked').text()
    xdata = [];
    ydata = [];

    //could be done way better...
    tableData.forEach(row => {
        xdata.push(row[xselect]);
        ydata.push(row[yselect]);
    });

    let xMin = d3.min(xdata);
    let xMax = d3.max(xdata);
    let yMin = d3.min(ydata);
    let yMax = d3.max(ydata);

    let xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin]);
    let yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin]);
    
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    xAxis.ticks(xMax/5);
    yAxis.ticks(yMax/10);
    
    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
    
    let theCircles = svg.selectAll('g theCircles').data(tableData).enter();

    theCircles.append('circle')
        .attr('cx', d => xScale(parseFloat(d[xselect])))
        .attr('cy', d => yScale(parseFloat(d[yselect])))
        .attr('r', 5);
}
