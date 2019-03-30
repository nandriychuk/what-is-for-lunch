var select = document.getElementById("selDataset"); 
var options = ["1", "2", "3", "4", "5"]; 

options.forEach(opt => {
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
});



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("project_two");
  var query = { name: "Lard" };
  dbo.collection("data_csv").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});