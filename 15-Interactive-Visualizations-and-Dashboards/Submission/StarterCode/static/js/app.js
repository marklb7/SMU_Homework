//global
var global_data = [];

$(document).ready(function() {
    pageInit();

    // event listener
    $('#selDataset').change(function() {
        doWork();
    });

});

function pageInit() {
    d3.json("samples.json").then((data) => {
        // save data to global
        global_data = data;

        makeFilter(data);
        doWork();
    });
}

function doWork(data) {
    var sample = $('#selDataset').val();
    var meta_data = global_data.metadata.filter(x => x.id == sample)[0];
    var sample_data = global_data.samples.filter(x => x.id == sample)[0];
    getInfo(meta_data);
    makePlots(sample_data, meta_data);
}

function makePlots(sample_data, meta_data) {
    makeBar(sample_data);
    makeBubble(sample_data);
    makeGauge(meta_data);
}

function makeFilter(data) {
    data.names.forEach(function(val) {
        var newOption = `<option>${val}</option>`;
        $('#selDataset').append(newOption);
    });
}

function getInfo(meta_data) {
    //clear data
    $("#sample-metadata").empty();

    Object.entries(meta_data).forEach(function(key_value, index) {
        var entry = `<span><b>${key_value[0]}:</b> ${key_value[1]}</span><br>`;
        $('#sample-metadata').append(entry);
    });
}

function makeBar(sample_data) {
    var y_lables = sample_data.otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`);
    var trace = {
        x: sample_data.sample_values.slice(0, 10).reverse(),
        y: y_lables,
        text: sample_data.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: "h"
    };

    var layout = {
        title: "Top 10 OTUs Found in Subject",
        xaxis: { title: "# of Bacteria" },
        yaxis: { title: "OTU ID" }
    }

    var traces = [trace];

    Plotly.newPlot('bar', traces, layout);
}

function makeBubble(sample_data) {
    var trace = {
        x: sample_data.otu_ids,
        y: sample_data.sample_values,
        mode: 'markers',
        marker: {
            size: sample_data.sample_values,
            color: sample_data.otu_ids
        },
        text: sample_data.otu_labels
    };

    var layout = {
        title: "OTUs Found in Subject",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "# of Bacteria" }
    }

    var traces = [trace];

    Plotly.newPlot('bubble', traces, layout);
}

function makeGauge(meta_data) {
    var trace = {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta_data.wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 10] },
            bar: { color: "darkblue" },
            steps: [
                { range: [0, 2.5], color: "red" },
                { range: [2.5, 7.5], color: "yellow" },
                { range: [7.5, 10], color: "green" }
            ],
            threshold: {
                line: { color: "black", width: 4 },
                thickness: 0.75,
                value: meta_data.wfreq
            }
        }
    };

    var traces = [trace];

    Plotly.newPlot('gauge', traces);
}