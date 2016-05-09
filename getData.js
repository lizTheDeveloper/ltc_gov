var fs = require("fs");
var request = require("request");
var parser = require("xml2json");


var dataRows = [];
var dataJson = {};

for (var i = 2015; i > 1999; i--) {
  dataJson[i] = {};
  request('http://api.wolframalpha.com/v2/query?appid=2L425U-2AV8PYP2VU&input=average%20temperature%20washington%20dc%20'+i+'&format=plaintext', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = parser.toJson(body, {object: true}); // Show the HTML for the Google homepage.

      var result = json["queryresult"]["pod"][1]["subpod"]["plaintext"]

      dataJson[parseInt(result.split(" ")[4].split("(")[1])]["avg"] = result.split(" ")[0];
      dataRows.push(json["queryresult"]["pod"][1]["subpod"]["plaintext"]);

      console.log(dataJson);

    }
  })

  request('http://api.wolframalpha.com/v2/query?appid=2L425U-2AV8PYP2VU&input=temperature%20for%20washington%20dc%20'+i+'&format=plaintext', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = parser.toJson(body, {object: true}); // Show the HTML for the Google homepage.

      var result = json["queryresult"]["pod"][1]["subpod"]["plaintext"]
      var year = json["queryresult"]["pod"][0]["subpod"]["plaintext"].split(" ")[5].split("\n")[1]
      //console.log(result)
      dataJson[parseInt(year)]["low"] = parseInt(result.split(" ")[6]);
      dataJson[parseInt(year)]["high"] = parseInt(result.split(" ")[13]);
      dataRows.push(json["queryresult"]["pod"][1]["subpod"]["plaintext"]);

      console.log(dataJson);
    }
  })

}
