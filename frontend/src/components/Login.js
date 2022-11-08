import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'

/*
admin login:
name: Ashleigh
password: 12345 */

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)

        //a friend helped me with this. Get the params from the function in the server file where it redirects the user if successful.
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
          //if token exists then save user to localstorage and redirect to user home page
          if(params.token) {
            localStorage.setItem('user', JSON.stringify({
                token: 'Bearer '+ params.token, //store token, isAdmin and username in localstorage
                isAdmin : false,
                username: params.name
            }))
            window.location = '/'
          }
    }

    handleLogin(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    //facebook login
    facebookLogin=()=>{
        window.open('http://localhost:8000/auth/facebook ','_self')
    }
    //google login
    googleLogin=()=>{
        window.open('http://localhost:8000/auth/google', '_self')
    }

    handleLoginSubmit(e){
        e.preventDefault()
        const userInfo={
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:8000/login', userInfo) //post userInfo
        .then(result=>{
            console.log(result)
            localStorage.setItem('user', JSON.stringify({
                token: 'Bearer '+ result.data.token, //store token, isAdmin and username in localstorage
                isAdmin : result.data.isAdmin,
                username: result.data.username
            }))
            //check if user is an admin and redirect them to either the user homepage or the admin homepage
            if (result.data.isAdmin){
                window.location = '/adminDisplay'
            } else {
                window.location = '/'
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer '+ result.data.token   //set default header
        })
        .catch(err=>alert('There was an error logging in. PLease fill in all fields or check connection '+err))

    }
    render(){
        return(
            <div className='login-page'>
                <div className='nav'>
                    <h2 className='nav-heading'>Royal<span>Events</span></h2>
                    <h6><Link to='/register' className='register-link'>Register</Link></h6>
                </div>
                <div className='login-form'>
                    <h3>Login</h3>
                    <Form >
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        onChange={this.handleLogin}
                        name='username'
                        type="type" 
                        placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        onChange={this.handleLogin}
                        name='password'
                        type="password" 
                        placeholder="Password" />
                    </Form.Group>
      
                    <Button id='login-btn' type="submit" onClick={this.handleLoginSubmit}>
                    Login
                    </Button>
                    <p>Or</p>

                    <div className="google-btn" onClick={()=>this.googleLogin()}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='Google Icon'/>
                        </div>
                        <p className="btn-text"><b>Login with google</b></p>
                    </div>
                    <br></br>
                    <div className='facebook-btn' onClick={()=>this.facebookLogin()}>
                        <div className='facebook-icon-wrapper'>
                            <img className='facebook-icon'src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png' alt='Facebook Logo'/>
                        </div>
                        <p className='facebook-btn-text'>Facebook Login</p>
                    </div>
                </Form>
            </div>
            </div>
        )
    }
}

export default Login