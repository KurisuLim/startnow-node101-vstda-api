const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");
var mock = [

    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
      },
      {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
      },
      {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
      }
];

app.use(morgan("dev"));
app.use(bodyParser.json());
// add your code here


app.get('/',(req,res)=>{
    res.status(200).json({
        status: 'ok'
    })
});

app.get('/api/TodoItems',(req,res)=>{
    res.status(200).json(mock);
})

app.get('/api/TodoItems',(req,res)=>{

    let obj = {};
    if(req.params.number < mock.length){
        for( let index in mock){
            if(mock[index].todoItemId == req.params.number){
                obj = mock[index];
            }
        }
    }
    res.status(200).json(obj);
})

app.post('/api/TodoItems',(req,res)=>{
var todoItems = true;
for (let obj in mock){
    if(mock[obj].todoItemId == req.body.todoItemId){
        mock[obj] = req.body;
        res.status(201).send(mock[obj]);
        todoItems = !todoItems;
    }
}
    if(todoItems){
        mock.push(req.body);
        res.status(201).json(req.body);
    }
   
})

app.delete('/api/TodoItems/:number',(req,res)=>{
    res.status(200).json(mock[req.params.number]);
    next();
})

app.get('/api/TodoItems/:number',(req,res)=>{
    res.status(200).json(mock[req.params.number]);
    next();
})




module.exports = app;
