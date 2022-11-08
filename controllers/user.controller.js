const User = require('../models/user.model.js')
const secret_key = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = (req,res)=>{
    bcrypt.hash(req.body.password, 10) //hash the password
    .then((hashedPassword)=>{
        const newUser =  new User({  //create user from the input from the body
            username: req.body.username,
            password: hashedPassword
        });
        newUser.save() //save new user to the database
        .then((result)=>{
            res.status(201).send(result)
        })
        .catch((error)=>{
            res.send(error)
        })  
    })   
}

const login = (req,res)=>{
    User.findOne({username: req.body.username})
    .then(user =>{
        console.log(user)
        bcrypt.compare(req.body.password, user.password) //check if the password matches
            .then(passwordCheck =>{
            if(!passwordCheck){
             res.status(400).send("Incorrect password")
            } else {
                //I used the same method from the example to generate a token but inserted here so that it generates once the passwords match
                const payload={  
                    'name': user.username, 
                    'id': user.id
                }
                const token = jwt.sign(JSON.stringify(payload), `${secret_key}`,
                {algorithm: 'HS256'})
                
                res.status(202).send({
                    'id':user.id,
                    'username': user.username,
                    'token':token,
                    'isAdmin': user.isAdmin
                })  
            }
        })
    })
    .catch(error=>{
        res.status(404).send('Error ' + error)
    });
}

module.exports = {
    register,
    login
}