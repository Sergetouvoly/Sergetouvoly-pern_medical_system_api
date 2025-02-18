import usersRoute from "./routes/usersRoute.js"
import patientsRoute from "./routes/patientsRoute.js"
import doctorsRoute from "./routes/doctorsRoute.js"
import appointmentsRoute from "./routes/appointmentsRoute.js"
import medicalRecordsRoute from "./routes/medicalRecordRoutes.js"
import prescriptionsRoute from "./routes/prescriptionsRoutes.js"

import express from 'express'
const app = express();
app.use(express.json());

const port = 3000;


app.get('/', (req, res) => {
    res.send('Welcome to the rest API! ');
    
});
app.use('/api',usersRoute );      
app.use('/api',patientsRoute);
app.use('/api',doctorsRoute);
app.use('/api',appointmentsRoute);
app.use('/api',medicalRecordsRoute);
app.use('/api',prescriptionsRoute);

app.listen(port, ()=> {
    console.log(`server is running at http://localhost:${port}`);
});


