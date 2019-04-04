function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
       
  buildCharts();
  });
}

function secdrop(sample) {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset2");
  // selector.option.map(i=> console.log(i));
  // Use the list of sample names to populate the select options
  $("#selDataset2")
  .find('option')
  .remove()
  .end();
  d3.json(`/names/${sample}`).then((sampleNames) => {
    var values = [];
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      values.push(sample)
    });

  $( "#set2input" ).autocomplete({
      source: values
    });

  });
}

function buildMetadata(sample) {
  d3.json(`/print/${sample}`).then((data) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    console.log(data);
    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });
    buildGauge(data.calories);
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample);
  secdrop(newSample);
  buildCharts2(newSample)
}

function pChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample);
  buildMetadata(newSample);
  buildCharts3(newSample)
}
// Initialize the dashboard
init();