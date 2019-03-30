// var queryUrl = "https://api.nal.usda.gov/ndb/reports/?ndbno=14006&type=b&format=json&api_key=9e03PpVg2so5T1CiVR7kku6gkmNzbstbVgvxqR7m"
//type parameter.type can be b, f or s
// b - basic, s- statistic, f- full
//up to 25 ndbno numbers
//write to csv?
// var queryUrl = "https://api.nal.usda.gov/ndb/reports/?type=BF&format=json&api_key=9e03PpVg2so5T1CiVR7kku6gkmNzbstbVgvxqR7m"


var queryUrl = 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=11011&ndbno=11080&type=b&format=json&api_key=9e03PpVg2so5T1CiVR7kku6gkmNzbstbVgvxqR7m'
d3.json(queryUrl, function(data){
    console.log(data)
})