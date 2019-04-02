// define a configuration object

var settings = {
  max_width: 500,
  max_height: 700,
  x: {
      label: 'Protein (g)',
      type: 'linear',
      column: 'protein (g)',
      behavior: "flex"
  },
  y: {
      label: 'Carbs (g)',
      type: 'linear',
      column: 'sodium (g)',
      behavior: "flex"
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

var controls = webCharts.createControls('.firstChartHeader', 
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
var myChart = webCharts.createChart('.firstChart', settings, controls);

// pass some data to the chart's init() method
// d3.csv is used to load data from a csv
d3.csv('/static/data/data.csv', function(error,csv) {

  myChart.init(csv);
});


////////////////second chart///////////
// var settingsTM = {
// 	// "resizable":false,
// 	// "width":single_width, 
// 	// "height":single_height,
// 	// "margin":margins, 
// 	"y":{
// 		"type": "linear", 
// 		"behavior": "firstfilter"
// 	}, 
// 	"x":{
// 		"column":"group",
// 		"type": "ordinal",
// 		"label":""
// 	},
// 	"marks":[
// 		{
// 		"arrange":"stacked",
//       		"split":"CAT",
//       		"type":"bar",
//       		"per":["AVISITAS"],
//       		"summarizeY":"percent",
//       		"tooltip":"$y"
// 		}
// 	],
// 	"color_by":"CAT",
// 	"colors":["#e34a33",'#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'], 
// 	"legend":{
// 		"label":"",
// 		"order": ["Missed", "Out of Window", "In Window", "Overdue", "Expected"]
// 	}
// }

// var controlsTM = webCharts.createControls(dataElementTM+" .gg-dash-item-title", 
// 	{
// 		location: "top", 
// 		inputs: [
// 			{type: "subsetter", value_col: "SITENAME", label: "Site"}, 
// 			{label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "count"], relabels: ["%", "N"]}
// 		]
// 	}
// );

// var instanceTM = webCharts.createChart(dataElementTM+" .gg-dash-item-content", settingsTM, controlsTM)

// d3.csv(dataPathTM, function(e,d){
// 	instanceTM.init(d);	
// })

// // Initialize the dashboard
// initDashboard();

