
var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

const dse = require('dse-driver');
const client = new dse.Client({ 
    contactPoints: ['52.28.174.113', '9042'], 
     graphOptions: { name: 'CUSTOMER_DATA_GRAPH' }
});
 

app.get('/edges', function (req, res) {
  client.executeGraph('g.E()', function (err, result) {
  if (err) throw err;
  
  var results={};
  var j=0;
  
  result.forEach(function(edges){
      
      results[j]=edges;
      j++;
  }); 
   res.json(results);
});
});  


app.get('/vertices', function (req, res) {
  client.executeGraph('g.V()', function (err, result) {
  if (err) throw err;
  
  var results={};
  var j=0;
  
  result.forEach(function(vertex){
      
      results[j]=vertex;
      j++;
  }); 
   res.json(results);
});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});