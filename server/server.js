const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

const db = "mongodb+srv://sahi:9032@cluster0.0vtxx.mongodb.net/myTodos?retryWrites=true&w=majority"

mongoose.connect(db,{useNewUrlParser:true})
.then(console.log("connected to mongodb"))
.catch(err=>{
    console.log(err)
})


const todoSchema = new mongoose.Schema({
    title:String,
    complete:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model('todo',todoSchema)

app.get('/todos',(req,res)=>{
    Todo.find().then(todo=>res.json(todo))
})

app.post('/todos',(req,res)=>{
    const newTodo = new Todo({
        title:req.body.title
    })
    newTodo.save().then(r=>res.json(r))
})

app.delete('/todos/:id',(req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>res.json({message:'true'}))
})


app.listen(5000,()=>{
    console.log('server is running at 5000')
});

