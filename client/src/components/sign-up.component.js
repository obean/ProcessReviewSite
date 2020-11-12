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
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, email, password} = this.state;

        fetch('http://localhost:9000/users/new', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((result) => result.json())
    .then((info) => {console.log(info)})
}

    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" value={this.state.value} onChange={this.handleChange} name="firstName"/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" value={this.state.value} onChange={this.handleChange} name="lastName" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.value} onChange={this.handleChange} name="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}