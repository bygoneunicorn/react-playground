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
    componentWillMount(){
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
        let tempStyleArr = []
        for(let i=0; i<gridSize; i++) {
            tempStyleArr.push(
                {
                    background: 'green',
                    color: 'black'
                }
            )
        }
        this.setState({
            elementStyle: tempStyleArr
        })
    }
    onBackgroundChange(input, index){
        let tempInputArr = this.state.elementStyle

        tempInputArr[index] = Object.assign({}, tempInputArr[index], {background: input})
        console.log(tempInputArr[index]);
        
        this.setState({
            elementStyle: tempInputArr
        })
    }
    onColorChange(input, index){
        let tempInputArr = this.state.elementStyle

        tempInputArr[index] = Object.assign({}, tempInputArr[index], {color: input})

        this.setState({
            elementStyle: tempInputArr
        })
    }
    changeStyle(index) {
        let tempArr = this.state.elementStyle.slice()
        tempArr[index] = this.state.elementInput[index]
        if(tempArr[index] !== undefined){
            this.setState({
                elementStyle: tempArr
            })
        }
    }
    resetState(){
        this.setState({
            height: 5
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

            <input type='color' onChange={(e) => this.onBackgroundChange(e.target.value, cellIndex)} value={this.state.elementStyle[cellIndex].background}/>
            <input type='color' onChange={(e) => this.onColorChange(e.target.value, cellIndex)}/>
            
            </div>
            
            })}
            </div>
           return rows
           
           //    this.resetState()
        })        
        console.log(this.state.elementStyle);
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