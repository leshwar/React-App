import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class AddEditUser extends React.Component {
  constructor() {
    super();
    this.state = {
        pageType: '',
        pageHeader: '',
        customerDetails: '',
        nameBox: '',
        emailBox: '',
        phoneBox: '',
        usernameBox: '',
        id: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        createdAt: ''
    }
    this.Home = this.Home.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }
  
  componentDidMount() {
      console.log(this.props.location.query);
      this.setState({ 
        pageType: this.props.location.query.pageType,
        pageHeader: this.props.location.query.pageHeader,
        customerDetails: this.props.location.query.customer
      });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleAddUser(event) {
    event.preventDefault();

    const user = {
      name: this.state.nameBox,
      job: "Default"
    };

    axios.post("https://reqres.in/api/users", { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ 
            id: res.data.id,
            createdAt: res.data.createdAt
          });
      })
  }

  Home() {
    return (
        <div>
          <h2> { this.state.pageHeader } </h2>
          <div>
              <label>
                  Name: 
              </label>
              <br/>
              <input type="text" name="nameBox" placeholder="Name" onChange={ this.handleChange } value= { this.state.pageType === "edit" ? this.state.customerDetails.first_name + this.state.customerDetails.last_name : this.state.nameBox }/>
              <br/>
              <label>
                  Username: 
              </label>
              <br/>
              <input type="text" name="usernameBox" placeholder="Username" onChange={ this.handleChange } value= { this.state.pageType === "edit" ? this.state.customerDetails.username : this.state.usernameBox } />
              <br/>
              <label>
                  Email: 
              </label>
              <br/>
              <input type="text" name="emailBox" placeholder="Email" onChange={ this.handleChange } value= { this.state.pageType === "edit" ? this.state.customerDetails.email : this.state.emailBox } />
              <br/>
              <label>
                  Phone: 
              </label>
              <br/>
              <input type="text" name="phoneBox" placeholder="Phone" onChange={ this.handleChange } value= { this.state.pageType === "edit" ? this.state.customerDetails.phone : this.state.phoneBox } />
              <br/><br/>
              {}
              <Button onClick={ this.handleAddUser } variant="contained"> {this.state.pageType === "edit" ? "Update" : "Submit"} </Button>
          </div>
        </div>
    );
}

  render() {
    return (
        <div>{ this.Home() }</div>
    );
  }
}

export default AddEditUser;