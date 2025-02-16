const express = require('express')

const router = express.Router()
const db = require ('../db')
INSERT
// Create Patient
router.post('/', async (req, res) =>{

    try {
        const {last_name, first_name, date_of_birth, gender, phone, email, address} = req.body;
        const result = await db.query(
            ' INTO patients (last_name, first_name, date_of_birth, gender, phone, email, address) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING * ',
             [last_name, first_name, date_of_birth, gender, phone, email, address]);
             res.status(200).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({error : err.message})
    }
});


// Get Patients all
router.get('/', async (req, res)=> {
    try {
        const result = await db.query('SELECT * from patients ');
        res.status(201).json(result.rows);
    } catch (err) {
        res.status(500).json({error : err.message})
    }
});

// Get One patient
router.get('/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const result = await db.query('SELECT * FROM patients WHERE patient_id = $1', [id]);
        if(result.rows.length === 0){
            return res.status(404).json({error : 'User not Found'});
        }
        res.json(result.rows[0]);   
    } catch (err) {
        res.status(500).json({error : err.message})
    }
});

// Update patients
router.put('/:id',async (req, res) => {
    try {
        const {id} = req.params;
        const {last_name, first_name, date_of_birth, gender, phone, email, address} = req.body;
        const result = await db.query(
            'UPDATE patients set last_name =$1, first_name =$2, date_of_birth = $3, gender = $4, phone = $5, email = $6, address= $7 WHERE id =$8 RETURNING *', 
            [last_name, first_name, date_of_birth, gender, phone, email, address, id]);
        if(result.rows.length === 0){
            return res.status(404).json({error : "User no found ! "});
        }
    } catch (err) {
        res.status(500).json({error : err.message})
    }
    
});

router.delete('/:id', async ()=> {
    try {
        const {id} = req.params;
        const result  = await db.query('DELETE FROM patients WHERE patient_id=$1 ',[id] );

    } catch (err) {
        
    }
})








module.exports = router;