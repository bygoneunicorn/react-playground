import React, {Component} from 'react';
import './Minesweeper.css';

import Square from './Square';

export default class Board extends Component {
    constructor(){
        super()

        this.state = {
            gridHeight: 8,
            gridWidth: 8,
            mineNum: 10
        }
        this.createEmptyArray = this.createEmptyArray.bind( this )
    }
    renderSquare(i, hasMine) {
        return <Square index={i} hasMine={hasMine} key={i}/>
    }
    createEmptyArray(height, width) {
        let data = [];
        for(let i=0; i<height; i++){
            data.push([]);
            for(let j=0; j<width; j++){
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false
                }
            }
        }
        return data;
    }
    getRandomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    plantMines(data, height, width, mines) {
        let randomx, randomy, minesPlanted = 0;

        while(minesPlanted < mines) {
            randomx = this.getRandomNumber(width);
            randomy = this.getRandomNumber(height);

            if(!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true;
                minesPlanted++;
            }
        }
        return (data)
    }
    getNeighbors(data, height, width) {
        let updatedData = data;

        for (let i=0; i< height; i++){
            for (let j=0; j< width; j++) {
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbor = mine
                }
            }
        }
        return (updatedData);
    }
    traverseBoard(x, y, data) {
        const el = [];
        if (x > 0) {
        el.push(data[x - 1][y]);
        } 
        if (x < this.props.height - 1) {
        el.push(data[x + 1][y]);
        }
        if (y > 0) {
        el.push(data[x][y - 1]);
        }
        if (y < this.props.width - 1) {
        el.push(data[x][y + 1]);
        }
        if (x > 0 && y > 0) {
        el.push(data[x - 1][y - 1]);
        }
        if (x > 0 && y < this.props.width - 1) {
        el.push(data[x - 1][y + 1]);
        }
        if (x < this.props.height - 1 && y < this.props.width - 1) {
        el.push(data[x + 1][y + 1]);
        }
        if (x < this.props.height - 1 && y > 0) {
        el.push(data[x + 1][y - 1]);
        }
        return el;
    }
    initBoardData(height, width, mines){
        let data = this.createEmptyArray(height, width);
        data = this.plantMines(data, height, width, mines);
        data = this.getNeighbors(data, height, width);

        return data;
    }
    renderBoard(data) {
        return data.map((datarow) => {
          return datarow.map((dataitem) => {
            return (
              <div 
                key={dataitem.x * datarow.length + dataitem.y}>
                {/* <Sqaure
                  onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
                  cMenu={(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
                  value={dataitem}
                /> */}
      // This line of code adds a clearfix div after the last cell of each row.
                {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
              </div>
            );
          })
        });
      }
    render() {
        const {gridHeight, gridWidth, mineNum} = this.state
        const status = 'Next player: X';
        let boardRows = []
        let mineProb = mineNum / (gridHeight * gridWidth)
        var minesToBeLaid = mineNum
        console.log(minesToBeLaid);
        let someData = this.createEmptyArray(gridHeight, gridWidth)
        this.plantMines(someData, gridHeight, gridWidth, mineNum)
        console.log(someData);
        
        let squareData = []
        for(let i=0; i<gridHeight; i++){
            
            let boardSquare = []
            boardRows.push(
                <div className="board-row">
                    {boardSquare}               
                </div>)
                for(let j=0; j<gridWidth; j++){
                    squareData = {

                    }
                    let hasMine = false
                    let diceRoll = Math.random()
                    if(minesToBeLaid > 0){
                        if(mineProb >= diceRoll){
                            hasMine = true
                            minesToBeLaid--
                        }
                        // console.log(minesToBeLaid, mineProb, diceRoll, hasMine);
                    }
                    
                    boardSquare.push(this.renderSquare(j + (i*8), hasMine))
                }
        }

        return (
          <div>
            <div className="status">{status}</div>
            {/* <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div> */}
            {boardRows}
          </div>
        );
    }
}