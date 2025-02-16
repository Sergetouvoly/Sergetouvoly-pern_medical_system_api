// const express = require('express');
import express from 'express'
import usersRoute from "./routes/usersRoute.js"
import patientsRoute from "./routes/patientsRoute.js"

const app = express();
app.use(express.json());

const port = 3000;


app.get('/', (req, res) => {
    res.send('Welcome to the rest API! ');
    
});
app.use('/api/users',usersRoute );      
app.use('/api/patients',patientsRoute);

app.listen(port, ()=> {
    console.log(`server is running at http://localhost:${port}`);
});

// Kill all the node js running server
// taskkill /im node.exe /f

// class User {
//     constructor(last_name, first_name, phone) {
//       this.last_name = last_name;
//       this.first_name = first_name;
//       this.phone = phone;
//     }
//   }

//   user  = new User("Doe", "John", "1234567890");
