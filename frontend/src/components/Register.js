import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        }
        this.handleRegister= this.handleRegister.bind(this)
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    }

    handleRegister(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleRegisterSubmit(e){
        e.preventDefault()

        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        //console.log(this.state)
        //post new user to database and then redirect to the login page
        axios.post('http://localhost:8000/signup', userInfo)
        .then(result=>{
            window.location = '/login'
        })
        .catch(err=>console.log('There was an error while registering' + err))
    }
    
    render(){
        return(
            <div className='register-page'>
                <div className='nav'>
                    <h2 className='nav-heading'>Royal<span>Events</span></h2>
                    <h6><Link to='/login' className='login-link'>Login</Link></h6>
                </div>
                <div className='register-form'>
                    <h3>Register</h3>
                    <Form >
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        onChange={this.handleRegister}
                        name='username'
                        type="type" 
                        placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        onChange={this.handleRegister}
                        name='password'
                        type="password" 
                        placeholder="Password" />
                    </Form.Group>
      
                    <Button id='register-btn' type="submit" onClick={this.handleRegisterSubmit}>
                    Submit
                    </Button>
                    <p>Already have an account? Log in <Link to='/login'>here</Link></p>
                </Form>
                </div>
            </div>
        )
    }
}

export default Register;