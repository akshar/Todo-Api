var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
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
    var query = request.query;
    var where = {};

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;

    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        }
    }

    db.todo.findAll({ where: where }).then(function(todos) {
        response.json(todos);
    }, function(e) {
        response.status(500).send();
    });
});

//GET /todos/:id
app.get('/todos/:id', function(request, response) {
    var todoId = parseInt(request.params.id, 10); // req.param returns string we need to convert it to Int
    db.todo.findById(todoId).then(function(todo) {
        if (!!todo) {
            response.json(todo.toJSON());
        } else {
            response.status(404).send();
        }
    }, function(e) {
        response.status(500).send();
    });
});

// Post /todos

app.post('/todos', function(request, response) {

    var body = _.pick(request.body, 'description', 'completed');

    db.todo.create(body).then(function(todo) {
        response.json(todo.toJSON());
    }, function(e) {
        response.status(404).json(e);
    });
});

app.delete('/todos/:id', function(request, response) {
    var todoId = parseInt(request.params.id, 10); // req.param returns string we need to convert it to Int

    db.todo.destroy({
        where: {
            id: todoId
        }
    }).then(function(rowsDeleted) {
        if (rowsDeleted == 0) {
            response.status(404).json({
                error: "no todo with id"
            });
        } else {
            response.status(204).send(); // 204 nothing to retrun
        }

    }, function() {
        response.status(500).send();
    });

});

app.put('/todos/:id', function(request, response) {
    //Model Vs Instance Method : instance method is called on existing models(here todo)
    var todoId = parseInt(request.params.id, 10); // req.param returns string we need to convert it to Int
    var body = _.pick(request.body, 'description', 'completed');

    var attributes = {};
    if (body.hasOwnProperty('completed')) {
        attributes.completed = body.completed;
    }


    if (body.hasOwnProperty('description')) {
        attributes.description = body.description;
    }

    db.todo.findById(todoId).then(function(todo) {
        if (todo) {
            todo.update(attributes).then(function(todo) {
                response.json(todo.toJSON());
            }, function(e) {
                response.status(400).json(e);
            }); 
        } else {
            response.status(404).send();
        }

    }, function() {
        response.status(500).send();
    })

    // matchedTodo = _.extend(matchedTodo, attributes);
    // response.json(matchedTodo);



});

db.sequelize.sync().then(function() {

    app.listen(PORT, function() {

        console.log("Express running at " + PORT);

    });

});
