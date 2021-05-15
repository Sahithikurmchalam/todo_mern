import axios from 'axios';
import React, { Component } from 'react'
import {Consumer} from '../context';
export default class Todo extends Component {
    style=()=>{
        const {complete} = this.props.todo
        return {textDecoration:complete?"line-through":"none"}
    }

    toggle = (id,complete,dispatch) =>{
        if(!complete)
            dispatch({type:"TOGGLE",payLoad:id});
        else
            dispatch({type:"UNDO",payLoad:id})
    }

    toggleHandler=(id,dispatch)=>{
        axios.delete(`/todos/${id}`)
        .then(()=>dispatch({type:"REMOVE",payLoad:id}))
        
        console.log('dipatch')
    }

    render() {
        
        const {title,_id,complete} =this.props.todo;
        
        
        return (
            <Consumer>{value=>{
                const {dispatch} = value
                return <h3 className="text-dark text-center p-1 bg-light  border-bottom" style={this.style()}>
                <i className="far fa-times-circle fa-sm float-left m-1 text-danger" onClick={this.toggleHandler.bind(this,_id,dispatch)}></i>{title}
                <input type="checkbox" className="m-2 float-right" onChange={this.toggle.bind(this,_id,complete,dispatch)}/>
            </h3>
            }}</Consumer>
            
        )
    }
}
