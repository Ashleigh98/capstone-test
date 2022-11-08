const Event = require('../models/event.model.js')

const create = (req, res)=>{  //create event
    const {name, description, date, cost} = req.body
    const event = new Event({
        name,
        description,
        date,
        cost
    })

    event.save(function(err,data){  //save
        if (err) {
            console.log(err);
            res.send({ message: "An error occurred while creating an event." });
        } else {
            res.json(data);
        }
    })
    
}

const display = (req,res)=>{  //display all the events in the database
    Event.find(function(err,data){
        if(err){
            throw new Error('Error while fetching data')
        } else {
            res.json(data)
          
        }
    })
}

const deleteOne = (req, res)=>{  //delete event using the id
    const id = req.params.id

    Event.findByIdAndRemove({_id:id}, function(err){
        if(err){
            res.send('Error has occurred. Could not remove event. '+err)
        } else{
        res.send('Event removed successfully')
        }
    })
}

const updateEvent = (req, res)=>{  //update the event using the id
    const { _id, name, description, date, cost} = req.body;
    Event.findByIdAndUpdate(_id, { name: name, description: description, date: date, cost: cost }, { new: true }, function(err, doc) {
        if (err) {
            console.log("Data update unsuccessful!");
            res.send("Error: Data not updated. " + err);
        }
        res.send(doc); //send the updated data to see change 
    });
}

module.exports = {
    create,
    display,
    deleteOne,
    updateEvent
}