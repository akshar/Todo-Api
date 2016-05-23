var Sequelize = require('sequelize');

var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});


//CREATE TABLE IF NOT EXISTS `todos` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255), `completed` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNUll: false,
        validate: {
            len: [1, 250]
        }
    },

    completed: {
        type: Sequelize.BOOLEAN,
        allowNUll: false,
        defaultValue: false
    }


});
// {force:true} --> drops all the tables & recreate. 
sequelize.sync({ force: false }).then(function() {
    console.log("everything is syncd");
    //INSERT INTO `todos` (`id`,`description`,`completed`,`updatedAt`,`createdAt`) VALUES (NULL,'Get a life',0,'2016-05-19 06:48:56.161 +00:00','2016-05-19 06:48:56.161 +00:00');
    //finished!
    /*Todo.create({
        description: "yo,get a life",
        completed: false
    }).then(function(todo) {
        return Todo.create({description:'clean room'});
    }).then(function(){
        // return Todo.findById(1);
        return Todo.findAll({
            where:{
                completed:false
            }

        });
    }).then(function(todos){
        if(todos){
            todos.forEach(function(todo){
                console.log(todo.toJSON());
            });
            
        }else{
            console.log('no todo'); 
        }
    })
    .catch(function(e) {
        console.log(e);
    });*/


    Todo.findById(1).then(function(todo) {
        console.log(todo.toJSON());
    });


});
