const mongoose  = require('mongoose')

const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required: true
    }
})

const Event = mongoose.model('Event', EventSchema)
module.exports = Event