import React from 'react';
import './Calendar.css'

export default class Calendar extends React.Component{
    constructor(props){
        super(props) 

        this.state = {
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            height: 5,
            width: 7,
            elementStyle: [],
            elementInput: []
        }
    }
    componentDidMount(){
        this.addElementStyle()
    }
    createEmptyArray(height, width) {
        let data = [];
        for(let i=0; i<height; i++){
            data.push([]);
            for(let j=0; j<width; j++){
                data[i][j] = {
                    x: i,
                    y: j
                }
            }
        }
        return data;
    }
    addElementStyle() {
        let gridSize = (this.state.height + 1) * (this.state.width +1)
        for(let i=0; i<gridSize; i++) {
            let tempStyleArr = this.state.elementStyle
            tempStyleArr.push(
                {
                    background: 'green'
                }
            )
        }
    }
    onInputChange(input, index){
        let tempInputArr = this.state.elementInput

        tempInputArr[index] = {background: input};

        this.setState({
            elementInput: tempInputArr
        })
    }
    changeStyle(index) {
        let tempArr = this.state.elementStyle.slice()
        console.log(tempArr[index].background, index, tempArr[index], this.state.elementInput[index])
        tempArr[index] = this.state.elementInput[index]
        console.log(tempArr, index);
        
        this.setState({
            elementStyle: tempArr
        })
    }
    render(){
        let now = new Date()
        let fullYear = now.getFullYear()
        let month = now.getMonth()
        let time = now.getTime()
        let date = now.getDate()
        // console.log(now);
        var index = 0

        let grid = this.createEmptyArray(this.state.height, this.state.width).map((row) => {
            let rows = <div className="row" key={row[0].x} id={row[0].x + 'x'}><div className="time-column">Time Column</div> {row.map((item) => {
                let xposition = item.x
                let yposition = item.y
                let cellIndex = index;
                index++;
                // this.addElementStyle()
                // console.log(xposition, yposition, cellIndex);
                
            return <div 
            className="cell" 
            key={yposition} 
            id={yposition + 'y'} 
            style={this.state.elementStyle[cellIndex]} 
            >
            
            {this.state.weekdays[yposition]} cellIndex:{cellIndex}
            <br/>

            <input type='color' onChange={(e) => this.onInputChange(e.target.value, cellIndex)}/><button onClick={() => this.changeStyle(cellIndex)}>Enter</button>
            
            </div>
            
            })}
            </div>
           return rows
        })        
        return(
            <div>
                <div>{fullYear} full year</div>
                <div>{month} month</div>
                <div>{time} time</div>
                <div>{date} date</div>
                <div>{this.state.weekdays[now.getDay()]}</div>
                <div>{grid}</div>
            </div>
        )
    }
}