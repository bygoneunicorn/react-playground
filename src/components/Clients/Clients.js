import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Client.css';
import Slider from '../Slider/Slider';
import BlockField from '../BlockField/BlockField';

export default class Clients extends Component{
    constructor(){
        super()

        this.state = {
            input: '',
            clients: []
        }
        this.addClient = this.addClient.bind( this )
    }
    addClient(){
        let temp = this.state.clients
        temp.push(this.state.input)
        this.setState({
            input: '',
            clients: temp
        })
    }

    render(){
        let clientList = this.state.clients.map( (e, i) => {
            return(
                <div key={i}>{e}</div>
            )
        })
        return(
            <div>
                {/* <div className="fullImage"></div> */}
                <Link to="/">Home</Link>
                <h1>Clients</h1>
                <input value={this.state.input} onChange={(e) => this.setState({input: e.target.value})}/>
                <button onClick={() => this.addClient()}>Add Client</button>
                {clientList}
                <Slider/>
                <BlockField/>
            </div>
        )
    }
}