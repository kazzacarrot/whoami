var express = require("express")
var app = express();
var port = process.env.PORT || 8080
module.exports = app;

app.listen(port, function(err){
    if (err) throw err;
    console.log("Listening on port %s", port);
})

app.get("/", function(req, res){
 
    console.log(req)
    var language = req.headers["accept-language"] || "undefined";
    var ua = req.headers["user-agent"];
    var software = ua.substring(ua.indexOf("(") +1, ua.indexOf(")"));
    var IP = req.connection.remoteAddress;
    res.send({
        language: language,
        software: software || "undefined",
        ipaddress: IP
    }); 

})
