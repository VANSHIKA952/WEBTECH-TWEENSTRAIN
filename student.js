const express = require("express");
const app = express();
const path = require("path");
const {MongoClient} = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const uri = "mongodb://localhost:27017/students"
app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname,"student1.html"));
})
app.post("/login",(req,res)=>{
 const query1 = req.body;
 const main_1 = async () => {
 MongoClient.connect(uri, async (err, client) => {
 if (err) throw err;
 const check = await 
client.db("students").collection("details").findOne(query1);
 if (check == null) {
 await 
client.db("students").collection("details").insertOne(query1);
 client.close();
 res.send(`
 <h1>Details of the student </h1>
 <h2> student name : ${req.body.name} </h2>
 <h2> student date of birth : ${req.body.dob} 
</h2>
 <h2> student qualification : 
${req.body.qual} </h2>
 <h2> student nationality : ${req.body.nat} 
</h2>
 `);
 
 } else {
 res.send(`
 <h1>Data is already present in the database</h1>
 `);
 
 }
 });
 };
 main_1();
})
app.listen(4001,()=>{
 console.log("Listening to port 4001");
})