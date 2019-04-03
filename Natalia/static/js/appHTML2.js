

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
      label: 'kcal',
      type: 'linear',
      column: 'value',
      behavior: "flex",
      sort: 'total-descending'
  },
  marks: [
      {
        "type":"bar",
        "per":["name"],
        "summarizeX":"mean",
        "tooltip":"[nutrient]: $x"
      }
  ],
  "color_by":"nutrient",
  colors:['#e34a33','#fc8d59','rgb(102,194,165)',"#fecc5c",'rgb(43,131,186)'],
  margin: {left: 400},
  "legend": 
  {
        "label":"",
        "location": "right"
    	}
};

var controlsEnergy = webCharts.createControls('#EnergyChartHeader', 
	{	
		location: 'top', 
		inputs:[
      {type: "subsetter", value_col: "category", label: "Filter by Category"},
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

var myTable = webCharts.createTable('#tableHere');

d3.csv('/static/data/API_table.csv', function(e,d){

  // var updatedTable = d3.nest()
  //   .key(function (d) { return d.category;})
  //   .key(function (d) { return d.name;})
  //   .rollup(function(d){
  //         return  d.length; })
  //     .entries(d)
  //     console.log(updatedTable)

  var wide = d3.nest()
  .key(function(d) { return d["name"] }) // sort by key
  .rollup(function(d) { // do this to each grouping
    // reduce takes a list and returns one value
    // in this case, the list is all the grouped elements
    // and the final value is an object with keys
    return d.reduce(function(prev, curr) {
      prev["name"] = curr["name"];
      prev[curr["nutrient"]] = curr["nutrient"];
      return prev;
    }, {});
  })
  .entries(d) // tell it what data to process
  .map(function(d) { // pull out only the values
    return d.value;
  });



  myTable.init(d);
});
