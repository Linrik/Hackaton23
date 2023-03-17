// laget middelware som sjekker rollene
module.exports.isUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        next()
    } else{
        res.status(401).json({msg:"du må være logget inn for denne handlingen"})
    }
}

module.exports.isEditor = (req, res, next) => {
    if(this.isUser && req.user.editor){
        next()
    } else{
        res.status(401).json({msg:"du må være editor for denne handlingen"})
    }
}
