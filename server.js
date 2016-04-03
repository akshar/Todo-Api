var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/',function(request,response){
	response.send('TODO API');

});

app.listen(PORT,function(){

	console.log("Express running at "+PORT);

});