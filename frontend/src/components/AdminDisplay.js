import axios from 'axios'
import React,{Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import {FaTrashAlt, FaEdit, FaPhoneAlt, FaEnvelope} from 'react-icons/fa'


class AdminDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            events: [],
            name: '',
            description: '',
            date: '',
            cost: ''
        }  
        this.handleEditInput = this.handleEditInput.bind(this)
    }
    handleEditInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    editEvent=(id)=>{ //prefill update form
            const {events} = this.state
            const eventInfo = events.find(event => {return event._id === id}) //find the event that was clicked on using its id
        
            this.setState({  //set state to prefill the form
                name: eventInfo.name,
                description: eventInfo.description,
                date: eventInfo.date,
                cost: eventInfo.cost,
                _id: eventInfo._id
            })
    }

    handleUpdate=(id)=>{
        const eventInfo = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            cost: this.state.cost,
            _id: this.state._id
        }
        const {_id} = this.state  //get the id for the specific data needed to be changed

        axios.put(`http://localhost:8000/update/${_id}`, eventInfo) //make put request
        .then((res)=> console.log(res))
        .catch(error => console.log('Error:', error));
        this.fetchEvents() //call function

    }

    removeEvent=(id)=>{  //delete event
        axios.delete(`http://localhost:8000/delete/${id}`)
        .then(res=> {
            this.fetchEvents()
        })
        .catch(error=>console.log(error))
    }

    //get events from database which is called after each axios method so that the change is shown
    fetchEvents(){  
        axios.get('http://localhost:8000/displayAll')
        .then(res=>{
            this.setState({
                events: res.data
            })
            console.log(res)
        })
        .catch(err=>console.log('Error retrieving events'+ err))
    }

    componentDidMount(){
        this.fetchEvents()
    }

    logOut=()=>{
        localStorage.removeItem('user')
        window.location = '/login'
    }

    render(){
        const {events, name, description, cost, date} = this.state
        return(
            <div className='admin-page'>
                <div className='nav'>
                    <h2 className='nav-heading'>Royal<span>Events</span></h2>
                    <p id='post-link'><Link to='/add' className='add-link'>Post New Event</Link></p>

                    <div className='right-side-nav'>
                    <h6 className='user'>Hello Admin</h6>
                    <h6 className='log' onClick={()=>this.logOut()}>Log Out</h6>
                    </div>
                </div>
                
                <div className='admin-event-display'> 
                <h3 className='upcoming-heading'>Upcoming Events</h3>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Cost</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.map(event=>
                        <tr key={event._id}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.cost}</td>
                            <td><FaEdit id='edit-icon' onClick={()=>this.editEvent(event._id)}/></td>
                            <td><FaTrashAlt id='trash-icon' onClick={()=>this.removeEvent(event._id)}/></td>
                         </tr>)}
        
                    </tbody>
                </Table>
                </div>

                <div className='update-form'>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <h5>Edit Event</h5>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        onChange={this.handleEditInput}
                        name='name'
                        type="text" 
                        placeholder="Edit Name" 
                        value={name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        onChange={this.handleEditInput}
                        name='description'
                        type="text" 
                        placeholder="Edit Description"
                        value={description} />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        onChange={this.handleEditInput}
                        name='date'
                        type="date" 
                        placeholder="Edit Date"
                        value={date} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCost">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control 
                        onChange={this.handleEditInput}
                        name='cost'
                        type="text" 
                        placeholder="Edit Price" 
                        value={cost}/>
                    </Form.Group>
      
                    <Button variant="primary" type="submit" onClick={this.handleUpdate}>
                    Update
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

export default AdminDisplay;