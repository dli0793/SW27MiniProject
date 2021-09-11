const usda = require("usda-ingredients-api");
const results = usda("815893000163");


//var rn_bridge = require('rn-bridge');

results.then(function(result) {
   console.log(result[0])//.foodNutrients[3])//.nutrientNumber) 
})

// Echo every message received from react-native.
/*rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg);
} );

// Inform react-native node is initialized.
rn_bridge.channel.send('Node was initialized.');*/
//usda(req);
/*var http = require('http');

var hostname  = '127.0.0.1';
var port      = 3000;

var app = http.createServer(function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            
            console.log(results);
            res.end(
              JSON.stringify({
                result: results
              })
            );
            
          });

app.listen(port, hostname);*/