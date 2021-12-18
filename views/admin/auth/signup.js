const layout=require('../layout')
const getError=(errors,prop)=>{
    //prop==='email' || 'password' || 'confirmPassword'
  try{      //errors is an array
      return errors.mapped()[prop].msg
  }catch(err){
      return '';
  }
};

module.exports=({req,errors })=>{
  return layout({content:`
  <div>
  Your id is: ${req.session.userId}
  <form method="POST">
  <input name="email" type="email" placeholder="email">
  ${getError(errors,'email')}
  <input name="password" type="password" placeholder="password">
  ${getError(errors,'password')}
  <input name="confirmPassword" type="password" placeholder="confirm password">
  ${getError(errors,'confirmPassword')}
  <button>Sign Up</button>
</form>
  </div>
  `
});
}