
function buildCharts() {
  d3.json(`/plot`).then((data) => {
    const sugar = data.sugars;
    const namelabel = data.names;
    const fat = data.fats;

    // Build a Bubble Chart
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      // title: {
      //   text:'Fat vs Sugar',
  
      // },
      xaxis: {
        title: {
          text: 'Sugar',
          font: {
            // family: 'Courier New, monospace',
            size: 18,
            color: 'blue'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Fat',
          font: {
            // family: 'Courier New, monospace',
            size: 18,
            color: 'blue'
          }
        }
      }
    };
    var bubbleData = [
      {
        x: sugar,
        y: fat,
        text: namelabel,
        name:'All Food',
        mode: "markers",
        marker: {
          size: 10,
          color: 'grey',
          colorscale: "Earth"
        }
      }
    ];
    // globaldata.push(bubbleData);
    Plotly.plot('bubble', bubbleData, bubbleLayout);
    

  });
}
var lastTrace;
var lastTrace2;
function buildCharts2(sample) {
    d3.json(`/plot/${sample}`).then((data) => {
      const sugar = data.sugars;
      const namelabel = data.names;
      const fat = data.fats;
  
      // Build a Bubble Chart
      var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closest",
        // xaxis: { title: "Sugar vs Fat" }
      };
      var bubbleData = [
        {
          x: sugar,
          y: fat,
          text: namelabel,
          name:sample,
          mode: "markers",
          marker: {
            size: 5,
            color: 'red',
            colorscale: "Earth"
          }
        }
      ];
      if (lastTrace==1) {
        Plotly.deleteTraces('bubble', lastTrace)
        console.log('triggerlastTrace2')
      
      } 
      else if(lastTrace==2) {
        Plotly.deleteTraces('bubble',2)
        Plotly.deleteTraces('bubble',1)
        console.log('triggerlastTrace3')
      }
      // if (lastTrace&&lastTrace2) {
      //   Plotly.deleteTraces('bubble', lastTrace2)
      //   Plotly.deleteTraces('bubble', lastTrace)
      // } 
      
      Plotly.plot('bubble', bubbleData, bubbleLayout);
      lastTrace = document.getElementById('bubble').data.length-1; 
      console.log(lastTrace);
        

    });
  }
// var lastTrace;
function buildCharts3(sample) {
  // d3.select("#set2input").value='';
  // 

    d3.json(`/plot2/${sample}`).then((data) => {
      const sugar = data.sugars;
      const namelabel = data.names;
      const fat = data.fats;
        // console.log(namelabel);
      // Build a Bubble Chart
      var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closest",
        // xaxis: { title: "Sugar vs Fat" }
      };
      var bubbleData = [
        {
          x: sugar,
          y: fat,
          text: namelabel,
          name:sample,
          mode: "markers",
          marker: {
            size: 15,
            color: 'yellow',
            colorscale: "Earth"
          }
        }
      ];
      if (lastTrace==2) {
        Plotly.deleteTraces('bubble', lastTrace)
      }

      Plotly.plot(document.getElementById('bubble'), bubbleData, bubbleLayout);
      lastTrace = document.getElementById('bubble').data.length -1  
      console.log(lastTrace);
      // console.log(lastTrace2);
    });
  }
  

  function buildGauge(wfreq) {
    console.log(wfreq);
    // Enter the washing frequency between 0 and 180
    var level = parseFloat(wfreq)/5;
  
    // Trig to calc meter point
    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    console.log(degrees);
    // Path: may have to change to create a better triangle
    var mainPath = "M -.0 -0.05 L .0 0.05 L ";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
  
    var data = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "Calories",
        text: level*5,
        hoverinfo: "text+name"
      },
      {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["800-900", "700-800", "600-700", "500-600", "400-500", "300-400", "200-300", "100-200", "0-100", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(160, 50, 50, .5)",
            "rgba(170, 70, 70, .5)",
            "rgba(180, 90, 90, .5)",
            "rgba(190, 110, 110, .5)",
            "rgba(200, 130, 130, .5)",
            "rgba(210, 150, 150, .5)",
            "rgba(220, 170, 170, .5)",
            "rgba(230, 195, 195, .5)",
            "rgba(240, 210, 210, .5)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["800-900", "700-800", "600-700", "500-600", "400-500", "300-400", "200-300", "100-200", "0-100", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];
  
    var layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "<b>Calories</b> <br> Per 100 gram",
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
  
    var GAUGE = document.getElementById("bubble2");
    Plotly.newPlot(GAUGE, data, layout);
  }
  