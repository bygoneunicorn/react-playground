import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Clients from './components/Clients/Clients';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 10);
  }
  render() {
    if(this.state.loading) {
      return <div>loading...</div>
    }
    else {

      return (
        <HashRouter>
        <div className="App">
          <Switch>
            <Route path="/clients" component={Clients}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
  }
}

export default App;
