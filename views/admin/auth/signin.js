const layout=require('../layout')

module.exports=()=>{
    return layout({content: `
    <div>
    <form method="POST">
    <input name="email" type="email" placeholder="email">
    <input name="password" type="password" placeholder="password">
    <button>Sign In</button>
    </form>
    </div>
    `
})
}