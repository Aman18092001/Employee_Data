const express=require('express');
const app=express();
const port=6500;
const database=require('./config/mongoose');
const Employee=require('./Model/EmpModel');
const cors=require('cors');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/data',async(req,res)=>{
    try{
        const {name,salary,department}=req.body;
        const newEmployee=new Employee({name,salary,department})
        await newEmployee.save();
        res.send(newEmployee);
        console.log('new Employee added',newEmployee);
    }catch(err){
        console.log('error in new Employee Addition',err)
        res.status(400).send('error in new Employee Addition',err);
    }
})

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error('Error fetching employees', err);
        res.status(500).send('Error fetching employees');
    }
});

app.listen(port,(err)=>{
    if(err){
        console.log('error in server',err);
    }
    database();
    console.log('server is running on ',port);
})