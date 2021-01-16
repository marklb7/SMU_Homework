// from data.js
var tableData = data;

// YOUR CODE HERE!
$(document).ready(function() {
    buildTable();

    //Event Listeners
    $("#filter-btn").on("click", function(e) {
        e.preventDefault();
        buildTable();
    });
    $("#form").on("submit", function(e) {
        e.preventDefault();
        buildTable();
    });
});

function buildTable() {
    var date_filter = $("#datetime").val();
    var city_filter = $("#city").val().toLowerCase();

    if ((date_filter === "") && (city_filter === "")) {
        buildTableString(tableData);
    } else {
        var filteredData = tableData;
        if (date_filter !== "") {
            filteredData.filter(row => row.datetime === date_filter);
        }
        if (city_filter !== "") {
            filteredData = filteredData.filter(row => row.city === city_filter);
        }
        if (filteredData.length === 0) {
            alert("No sightings fit this criteria.");
        }

        buildTableString(filteredData);
    }
}

function buildTableString(data) {
    // JQUERY creates an HTML string
    var tbody = $("#ufo-table>tbody");
    //clear table
    tbody.empty();

    //append data
    data.forEach(function(row) {
        var newRow = "<tr>"
            // loop through each Object (dictionary)
        Object.entries(row).forEach(function([key, value]) {
            // set the cell data
            newRow += `<td>${value}</td>`
        });

        //append to table
        newRow += "</tr>";
        tbody.append(newRow);
    });
}