// @TODO: YOUR CODE HERE!
$(document).ready(function() {
    makePlot();

    //event listener
    $(window).resize(function() {
        makePlot();
    });

});

function makePlot() {

    // Import Data
    d3.csv("assets/data/data.csv").then(function(censusData) {

        // STEP 1: SET UP THE CANVAS
        $("#scatter").empty();

        var svgWidth = window.innerWidth;
        var svgHeight = 500;

        var margin = {
            top: 20,
            right: 40,
            bottom: 60,
            left: 50
        };

        var chart_width = svgWidth - margin.left - margin.right;
        var chart_height = svgHeight - margin.top - margin.bottom;

        // STEP 2: CREATE THE SVG
        var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .classed("chart", true);

        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // STEP 3: PREPARE THE DATA
        censusData.forEach(function(row) {
            row.poverty = +row.poverty;
            row.healthcare = +row.healthcare;
        });

        // STEP 4: Create the Scales
        var xScale = d3.scaleLinear()
            .domain(d3.extent(censusData, d => d.poverty))
            .range([0, chart_width]);

        var yScale = d3.scaleLinear()
            .domain(d3.extent(censusData, d => d.healthcare))
            .range([chart_height, 0]);

        // STEP 5: CREATE THE AXES
        var leftAxis = d3.axisLeft(yScale);
        var bottomAxis = d3.axisBottom(xScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chart_height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // STEP 6: Create the Text and Circles

        var circlesGroup = chartGroup.append("g")
            .selectAll("circle")
            .data(censusData)
            .enter()
            .append("circle")
            .attr("r", "15")
            .attr("stroke-width", "1")
            .classed("stateCircle", true);

        var textGroup = chartGroup.append("g")
            .selectAll("text")
            .data(censusData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("alignment-baseline", "central")
            .attr("font-size", 12)
            .classed("stateText", true);

        chartGroup.selectAll("circle")
            .transition()
            .duration(2500)
            .attr("cx", d => xScale(d.poverty))
            .attr("cy", d => yScale(d.healthcare))
            .attr("r", "15")
            .style("opacity", 1)
            .delay(function(d, i) { return i * 100 });

        chartGroup.selectAll(".stateText")
            .transition()
            .duration(2500)
            .attr("x", d => xScale(d.poverty))
            .attr("y", d => yScale(d.healthcare))
            .delay(function(d, i) { return i * 100 });


        // STEP 7: CREATE AXES LABELS
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (chart_height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)");

        chartGroup.append("text")
            .attr("transform", `translate(${chart_width / 2}, ${chart_height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("In Poverty (%)");

        // STEP 8: TOOLTIP
        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([180, -60])
            .html(function(d) {
                return (`<strong>${d.state}</strong><br><strong>Poverty: ${d.poverty}%<br>Lacks Healthcare: ${d.healthcare}%</br></strong>`);
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
                    .attr("r", 50);
            })
            // Step 4: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function(event, d) {
                toolTip.hide(d);

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", 15);
            });


    }).catch(function(error) {
        console.log(error);

    });

}