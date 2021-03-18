// global
var chosen_xaxis = "poverty";
var chosen_yaxis = "healthcare";


// @TODO: YOUR CODE HERE!
$(document).ready(function() {
    makePlot();

    //event listener
    $(window).resize(function() {
        makePlot();
    });
});

function makePlot() {
    d3.csv("assets/data/data.csv").then(function(census_data) {
        console.log(census_data);

        // STEP 1: SET UP THE CANVAS
        $("#scatter").empty();

        // var svgWidth = 960;
        var svgWidth = window.innerWidth - 40;
        var svgHeight = 800;

        var margin = {
            top: 20,
            right: 40,
            bottom: 100,
            left: 80
        };

        var chart_width = svgWidth - margin.left - margin.right;
        var chart_height = svgHeight - margin.top - margin.bottom;

        // STEP 2: CREATE THE SVG (if it doesn't exist already)
        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .classed("chart", true);

        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // STEP 3: PREPARE THE DATA
        census_data.forEach(function(row) {
            row.poverty = +row.poverty;
            row.healthcare = +row.healthcare;
            row.age = +row.age;
            row.income = +row.income;
            row.obesity = +row.obesity;
            row.smokes = +row.smokes;
        });

        // STEP 4: Create the Scales
        var xScale = createXScale(census_data, chart_width);
        var yScale = createYScale(census_data, chart_height);

        // STEP 5: CREATE THE AXES
        var leftAxis = d3.axisLeft(yScale);
        var bottomAxis = d3.axisBottom(xScale);

        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${chart_height})`)
            .call(bottomAxis);

        var yAxis = chartGroup.append("g")
            .call(leftAxis);

        // STEP 5.5: Create the Text
        var textGroup = chartGroup.append("g")
            .selectAll("text")
            .data(census_data)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("alignment-baseline", "central")
            .attr("font-size", 12)
            .classed("stateText", true);

        // STEP 6: CREATE THE GRAPH
        // append circles
        var circlesGroup = chartGroup.append("g")
            .selectAll("circle")
            .data(census_data)
            .enter()
            .append("circle")
            .style("opacity", 0.25)
            .attr("stroke-width", "1")
            .classed("stateCircle", true);

        // STEP 6.5: Be extra. Have the circles fly
        chartGroup.selectAll("circle")
            .transition()
            .duration(5000)
            .attr("cx", d => xScale(d[chosen_xaxis]))
            .attr("cy", d => yScale(d[chosen_yaxis]))
            .attr("r", "15")
            .style("opacity", 0.25)
            .delay(function(d, i) { return i * 100 });

        chartGroup.selectAll(".stateText")
            .transition()
            .duration(5000)
            .attr("x", d => xScale(d[chosen_xaxis]))
            .attr("y", d => yScale(d[chosen_yaxis]))
            .delay(function(d, i) { return i * 100 });


        // STEP 7: Add Axes Labels
        // Create axes labels

        // CREATE FIRST YAXIS TEXT
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 0)
            .attr("x", 0 - (chart_height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText active")
            .attr("id", "healthcare") // new, create id to identify text
            .text("Lacks Healthcare (%)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_yaxis = "healthcare";

                // update the y scale
                yScale = createYScale(census_data, chart_height);

                //update the y axis
                leftAxis = d3.axisLeft(yScale);
                yAxis = createYAxis(yAxis, leftAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#smokes").classed("active", false);
                d3.select("#smokes").classed("inactive", true);
                d3.select("#obesity").classed("active", false);
                d3.select("#obesity").classed("inactive", true);
            });

        // CREATE SECOND YAXIS TEXT
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (chart_height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText inactive")
            .attr("id", "smokes") // new, create id to identify text
            .text("Smoke (%)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_yaxis = "smokes";

                // update the y scale
                yScale = createYScale(census_data, chart_height);

                //update the y axis
                leftAxis = d3.axisLeft(yScale);
                yAxis = createYAxis(yAxis, leftAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#healthcare").classed("active", false);
                d3.select("#healthcare").classed("inactive", true);
                d3.select("#obesity").classed("active", false);
                d3.select("#obesity").classed("inactive", true);
            });

        // CREATE THIRD YAXIS TEXT
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (chart_height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText inactive")
            .attr("id", "obesity") // new, create id to identify text
            .text("Obesity (%)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_yaxis = "obesity";

                // update the y scale
                yScale = createYScale(census_data, chart_height);

                //update the y axis
                leftAxis = d3.axisLeft(yScale);
                yAxis = createYAxis(yAxis, leftAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#smokes").classed("active", false);
                d3.select("#smokes").classed("inactive", true);
                d3.select("#healthcare").classed("active", false);
                d3.select("#healthcare").classed("inactive", true);
            });

        // CREATE FIRST XAXIS TEXT
        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 30})`)
            .attr("class", "axisText active")
            .attr("id", "poverty") // new, create id to identify text
            .text("Poverty %")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_xaxis = "poverty";

                // update the x scale
                xScale = createXScale(census_data, chart_width);

                //update the x axis
                bottomAxis = d3.axisBottom(xScale);
                xAxis = createXAxis(xAxis, bottomAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#age").classed("active", false);
                d3.select("#age").classed("inactive", true);
                d3.select("#income").classed("active", false);
                d3.select("#income").classed("inactive", true);
            });


        // CREATE SECOND XAXIS TEXT
        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 50})`)
            .attr("class", "axisText inactive")
            .attr("id", "age")
            .text("Age (Median)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_xaxis = "age";

                // update the x scale
                xScale = createXScale(census_data, chart_width);

                //update the x axis
                bottomAxis = d3.axisBottom(xScale);
                xAxis = createXAxis(xAxis, bottomAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#poverty").classed("active", false);
                d3.select("#poverty").classed("inactive", true);
                d3.select("#income").classed("active", false);
                d3.select("#income").classed("inactive", true);
            });

        // CREATE THIRD XAXIS TEXT
        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 70})`)
            .attr("class", "axisText inactive")
            .attr("id", "income")
            .text("Household Income (Median)")
            .style("cursor", "pointer")
            .on("click", function() {
                chosen_xaxis = "income";

                // update the x scale
                xScale = createXScale(census_data, chart_width);

                //update the x axis
                bottomAxis = d3.axisBottom(xScale);
                xAxis = createXAxis(xAxis, bottomAxis);

                // update the GROUPS that we have on the graph
                circlesGroup = updateCircles(circlesGroup, xScale, yScale);
                textGroup = updateText(textGroup, xScale, yScale);

                circlesGroup = createTooltip(circlesGroup);

                d3.select(this).classed("inactive", false);
                d3.select(this).classed("active", true);

                d3.select("#poverty").classed("active", false);
                d3.select("#poverty").classed("inactive", true);
                d3.select("#age").classed("active", false);
                d3.select("#age").classed("inactive", true);
            });


        // STEP 8: TOOLTIP
        circlesGroup = createTooltip(circlesGroup);


    }).catch(function(error) {
        console.log(error);
    });
}

