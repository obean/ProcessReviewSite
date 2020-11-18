import React, { Component } from "react";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router';

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            password: '',
            username: '',
            lastName: '',
            email: '',
            isAdmin: 'false',
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.email)
        console.log(this.state.isAdmin)
      }

    onSubmit = (e) => {
        e.preventDefault();
        this.state.isAdmin == "on" ? this.setState({isAdmin: true}) : this.setState({isAdmin: false})
       // const {firstName, lastName, email,} = this.state;

        fetch('http://localhost:9000/users/new', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
        
        })
        .then((result) => {if(result.ok){
            fetch('http://localhost:9000/users/login', {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json'
        },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            
        })
        .then((result) => {
            result.json();
            console.log(result.json)
            this.props.history.push("/profile");})
        }})

    // this.props.history.push('/profile');  
    }
     

    

    render() {
        return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form method='POST' action='http://localhost:9000/users/new'>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name ="firstName" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastName" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password"  onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" onClick={console.log(this.state.value)} name="isAdmin" id="customCheck1" onChange={this.onChange}/>
                        <label className="custom-control-label" htmlFor="customCheck1">Signup as Reviewer</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.onSubmit(e)}>Sign Up</button>
                
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
          </div>
        </div>
        );
    }
}