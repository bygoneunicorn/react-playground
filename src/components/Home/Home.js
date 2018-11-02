import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Board from '../Minesweeper/Board';
import './Home.css';

export default class Home extends Component{
    constructor(){
        super()

        this.state = {
            menuOpen: true,
            topIconClass: 'iconBar',
            midIconClass: 'iconBar',
            botIconClass: 'iconBar'
        }
        this.handleMenu = this.handleMenu.bind( this )
    }
    handleMenu(){
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
          }));
    }
    render(){
        let {topIconClass, midIconClass, botIconClass} = this.state
        
        return(
            <div>
                <h1>Home</h1>
                <Link to="/clients">Clients</Link>
                <Link to="/calendar">Calendar</Link>

                {/* <div className='burgerMenuContainer' onClick={() => this.handleMenu()}>
                    <div className={topIconClass}></div>
                    <div className={midIconClass}></div>
                    <div className={botIconClass}></div>
                    <div className="border-radius-box"></div>
                </div> */}
                <Board />
            </div>
        )
    }
}