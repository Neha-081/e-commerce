const fs = require('fs')
const crypto=require('crypto');
const util=require('util')
const Repository=require('./repository')

const scrypt=util.promisify(crypto.scrypt)  //returns a promise

class UsersRepository extends Repository{
 //compare passwords
 async comparePasswords(saved,supplied){
    //saved-> pw saved in our database -> 'hashed.salt'
    //supplied- pw given to us by user trying to sigin
    const [hashed,salt]=saved.split('.')    //split into hashed pw and salt
    const hashedSuppliedBuf=await scrypt(supplied,salt,64)
    //comparison
    return hashed===hashedSuppliedBuf.toString('hex');   //hashsupplied is a buffer so need to convert
    
    
    }


    //constructor functions cannot be async in nature/js
    async create(attrs){        //object of data-{email:'',password:''}
        attrs.id=this.randomId();
       
        //generating hash password
         const salt=crypto.randomBytes(8).toString('hex');
        const buf=await scrypt(attrs.password,salt,64)
           const records=await this.getAll()
        const record={
           
               ...attrs,     //create new object with updating new properties along with existing
               password:`${buf.toString('hex')}.${salt}`
           
        }
           records.push(record);
         //write the updated 'records' array back to this.filename
         await this.writeAll(records);
         
         return record;  //return record of hash and salted password
       }
} 

module.exports=new UsersRepository('users.json');