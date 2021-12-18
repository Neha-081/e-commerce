const layout=require('../layout');
const {getError}=require('../../helpers')

module.exports=({exports})=>{
    return layout({
        content:`
        <form method='POST'>
        <input placeholder='title' name='title'/>
        <input placeholdeer='price' name='price'/>
        <input type='file' name='image'/>
        <button>Submit</button>
        </form>
        `
    })
};