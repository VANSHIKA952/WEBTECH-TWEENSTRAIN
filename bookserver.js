const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri = "mongodb://localhost:27017/books";
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "book1.html"));
});
app.post("/login", (req, res) => {
 const query1 = req.body;
 const main_1 = async () => {
 MongoClient.connect(uri, async (err, client) => {
 if (err) throw err;
 const check = await client
 .db("books")
 .collection("bookdeatils")
 .findOne(query1);
 if (check == null) {
 await 
client.db("books").collection("bookdeatils").insertOne(query1);
 client.close();
 res.send(`
 <h1>Details of book inserted into the 
database : </h1>
 <h2> Book number : ${req.body.book_no} </h2>
 <h2> Book number : ${req.body.book_name} 
</h2>
 <h2> Book Price : ${req.body.book_price} 
</h2>
 <h2> Book author : ${req.body.book_auth} 
</h2>
 `);
 
 } else {
 res.send(`
 <h1>Data is already present in the database</h1>
 `);}});  }; main_1();
});
app.post("/login/update", (req, res) => {
 const query2 = {
 book_no: req.body.book_no
 };
 const update = {
 book_price: req.body.book_price,
 };
 const main2 = async () => {
 MongoClient.connect(uri, async (err, client) => {
 if (err) throw err;
 const check = await 
client.db("book").collection("details").findOne(query2);
 if (check == null) {
 res.send(`<h1>Data is not present in the 
database</h1>`);
 } 
 else {
 await 
client.db("books").collection("bookdeatils").updateOne(query2, {
 $set: update,
 });
 client.close();
 res.send(`
 <h1>Details of book updated </h1>
 <h2> Book number : ${req.body.book_no} </h2>
 <h2> Book Price : ${req.body.book_price} 
</h2>
 `);
 }
 });
 };
 main2();
});
app.get("/update", (req, res) => {
 res.sendFile(path.join(__dirname, "book2.html"));
});
app.listen(3001, () => {
 console.log("Listening to port 3001");
});