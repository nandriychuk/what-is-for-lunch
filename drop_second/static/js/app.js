
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


  });
}

function subname(sample) {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset2");

  // Use the list of sample names to populate the select options
  d3.json(`/names/${sample}`).then((sampleNames) => {
    sampleNames.forEach((s) => {
      selector
        .append("option")
        .text(s)
        .property("value", s);
    });


  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  subname(newSample);
 
}


// // Initialize the dashboard
// init();
