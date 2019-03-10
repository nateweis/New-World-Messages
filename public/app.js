import React, { Component } from 'react';
import io from 'socket.io-client'
import SignUp from './components/SignUp'
import Login from './components/Login'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
     logedin: false
    }
  }
  socket = io.connect('http://localhost:3000');

  toggleLogdin = () => {
    this.setState((pre) => {
      pre.logedin = !pre.logedin
      return{logedin:pre.logedin}
    })
  }

  componentDidMount(){

  }


  render() {
    return (
      <div className="">
        <SignUp />
        <Login logedin={this.toggleLogdin} />
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
