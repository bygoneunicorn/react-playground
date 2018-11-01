import React, {Component} from 'react';
import "./BlockField.css";

export default class BlockField extends Component{
    constructor(){
        super()

        this.state = {
            blockSection: [{
                status: 'wip',
                name: 'Whip section',
                showEdit: false
            },
            {
                status: 'complete',
                name: 'completed section',
                showEdit: false
            },
            {
                status: 'delete',
                name: 'deleted section',
                showEdit: false
            }
        ],
            status: null,
            index: null,
            blockStyle : {
                top: 0,
                left: 0,
                float: 'left'
            }
        }
        this.moveUp = this.moveUp.bind( this )
        this.moveDown = this.moveDown.bind( this )
        this.moveLeft = this.moveLeft.bind( this )
        this.moveRight = this.moveRight.bind( this )
        this.addBlock = this.addBlock.bind( this )
        this.onDragStart = this.onDragStart.bind( this )
        this.onDragOver = this.onDragOver.bind( this )
        this.onDrop = this.onDrop.bind( this )

    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKey);
      }
    
      componentWillUnmount() {
       window.removeEventListener('keydown', this.handleKey);
      }
    
      handleKey = e => {
        switch (e.keyCode) {
            case 38: this.moveUp()
                break;
            case 40: this.moveDown()
                break;
            case 37: this.moveLeft()
                break;
            case 39: this.moveRight()
                break;
        
            default:
                break;
        }
    }
    
    moveUp(){     
        let tempTopPosition = this.state.blockStyle.top
        let tempLeftPosition = this.state.blockStyle.left  
        tempTopPosition--
        this.setState({
            blockStyle: {
                top: tempTopPosition,
                left: tempLeftPosition,
                float: 'left'
            }
        })        
    }
    moveDown(){       
        let tempTopPosition = this.state.blockStyle.top
        let tempLeftPosition = this.state.blockStyle.left  
        tempTopPosition++
        this.setState({
            blockStyle: {
                top: tempTopPosition,
                left: tempLeftPosition,
                float: 'left'
            }
        })        
    }
    moveLeft(){   
        let tempTopPosition = this.state.blockStyle.top
        let tempLeftPosition = this.state.blockStyle.left
        tempLeftPosition--
        this.setState({
            blockStyle: {
                top: tempTopPosition,
                left: tempLeftPosition,
                float: 'left'
            }
        })        
    }
    moveRight(){       
        let tempTopPosition = this.state.blockStyle.top
        let tempLeftPosition = this.state.blockStyle.left
        tempLeftPosition++
        this.setState({
            blockStyle: {
                top: tempTopPosition,
                left: tempLeftPosition,
                float: 'left'
            }
        })        
    } 
    addBlock(blockStatus){
        let tempArr = this.state.blockSection.slice()

        tempArr.push({status:blockStatus})
        this.setState({
            blockSection: tempArr
        })
    }
    onDragStart(event, index){
        this.setState({
            index
        })
    }
    onDragOver(event, status){
        this.setState({
            status,
        })        
        event.preventDefault();
    }
    onDrop(event, status){
        console.log(status, this.state.index, this.state.blockSection);
        
        let tempArr = this.state.blockSection.slice()
        console.log(tempArr);
        
        tempArr.splice(this.state.index, 1, {...this.state.blockSection[this.state.index], status})
        console.log(tempArr);
        this.setState({
            blockSection: tempArr
        })
    }
    handleInputChange(name, index){
        let tempArr = this.state.blockSection.slice()
        console.log(name, index);
        
        tempArr.splice(index, 1, {...this.state.blockSection[index], name})
        console.log(tempArr);
        this.setState({
            blockSection: tempArr
        })
    }
    toggleNameEdit(showEdit, index){
        let tempArr = this.state.blockSection.slice()
        console.log(showEdit, index);
        showEdit = !showEdit
        
        tempArr.splice(index, 1, {...this.state.blockSection[index], showEdit})
        console.log(tempArr);
        this.setState({
            blockSection: tempArr
        })
    }
    render(){
        let blockSectionList = this.state.blockSection.map((e, i) => {
            return(
                <div className="block" 
                    status={e.status}
                    key={i} draggable 
                    style={this.state.blockStyle} 
                    onMouseEnter={this.blockHover}
                    onDragStart={(event) => this.onDragStart(event, i)}
                    >
                {i}
                <br/>
                {e.showEdit ? 
                <div>
                    <input type="text" value={e.name} onChange={(event) => this.handleInputChange(event.target.value, i)}/>
                    <button onClick={() => this.toggleNameEdit(e.showEdit, i)}>Done</button>
                </div>
                :
                <div>                    
                    {e.name}
                    <button onClick={() => this.toggleNameEdit(e.showEdit, i)}>Edit</button>
                </div>
                }
                </div>
            )
        })
        let blockSectionPending = blockSectionList.filter((e, i) => e.props.status === "wip")
        let blockSectionComplete = blockSectionList.filter((e, i) => e.props.status === "complete")
        let blockSectionDeleted = blockSectionList.filter((e, i) => e.props.status === "delete")
        return(
            <div>
                <div>
                    <button onClick={this.moveUp}>Move up</button>
                    <button onClick={this.moveDown}>Move down</button>
                    <button onClick={this.moveLeft}>Move left</button>
                    <button onClick={this.moveRight}>Move right</button>
                </div>
                <div className="wip"
                    onDragOver={(e) => this.onDragOver(e, 'wip')} 
                    onDrop={(e) => this.onDrop(e, 'wip')}>
                    {/* <div className="block" draggable style={this.state.blockStyle} onMouseEnter={this.blockHover}>Drag</div> */}
                    {/* <div className="block"></div> */}
                    <button onClick={() => this.addBlock('wip')}>Add Pending</button>
                    {blockSectionPending}
                </div>
                <div className="completed" 
                    onDragOver={(e) => this.onDragOver(e, 'complete')} 
                    onDrop={(e) => this.onDrop(e, 'complete')}>
                    <button onClick={() => this.addBlock('complete')}>Add Completed Block</button>
                    {blockSectionComplete}
                </div>
                <div className="delete-field"
                    onDragOver={(e) => this.onDragOver(e, 'complete')}
                    onDrop={(e) => this.onDrop(e, 'delete')}
                    >
                    <h2>Delete Here</h2>
                    {blockSectionDeleted}

                </div>

            </div>
        )
    }
}