const mongoose=require('mongoose');

const EmpSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    department:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const Employee=mongoose.model('Employee',EmpSchema);
module.exports=Employee;