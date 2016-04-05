var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
app.get('/', function(request, response) {
    response.send('TODO API');

});

//GET /todos
app.get('/todos', function(request, response) {

    response.json(todos);

});

//GET /todos/:id
app.get('/todos/:id', function(request, response) {
    var todoId = parseInt(request.params.id, 10); // req.param returns string we need to convert it to Int
    var matchedTodo = _.findWhere(todos, { id: todoId });
    // var matchedTodo;
    // todos.forEach(function(todo) {
    //     if (todoId === todo.id) {
    //         matchedTodo = todo;
    //     }

    // });

    if (matchedTodo) {
        response.json(matchedTodo);
    } else {
        response.status(404).send();
    }

});

// Post /todos

app.post('/todos', function(request, response) {

    var body = _.pick(request.body, 'description', 'completed');

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return response.status(400).send();
    }

    body.description = body.description.trim();
    body.id = todoNextId;

    todoNextId++;
    todos.push(body);

    // console.log("description"+request.body.description);
    response.json(body);

});

app.delete('/todos/:id', function(request, response) {

var todoId = parseInt(request.params.id, 10); // req.param returns string we need to convert it to Int
var matchedTodo = _.findWhere(todos, { id: todoId });

if(matchedTodo){

todos = _.without(todos,matchedTodo); 
response.json(matchedTodo);

}else{
	response.status(404).send({"error":"no TOdo found with the given id"});
}


});

app.listen(PORT, function() {

    console.log("Express running at " + PORT);

});
