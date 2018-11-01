import React from 'react';

export default class Square extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            value: this.props.hasMine
        }
    }
    render(){
        return(
            <button 
                className="square" 
                onClick={() => this.setState({value: true})}
            >
                {this.state.value ? 1 : 0}
            </button>
        )
    }
}