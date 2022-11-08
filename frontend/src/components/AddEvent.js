import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { FaPhoneAlt, FaEnvelope} from 'react-icons/fa'

class AddEvent extends Component{
    constructor(props){
        super(props)
        this.state={
            name: '',
            description: '',
            date: '',
            cost: ''
        }
        this.handleCreate = this.handleCreate.bind(this)
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    }

    handleCreate(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCreateSubmit(e){
        e.preventDefault()
        const event ={
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            cost: this.state.cost
        }

        //post new event to database if you are an admin
        axios.post('http://localhost:8000/create', event)
        .then(result=>{
              this.setState({
                name: '',
                description: '',
                date: '',
                cost: ''
              })
              window.location = '/adminDisplay' //redirect to admin home page after event is added
        })
        .catch(err=>console.log('Error while postin event'+ err))
    }

    logOut=()=>{ //remove user from localstorage to log out and redirect back to login page
        localStorage.removeItem('user')
        window.location = '/login'
    }

    render(){
        return(
            <div className='create-page'>
                <div className='nav'>
                    <Link to='/adminDisplay'><h2 className='nav-heading'>Royal<span>Events</span></h2></Link>
                    <div className='right-side-nav'>
                    <h6 className='user'>Hello Admin</h6>
                    <h6 className='log' onClick={()=>this.logOut()}>Log Out</h6>
                    </div>
                </div>
                <div className='create-form'>
                    <h3>Add an Event</h3>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        onChange={this.handleCreate}
                        name='name'
                        type="type" 
                        placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        onChange={this.handleCreate}
                        name='description'
                        type="description" 
                        placeholder="description" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        onChange={this.handleCreate}
                        name='date'
                        type="date" 
                        placeholder="Add date" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCost">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control 
                        onChange={this.handleCreate}
                        name='cost'
                        type="text" 
                        placeholder="Add price" />
                    </Form.Group>
      
                    <Button variant="primary" type="submit" onClick={this.handleCreateSubmit}>
                    Post Event
                    </Button>
                </Form>
                </div>

                <footer>
                    <hr className='line-break'></hr>
                    <h5>Contact Us</h5>
                    <div className='contact-information'>
                        <p><FaPhoneAlt/> 021 671 2345</p>
                        <p><FaEnvelope/> royal@gmail.com</p>

                    </div>
                </footer>
            </div>
        )
    }
}

export default AddEvent;