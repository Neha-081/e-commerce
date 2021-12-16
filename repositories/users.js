const fs = require('fs')
const crypto=require('crypto');
const { timeStamp } = require('console');

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
async getOne(id){   //find user by particular id
  const records=await this.getAll();
  return records.find(record=>record.id===id);
}
async delete(id){
    const records=await this.getAll();
    const filterRecords=records.filter(record=>record.id!==id);
   await this.writeAall(filterRecords);
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
} 

const test=async()=>{
    const repo=new UsersRepository('users.json');
await repo.update('a2fc7ca5',{name:"maya"})
}
test();