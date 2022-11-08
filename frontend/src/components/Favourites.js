import React, { Component } from "react";
import {FaTrashAlt} from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import {Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaPhoneAlt, FaEnvelope} from 'react-icons/fa';

class Favourites extends Component{
    constructor(props){
        super(props)
        const username = JSON.parse(localStorage.getItem('user'))['username']
        this.state={
            username:username,
            favourites: JSON.parse(localStorage.getItem(`${username}`)),
        }
        //console.log(this.state)   
    }

    removeFave=(id)=>{
        const {favourites} = this.state
        const removed =  favourites.filter(fave=>fave._id !==id) //filter the clicked event out

        localStorage.setItem(`${this.state.username}`, JSON.stringify(
            removed  //set new favourites to local storage   
        ))  

        this.setState({  //set state to the value in local storage
            favourites: JSON.parse(localStorage.getItem(`${this.state.username}`))
        })
        
    }

    logOut=()=>{
        localStorage.removeItem('user')
        window.location = '/login'
    }
    
    
    render(){
        const {favourites, username} = this.state

        console.log(favourites)
        return(
            <div className='favourites-page'>
            
             <div></div>:
                 <div className='nav'>
                    <Link to='/'><h2 className='nav-heading'>Royal<span>Events</span></h2></Link>
                    <div className='right-side-nav'>
                    <h6 className='user'>Hello {username}</h6>
                    <h6 className='log' onClick={()=>this.logOut()}>Log Out</h6>
                    </div>
                </div>
                <h3 className='fave-heading'>My Favourites</h3>       
                <div className='favourites'>  
                
                {favourites.map((favourite)=>
                    <Card className='card' style={{ width: '18rem' }} key={favourite._id}>
                        <Card.Body>
                            <Card.Title><h5>{favourite.name}</h5></Card.Title>
                            <Card.Text>
                                <p>Description: {favourite.description}
                                <br></br>
                                Date: {favourite.date}
                                <br></br>
                                Price: R{favourite.cost}</p>
                                
                            </Card.Text>
                            <Button onClick={()=>this.removeFave(favourite._id)}><FaTrashAlt/></Button>
                        </Card.Body>
                    </Card>)}
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

export default Favourites