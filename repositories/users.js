const fs = require('fs')
const crypto=require('crypto');
const util=require('util')

const scrypt=util.promisify(crypto.scrypt)  //returns a promise

class UsersRepository{
    //constructor functions cannot be async in nature/js
    constructor(filename){
       if(!filename){
           throw new Error('Creating a respository requires a filename');

       }
       this.filename=filename;
       try{
       fs.accessSync(this.filename)
       }catch(err){
         fs.writeFileSync(this.filename,'[]')
       }
    }
async getAll(){
    //open the file called this.filename
     return JSON.parse(
     await fs.promises.readFile(this.filename,{
        encoding:'utf8'
    })
    );
}
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
  await this.writeAall(records);
  
  return record;  //return record of hash and salted password
}

//compare passwords
async comparePasswords(saved,supplied){
//saved-> pw saved in our database -> 'hashed.salt'
//supplied- pw given to us by user trying to sigin
const [hashed,salt]=saved.split('.')    //split into hashed pw and salt
const hashedSuppliedBuf=await scrypt(supplied,salt,64)
//comparison
return hashed===hashedSuppliedBuf.toString('hex');   //hashsupplied is a buffer so need to convert


}

async writeAall(records){
    await fs.promises.writeFile(this.filename,JSON.stringify(records,null,2)) //third arg is the no of lines to diaplay is in users.json

}
randomId(){
    return crypto.randomBytes(4).toString('hex')

}
async getOne(id){   //find user by particular id
  const records=await this.getAll();
  return records.find(record=>record.id===id);
}
async delete(id){
    const records=await this.getAll();
    const filterRecords=records.filter(record=>record.id!==id);
   await this.writeAll(filterRecords);
}
async update(id,attrs){
    const records=await this.getAll();
    const record = records.find(record=>record.id===id);
    if(!record){
        throw new Error(`Record with id ${id} not found`)
    }

    Object.assign(record,attrs)  //take all key value pairs from attrs and add them in record with existing keyvalue of that id
await this.writeAall(records)
}
async getOneBy(filters){
  const records=await this.getAll();
  for(let record of records){  //for of-iterating thorugh array
      let found=true;

      for(let key in filters){   //for in-iterating through object
     if(record[key]!==filters[key]){
         found=false;
     }
    }
    if(found){
        return record;
    }
  }
}
} 

module.exports=new UsersRepository('users.json');