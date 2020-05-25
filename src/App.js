import React from 'react';
import Nav from './Nav';
import AddEditUser from './AddEditUser';
import Customers from './Customers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameBox: '',
      passwordBox: ''
    };
    
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Home = this.Home.bind(this);
  }

  async api_call_handler(url, params) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('POST', url);
    request.send(params);
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  async handleLogin() {
    console.log( this.state.usernameBox, this.state.passwordBox );
    let params = {
      "data": {
        "email": this.state.usernameBox,
        "password": this.state.passwordBox
      }
    }
    let response = this.api_call_handler("https://reqres.in/api/login", params);
    console.log(response);
  }

  Home() {
    return (
    <div>
      <h1>TruckX React App!!!</h1>
      <input 
        type="text" 
        name="usernameBox" 
        placeholder="Enter Username..." 
        value={ this.state.usernameBox }
        onChange={ this.handleChange } 
      />
      <br/>
      <br/>
      <input 
        type="password" 
        name="passwordBox" 
        placeholder="Enter Password..."
        value={ this.state.passwordBox } 
        onChange={ this.handleChange } 
      />
      <br/>
      <br/>
      <Button variant="contained" onClick={ this.handleLogin } color="primary">Login</Button>
    </div>
    );
  }
  
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route path="/" exact component={this.Home} />
              <Route path="/addedituser" component={AddEditUser} />
              <Route path="/customers" component={Customers} />
            </Switch>
          </div>
        </Router>
      </div>
      
    );
  }
}



export default App;