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

    
    // buildMetadata(firstSample);
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
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });


  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample)
  secdrop(newSample);
  
}
// Initialize the dashboard
init();