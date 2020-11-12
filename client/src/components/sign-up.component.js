import React, { Component } from "react";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router';

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, email} = this.state;

        fetch('http://localhost:9000/users/new', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((result) => result.json())
    .then((info) => {console.log(info)})
    // this.props.history.push('/profile');    
}

    

    render() {
        return (
            <form method='POST' action='http://localhost:9000/users/new'>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name ="firstName"/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastName" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}