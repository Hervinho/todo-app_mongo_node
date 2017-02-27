const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'First todo test'
}, {
  text: 'Second todo test'
}];

//Here we will run some code before every trst case
beforeEach((done) => {
  //remove everything in the Todo collection inside the DB and insert seed data.
  Todo.remove({})
    .then(() => {
      //done();
      return Todo.insertMany(todos);
    })
    .then(() => {
      done();
    })
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200) //status code of http request
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                  return done(err);
                }

                //Check if data was really saved into the DB.
                Todo.find({text}).then((todos) => {
                  expect(todos.length).toBe(1);
                  expect(todos[0].text).toBe(text);
                  done();
                })
                .catch((e) => {//catch any error that might occur right above.
                  done(e);
                })
            });
    });

    //2nd test. Make sure todo does not get created if bad data is sent.
    it('should not create a new todo with invalid data', (done) => {
      request(app)
          .post('/todos')
          .send({})
          .expect(400) //status code of http request
          .end((err, res) => {
              if(err){
                return done(err);
              }

              Todo.find().then((todos) => {
                //should only find 2 documents in the DB (from todos array)
                expect(todos.length).toBe(2);
                done();
              })
              .catch((e) => {//catch any error that might occur right above.
                done(e);
              })
          });
    });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
        .get('/todos')
        .expect(200) //status code of http request
        .expect((res) => {
          //should only find 2 documents in the DB (from todos array)
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
  });
});
