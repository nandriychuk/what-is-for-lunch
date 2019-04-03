
var myTable = webCharts.createTable('#tableHere');

d3.csv('/static/data/API_table.csv', function(e,d){

  // var updatedTable = d3.nest()
  //   .key(function (d) { return d.category;})
  //   .key(function (d) { return d.name;})
  //   .rollup(function(d){
  //         return  d.length; })
  //     .entries(d)
  //     console.log(updatedTable)



  myTable.init(d);
});

// //define a configuration object

// var settingsFC = {
//   max_width: 500,
//   max_height: 700,
//   x: {
//       label: 'Protein (g)',
//       type: 'linear',
//       column: 'protein (g)',
//       behavior: "flex"
//   },
//   y: {
//       label: 'Carbs (g)',
//       type: 'linear',
//       column: 'sodium (g)',
//       behavior: "flex"
//   },
//   marks: [
//       {
//           type: 'circle',
//           per: ['name'],
//           tooltip: '[name]'
//       }
//   ],
//   aspect: 1.0,
//   gridlines:' xy'
// };

// var controlsFC = webCharts.createControls('.firstChartHeader', 
// 	{	
// 		location: 'top', 
// 		inputs:[
// 			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
//       {type: "subsetter", value_col: "group", label: "Choose group"},
//       // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
// 		]
// 	}
// );

// // create the chart using the configuration above
// // the chart will be rendered in the <body> element
// var firstChart = webCharts.createChart('.firstChart', settingsFC, controlsFC);

// // pass some data to the chart's init() method
// // d3.csv is used to load data from a csv
// d3.csv('/static/data/data.csv', function(error,csv) {

//   firstChart.init(csv);
// });

///////////////////second chart////////////////////
// var settingsSC = {
//   max_width: 700,
//   max_height: 450,
//   x: {
//       label: '',
//       type: 'ordinal',
//       column: 'category'
//   },
//   y: {
//       label: 'mean value',
//       type: 'linear',
//       column: 'value',
//       behavior: "firstfilter"
//   },
//   marks: [
//       {
//         // "arrange":"grouped",
//         "split":"nutrient",
//         "type":"bar",
//         "per":["category"],
//         "summarizeY":"mean",
//         "tooltip":"[nutrient]: $y"
//       }
//   ],
//   "color_by":"nutrient",
//   colors:['#e34a33','#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'],
//   // aspect: 1.0,
//   // gridlines:' xy'
//   "legend":{
//     		"label":"",
//     		"order": ["Water", "Energy", "Protein", "Total lipid (fat)", "Carbohydrate, by difference", "Fiber, total dietary", "Sugars, total"]
//     	}
// };

// var controlsSC = webCharts.createControls('#secondChartHeader', 
// 	{	
// 		location: 'top', 
// 		inputs:[
// 			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
//       {type: "subsetter", value_col: "nutrient", label: "Choose group"},
//       {type: "subsetter", value_col: "name", label: "Filter by Name", multiple: true},
//       // {label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "mean"], relabels: ["%", "N"]}
//       // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
// 		]
// 	}
// );

// // create the chart using the configuration above
// // the chart will be rendered in the <body> element
// var secondChart = webCharts.createChart('#secondChart', settingsSC, controlsSC);

// // pass some data to the chart's init() method
// // d3.csv is used to load data from a csv
// d3.csv('/static/data/API_energy.csv', function(error,csv) {

//   secondChart.init(csv);
// });


///////////////////third chart//////////////////////
var settingsTC = {
  max_width: 800,
  max_height: 500,
  x: {
      label: '',
      type: 'ordinal',
      column: 'nutrient',
      // domain: [0]
  },
  y: {
      label: 'mean value',
      type: 'linear',
      column: 'value',
      // behavior: "flex"
  },
  marks: [
      {
        "arrange":"stacked",
        "split":"category",
        "type":"bar",
        "per":["nutrient"],
        "summarizeY":"mean",
        "tooltip":"[category]: $y"
      }
  ],
  "color_by":"category",
  colors:['#e34a33','#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'],
  // aspect: 1.0,
  // gridlines:' xy'
  // "legend":{
  //   		"label":"",
  //   		"order": ["Water", "Energy", "Protein", "Total lipid (fat)", "Carbohydrate, by difference", "Fiber, total dietary", "Sugars, total"]
  //   	}
};

