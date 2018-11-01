import React, {Component} from 'react';
import './Slider.css';

export default class Slider extends Component {
    constructor(){
        super()

        this.state = {
            sliderPosition: 0,
            sliderStartTime: 100,
            sliderSpeedup: 2,
            sliderInterval: null,
            maxSliderValue: 100
        }
        this.holdit = this.holdit.bind( this )
        this.releaseit = this.releaseit.bind( this )
        this.minusSliderValue = this.minusSliderValue.bind( this )
        this.addSliderValue = this.addSliderValue.bind( this )
    }
    minusSliderValue(){
        let tempSliderPosition = this.state.sliderPosition
        if(tempSliderPosition > 0){
            tempSliderPosition--
            this.setState({
                sliderPosition: tempSliderPosition
            })
        } 
    }
    addSliderValue(){
        console.log('clicked');
        
        let tempSliderPosition = this.state.sliderPosition
        if(tempSliderPosition < this.state.maxSliderValue){
            tempSliderPosition++
            this.setState({
                sliderPosition: tempSliderPosition
            })
        }     
    }
    holdit(event, action, start, speedup) {
        var tempInterval = setInterval(() => {
            action()
        }, start);
        this.setState({
            sliderInterval: tempInterval
        })
    };


    releaseit() {
        clearInterval(this.state.sliderInterval)
    }
    render(){
        return(
            <div>
                <button onClick={this.minusSliderValue} onMouseDown={(e) => this.holdit(e, this.minusSliderValue, this.state.sliderStartTime, this.state.sliderSpeedup)}  onMouseUp={(e) => this.releaseit()} onMouseOut={(e) => this.releaseit()}> Test -</button>
                <div className="slider-container">
                    <input type="range" min="0" max={this.state.maxSliderValue} value={this.state.sliderPosition} onChange={(e) => this.setState({sliderPosition: e.target.value})} className="slider"/>
                </div>
                <button onClick={this.addSliderValue} onMouseDown={(e) => this.holdit(e, this.addSliderValue, this.state.sliderStartTime, this.state.sliderSpeedup)}  onMouseUp={(e) => this.releaseit()} onMouseOut={(e) => this.releaseit()}> Test +</button>
                <br/>
                {this.state.sliderPosition}
            </div>
        )
    }
}