import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddEditUser from './AddEditUser';

class Customers extends React.Component {
    constructor() {
      super();

      this.state = {
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Username', field: 'username' },
          { title: 'Email', field: 'email' },
          { title: 'Phone', field: 'phone', type: 'numeric' },
          { title: 'Created Date', field: 'createdDate', type: 'date' },
          { title: 'Action', field: 'action' },
        ],
        data: [],
      };
      
      this.handleAddUser = this.handleAddUser.bind(this);
      this.fetchCustomers = this.fetchCustomers.bind(this);
      this.deleteRow = this.deleteRow.bind(this);
      this.Home = this.Home.bind(this);
    }

    componentDidMount() {
        this.fetchCustomers();
        if(this.props.location.deleteRow === true) {
          console.log("Delete is selected");
        }
    }

    handleAddUser() {
      return(
        <div>
          <AddEditUser/>
        </div>
        
      );
    }

    deleteRow(email) {
      console.log("In delete");
      console.log(email);
      console.log(this.state.data);
      let tempCustomers = [...this.state.data];
      tempCustomers = tempCustomers.filter(row => row.email !== email)
      console.log(tempCustomers);
      this.setState( {data: tempCustomers } );
    }

    Home() {
        return (
            <div>
              <MaterialTable
                title = "My Customers"
                columns = { this.state.columns }
                data = { this.state.data }
              />
              <Link to= {{
                          pathname: "/addedituser", 
                          query: { 
                            pageType: "add",
                            pageHeader: "Add User", 
                            customer: '' 
                          }
                        }}>
                <Button variant="contained" color="primary"> Add User </Button>
              </Link>
            </div>
        );
    }

    async api_call_handler(url, method, params) {
      axios.get(url)
      .then(res => {
        let customers = [];
        res.data.data.map((rows) => (
          
          customers.push({name: rows.first_name + " " + rows.last_name, 
                          username: "test"+rows.id,
                          email: rows.email,
                          phone: "1234567890",
                          createdDate: "",
                          action: 
                            <div>
                              <Link to= {{
                                          pathname: "/addedituser", 
                                          query: { 
                                            pageType: "edit",
                                            pageHeader: "Edit User", 
                                            customer: rows 
                                          }
                                        }}>
                                Edit 
                              </Link>
                              &nbsp;&nbsp;
                              <Link onClick={() => { this.deleteRow(rows.email) }}> Delete </Link>
                            </div>,
                        })
        ))
        this.setState( prevState => { 
          const data = prevState.data.concat(customers);
          return {
            prevState,
            data,
          };
        });
      });
    }
    
    fetchCustomers() {
      let params = null;
      this.api_call_handler("https://reqres.in/api/users", 'GET', params);
    }
  
    render() {
      return (
        <div>
          { this.Home() }
        </div>
      );
    }
  }
export default Customers;
