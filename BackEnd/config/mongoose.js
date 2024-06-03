const mongoose=require('mongoose');

const DBconnect=()=>{
    mongoose.connect('mongodb://localhost/EmpDB')
         .then(()=> console.log('DB is successfully connected'))
         .catch((err)=>console.log('error in DB connection',err))
}

module.exports=DBconnect;