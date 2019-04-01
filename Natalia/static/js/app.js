function initDashboard() {
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

// define a configuration object

var settings = {
  max_width: 500,
  x: {
      label: 'Protein (g)',
      type: 'linear',
      column: 'protein (g)'
  },
  y: {
      label: 'Carbs (g)',
      type: 'linear',
      column: 'sodium (g)'
  },
  marks: [
      {
          type: 'circle',
          per: ['name'],
          tooltip: '[name]'
      }
  ],
  aspect: 1.0,
  gridlines:' xy'
};

var controls = webCharts.createControls('#controls', 
	{	
		location: 'top', 
		inputs:[
			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      {type: "subsetter", value_col: "group", label: "Choose group"},
      // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

// create the chart using the configuration above
// the chart will be rendered in the <body> element
var myChart = webCharts.createChart('#chart', settings, controls);

// pass some data to the chart's init() method
// d3.csv is used to load data from a csv
d3.csv('/static/data/data.csv', function(error,csv) {

  myChart.init(csv);
});


// Initialize the dashboard
initDashboard();

