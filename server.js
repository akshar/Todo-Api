var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
        id: 1,
        description: "Get the papers from Capg",
        completed: false

    }, {
        id: 2,
        description: "get a beer from madhuloka",
        completed: false

    }, {
        id: 3,
        description: "Cook now!",
        completed: true

    }

];


app.get('/', function(request, response) {
    response.send('TODO API');

});

app.get('/todos', function(request, response) {

    response.json(todos);

});

app.get('/todos/:id', function(request, response) {
	var todoId = parseInt(request.params.id,10);  // req.param returns string we need to convert it to Int
	var matchedTodo;
	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo = todo;
		}

	});
    // response.send("Requested id by the user is " + request.params.id);
    if(matchedTodo){
    response.json(matchedTodo);
    }else{
    	response.status(404).send();
    }

});

app.listen(PORT, function() {

    console.log("Express running at " + PORT);

});