var controlsTC = webCharts.createControls('#thirdChartHeader', 
	{	
		location: 'top', 
		inputs:[
			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      // {type: "subsetter", value_col: "nutrient", label: "Choose group"},
      {type: "subsetter", value_col: "category", label: "Choose group"},
      {type: "subsetter", value_col: "name", label: "Filter by Name", multiple: true},
      // {label: "", type:"radio", option: "marks[0].summarizeY", values: ["percent", "mean"], relabels: ["%", "N"]}
      // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

// create the chart using the configuration above
// the chart will be rendered in the <body> element
var thirdChart = webCharts.createChart('#thirdChart', settingsTC, controlsTC);

// pass some data to the chart's init() method
// d3.csv is used to load data from a csv
d3.csv('/static/data/API_F_C_P.csv', function(error,csv) {

  thirdChart.init(csv);
});


///////////////////fourth chart//////////////////////
var settingsFC = {
  max_width: 1000,
  //max_height: 700,
  range_band: 15,
  y: {
      label: '',
      type: 'ordinal',
      column: 'name',
      behavior: "flex",
      sort: 'total-descending'
  },
  x: {
      label: 'mean value',
      type: 'linear',
      column: 'value',

      sort: 'total-descending'
  },
  marks: [
      {
        "arrange":"stacked",
        "split":"nutrient",
        "type":"bar",
        "per":["name"],
        "summarizeX":"mean",
        "tooltip":"[nutrient]: $x"
      }
  ],
  "color_by":"nutrient",
  colors:['#e34a33','#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'],
  margin: {left: 400}
  // aspect: 1.0,
  // gridlines:' xy'
  // "legend":{
  //   		"label":"",
  //   		"order": ["Water", "Energy", "Protein", "Total lipid (fat)", "Carbohydrate, by difference", "Fiber, total dietary", "Sugars, total"]
  //   	}
};

var controlsFC = webCharts.createControls('#fourthChartHeader', 
	{	
		location: 'top', 
		inputs:[
			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      // {type: "subsetter", value_col: "nutrient", label: "Choose group"},
      {type: "subsetter", value_col: "category", label: "Filter by Category"},
      {label: "", type:"radio", option: "marks[0].summarizeX", values: ["mean", "sum"], relabels: ["mean", "sum"]}
      // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

// create the chart using the configuration above
// the chart will be rendered in the <body> element
var fourthChart = webCharts.createChart('#fourthChart', settingsFC, controlsFC);

// pass some data to the chart's init() method
// d3.csv is used to load data from a csv
d3.csv('/static/data/API.csv', function(error,csv) {

  csv.forEach(function(dataRow){
    return dataRow.name = dataRow.name.split(",").slice(0,2);
   });

  fourthChart.init(csv);
});

///////////////////fourth chart//////////////////////
var settingsEnergy = {
  max_width: 1000,
  //max_height: 700,
  range_band: 15,
  y: {
      label: '',
      type: 'ordinal',
      column: 'name',
      behavior: "flex",
      sort: 'total-descending'
  },
  x: {
      label: 'mean value',
      type: 'linear',
      column: 'value',
      behavior: "flex",
      sort: 'total-descending'
  },
  marks: [
      {
        // "arrange":"stacked",
        // "split":"nutrient",
        "type":"bar",
        "per":["name"],
        "summarizeX":"mean",
        "tooltip":"[nutrient]: $x"
      }
  ],
  "color_by":"nutrient",
  colors:['#e34a33','#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'],
  margin: {left: 400}
  // aspect: 1.0,
  // gridlines:' xy'
  // "legend":{
  //   		"label":"",
  //   		"order": ["Water", "Energy", "Protein", "Total lipid (fat)", "Carbohydrate, by difference", "Fiber, total dietary", "Sugars, total"]
  //   	}
};

var controlsEnergy = webCharts.createControls('#EnergyChartHeader', 
	{	
		location: 'top', 
		inputs:[
			// {type: "dropdown", option: "y.column", label: "Y Values", values: ["Mass", "Boiling point", "Melting point", "Density", "Radius"], require: true},
      // {type: "subsetter", value_col: "nutrient", label: "Choose group"},
      {type: "subsetter", value_col: "category", label: "Filter by Category"},
      {label: "", type:"radio", option: "marks[0].summarizeX", values: ["mean", "sum"], relabels: ["mean", "sum"]}
      // {type: "subsetter", value_col: "Group", label: "Filter by Group"}
		]
	}
);

// create the chart using the configuration above
// the chart will be rendered in the <body> element
var EnergyChart = webCharts.createChart('#EnergyChart', settingsEnergy, controlsEnergy);

// pass some data to the chart's init() method
// d3.csv is used to load data from a csv
d3.csv('/static/data/API_energy.csv', function(error,csv) {


  var shorterName = csv.forEach(function(dataRow){
   return dataRow.name = dataRow.name.split(",").slice(0,2);

  });

  // var removeParentheses = csv.forEach(function(dataRow){
  //   return dataRow.shorterName = dataRow.shorterName.split("(")[0]
  // })

  EnergyChart.init(csv);
});

// var randoString = "I,want,to,split,the,string"
// var splitted = randoString.split(",").slice(0,3)
// console.log(splitted)

