const jwt  = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY

const verifyToken =  (req, res,next)=>{  //verify user using the token
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try{
        const user = jwt.verify(token, `${secret_key}`)
        req.user = user
    } catch(err) {
        res.status(401).json({err: new Error('Not authorized')})
    }
    next()
}

/*YouTube channel Chaoos Charles 'Adding An Admin User':  https://www.youtube.com/watch?v=Xg-03VInFtw
middleware to check if a user is admin or not */
const isAdmin = (req, res, next)=>{
    verifyToken(req,res ,()=>{
        if(req.body.isAdmin = true){
            next();
        } else {
            res.status(403).send('Not authorised. You need to be an adminstrator to access this!')
        }
    })
}

module.exports={
    verifyToken,
    isAdmin
}