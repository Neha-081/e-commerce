const {validationResult}=require('express-validator');

module.exports={
    handleErrors(templateFunc,dataCb){
      return async(req,res,next)=>{
        const errors=validationResult(req);
        
        if(!errors.isEmpty()){
          let data={};
          if(dataCb){
            data= await dataCb(req)
          }
            return res.send(templateFunc({errors,...data}))   //if data wii not update then it remains as empty {}
        }
        next();  //everything i ok ,call the next middleware or envoke our actual route handler 
       //only when there is no errors  
    }  
    },
    requireAuth(req,res,next){
      if(!req.session.userId){
        return res.redirect('/signin')
      }
      next();
    }
}