/////////////////////////HELPER FUNCTIONS////////////////////////////

// create x axis scale based on chosen column
function createXScale(census_data, chart_width) {
    var xScale = d3.scaleLinear()
        .domain(d3.extent(census_data, d => d[chosen_xaxis]))
        .range([0, chart_width]);

    return xScale;
}

// create y axis scale based on chosen column
function createYScale(census_data, chart_height) {
    var yScale = d3.scaleLinear()
        .domain(d3.extent(census_data, d => d[chosen_yaxis]))
        .range([chart_height, 0]);

    return yScale;
}

// transition the xaxis to the NEW chosen one
function createXAxis(xAxis, bottomAxis) {
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// transition the yaxis to the NEW chosen one
function createYAxis(yAxis, leftAxis) {
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

function updateCircles(circlesGroup, xScale, yScale) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => xScale(d[chosen_xaxis]))
        .attr("cy", d => yScale(d[chosen_yaxis]));

    return circlesGroup;
}

function updateText(textGroup, xScale, yScale) {
    textGroup.transition()
        .duration(1000)
        .attr("x", d => xScale(d[chosen_xaxis]))
        .attr("y", d => yScale(d[chosen_yaxis]));

    return textGroup;
}

function createTooltip(circlesGroup) {
    //step 0, get label
    var xlabel = "";
    if (chosen_xaxis == "poverty") {
        xlabel = "Poverty";
    } else if (chosen_xaxis == "income") {
        xlabel = "Household Income";
    } else {
        xlabel = "Age";
    }

    var ylabel = "";
    if (chosen_yaxis == "healthcare") {
        ylabel = "Lacks Healthcare";
    } else if (chosen_yaxis == "smokes") {
        ylabel = "Smokes";
    } else {
        ylabel = "Obesity";
    }

    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([180, -60])
        .html(function(d) {
            return (`<strong>${d.state}</strong><hr><strong>${xlabel}: ${d[chosen_xaxis]}</strong><hr><strong> ${ylabel}: ${d[chosen_yaxis]}%</strong>`);
        });

    // Step 2: Create the tooltip in chartGroup.
    circlesGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(event, d) {
            toolTip.show(d, this);

            //make bubbles big
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 100);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(event, d) {
            toolTip.hide(d);

            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", 15);
        });

    return circlesGroup; // this is important
}