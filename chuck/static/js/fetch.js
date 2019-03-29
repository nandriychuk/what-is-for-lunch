function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var defaultURL = `/metadata/${sample}`;
  var apiKey = "DEMO_KEY";
  var ndbno = "01009";
  var type = "b";
  var format = "json";

  var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=" + type + "&format=" + format + "&api_key=" + apiKey;

  $.get(url, function( data ) {
    alert( "Data Loaded: " + JSON.stringify(data) );
});
  
  
  
  
  d3.json(defaultURL).then(data => {

    // Use d3 to select the panel with id of `#sample-metadata`
    var selection = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    selection.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(([key,value]) => {

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.  
      selection.append('p')
      .text(`${key}: ${value}`);
    });
  
  })
   // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}