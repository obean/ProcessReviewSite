import React, { Component } from "react";


export default class Login extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state;

        fetch('http://localhost:9000/users/login', {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify(this.state),
            
        })
        .then((result) => result.json())
        .then((info) => {console.log(info)})
        
    }

    render() {
        return (
        <div className="auth-wrapper">
          <div className="auth-inner">
             <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter email" value={this.state.value} onChange={this.handleChange} name="username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
          </div>
        </div>
        );
    }
}