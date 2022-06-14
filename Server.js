const express = require('express'),
	app = express(),
	db = require('quick.db'),
	server = require('http')
  .createServer(app)
  .listen(8080);

// Routers \\
const v2 = express.Router();

app.use("/v2", v2);

app.get('/', (req,res) => {
  res.send("API Online.");
});

// Get \\
v2.post("/users/get", (req,res) => {  
  if(!db.get(`Users.${req.query.id}`)) return res.send(false);
  
  var Name = db.get(`Users.${req.query.id}.Name`);
  
  res.send(true);
});

// Set \\
v2.post("/users/create", (req,res) => {
  db.set(`Users.${req.query.id}`, { Name: req.query.name });
  
  console.log(`${req.query.id}, ${req.query.name}`);
  
  res.send("User created.");
});
