module.exports={
    getError(errors,prop){   //prop==='email' || 'password' || 'confirmPassword'
        try{
return errors.mapped()[prop].msg;     //errors is an array
        }catch(err){
return "";
        }
    }
}