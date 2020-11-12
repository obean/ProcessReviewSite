import React, { Component } from "react";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;

        fetch('http://localhost:9000/users/login', {
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
                <h3>Sign in</h3>


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