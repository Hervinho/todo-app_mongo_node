const _ = require('lodash');
const {
    ObjectID
} = require('mongodb'); //get ObjectID from mongodb library
const express = require('express');
const bodyParser = require('body-parser');

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    user
} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//create todo
app.post('/todos', (req, res) => {
    //Create Todo model.
    var todo = new Todo({
        text: req.body.text
    });

    //Save into the DB
    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

});

//get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (error) => {
        res.status(400).send(error);
    })

});

//get a single todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send({
            response: 'Id not valid'
        });
    } else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.status(404).send({
                    response: 'Todo not found'
                });
            }
            res.status(200).send({
                todo
            });
        }, (error) => {
            res.status(400).send(error);
        });
    }
});

//delete a single todo
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send({
            response: 'Id not valid'
        });
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send({
                    response: 'Todo not found'
                });
            } else {
                res.status(200).send({
                    todo
                });
            }
        }, (error) => {
            res.status(400).send(error);
        });
    }
});

//update a todo using PATCH
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    //_.pick lets you choose only specifieded properties from a http request.
    var body = _.pick((req.body), ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            response: 'Id not valid'
        });
    } else {

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completedAt = null;
            body.completed = false;
        }

        Todo.findByIdAndUpdate(id, {$set: body}, {
          new: true //will return the updated object.
        }).then((todo) => {
          if (!todo) {
              res.status(404).send({
                  response: 'Todo not found'
              });
          }
          else {
             res.status(200).send({
                 todo
             });
         }
        }).catch((e) => {
          res.status(400).send();
        });
    }
});

app.listen(port, () => {
    console.log('Server listening to port ' + port);
});

//Everything in this file will be needed in server.test.js
module.exports = {
    app
};
