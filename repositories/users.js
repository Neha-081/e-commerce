const fs = require('fs')
const crypto=require('crypto')

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
async create(attrs){        //object of data
 attrs.id=this.randomId();
    const records=await this.getAll()
  records.push(attrs);
  //write the updated 'records' array back to this.filename
  await this.writeAall(records)
}
async writeAall(records){
    await fs.promises.writeFile(this.filename,JSON.stringify(records,null,2)) //third arg is the no of lines to diaplay is in users.json

}
randomId(){
    return crypto.randomBytes(4).toString('hex')

}
} 

const test=async()=>{
    const repo=new UsersRepository('users.json');
await repo.create({email:'neha@gmail.com',password:'neha'})
    const users= await repo.getAll();
console.log(users);
}
test();