import React, { Component } from 'react'
import axios from 'axios';
const Context = React.createContext();

const reducer = (prevState,action)=>{
    switch(action.type){
        case "TOGGLE":
            return {todos: prevState.todos.map(t=>{
                if(t._id===action.payLoad){
                    t.complete=true        
                };
                 return t})}
        case "UNDO" :
            return{
                todos: prevState.todos.map(t=>{
                    if(t._id===action.payLoad){
                        t.complete=false       
                    };
                     return t})
            }
        case "REMOVE":
            
            return{
                todos: prevState.todos.filter(todo=>todo._id !== action.payLoad)
            }

        case "ADD":
            return{todos: [...prevState.todos , action.payLoad]}
        
        
        default:
            return prevState
    }
}
//by this we can pass data b/w components easily...
export class Provider extends Component {
    state={
        todos:[],
        dispatch:(action)=>this.setState(prevState => reducer(prevState,action))
    }
    componentDidMount(){
        axios.get('/todos')
        .then(res=>this.setState({todos:res.data}))
    }
    render() {
        return (
           <Context.Provider value={this.state}>
               {this.props.children}
           </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
