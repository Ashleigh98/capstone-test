import React,{Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope} from 'react-icons/fa';
import theaterFaces from '../images/drama.jpg';
import {Link} from 'react-router-dom'

// theatre image https://www.google.com/url?sa=i&url=https%3A%2F%2Fnewwritingcumbria.org.uk%2Fdrama&psig=AOvVaw2i56hDMaZUlLKfFrwAEI7U&ust=1665753635922000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNi934Wm3foCFQAAAAAdAAAAABAI

class UserDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            events:[],
            username: JSON.parse(localStorage.getItem('user'))['username'] ,
            favourites: []
        }
        this.addInterested = this.addInterested.bind(this)
        localStorage.setItem(`${this.state.username}`, JSON.stringify(this.state.favourites))

        if(!localStorage.getItem('user')){
            window.location = '/login'
        }
    }

    fetchEvents(){ //display all the events in the database

        axios.get('http://localhost:8000/displayAll', {
            headers: {'Authorization': JSON.parse(localStorage.getItem("user"))['token']} //get token from local storage
        })
        .then(res=>{
            this.setState({
                events: res.data,
                //username: JSON.parse(localStorage.getItem('user'))['username'] ,//get username from local storage
                favourites: JSON.parse(localStorage.getItem(`${this.state.username}`)) //set favourites here otherwise it will cause an error if there is nothing in the localstorage when navigating to the favourites page
            })
        })
        .catch(err=>console.log('Error displaying content. PLease check your internet connection ' + err))
    }

    componentDidMount(){
        this.fetchEvents()

    }

    logOut=()=>{
        localStorage.removeItem('user')
        window.location = '/login'
    }

    addInterested(id){
        const {events} = this.state
        const fave = events.find((event)=>event._id === id); //find the event thats wanted
        
        this.state.favourites.push(fave) //push event into favourites array
        //set localstorage with username and the array
        localStorage.setItem(`${this.state.username}`, JSON.stringify(this.state.favourites))  

        this.setState({
            favourites: JSON.parse(localStorage.getItem(`${this.state.username}`)) //set state to data from local storage
        })
    }

    render(){
        const {events, username} = this.state
        
        return(
            <div className='user-display-page'>
                <div className='nav'>
                    <h2 className='nav-heading'>Royal<span>Events</span></h2>
                    <p id='fave-link'><Link to='/favourites' className='fave-link'>My Favourites</Link></p>
                    <div className='right-side-nav'>
                        <h6 className='user'>Hello {username}</h6>
                        <h6 className='log' onClick={()=>this.logOut()}>Log Out</h6>
                    </div>
                </div>
                
                <div className='user-dashboard'>
                <div id='image-div'>
                    <img src={theaterFaces} alt='Theatre faces' width='200px' height='150px' id='image'/>
                    <h3 className='upcoming-heading'>Upcoming Events</h3>
                </div>
                    <div id='event-display'>
                        <br/>
                    {events.map((event)=>
                    <Card className='card' style={{ width: '18rem' }} key={event._id}>
                        <Card.Body>
                            <Card.Title><h5>{event.name}</h5></Card.Title>
                            <Card.Text>
                                Description: {event.description}
                                <br/>
                                Date: {event.date}
                                <br/>
                                Price: R{event.cost}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>this.addInterested(event._id)}>I'm interested</Button>
                        </Card.Body>
                    </Card>)}
                    </div>
                    
                    </div>

                
               
                
                <footer>
                    <hr className='line-break'/>
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

export default UserDisplay;
