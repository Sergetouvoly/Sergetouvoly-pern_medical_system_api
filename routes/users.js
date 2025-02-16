// const express  = require('express')
import  {createUsers, getUserByPhone } from '../crud/users.js';

import express from 'express'
import db from '../db.js'
const router = express.Router()


//  Create a User
router.post('/', async (req, res)=> {
    try {
        const {last_name,first_name, phone } = req.body;
        //  Verification 
        // YUP for type checking
        // WindSurf
        
        if (getUserByPhone(phone)) {
            return res.status(400).json({error : "User's phone already exist try a new one"})
        }
        const result  = await createUsers(last_name,first_name, phone);
        res.status(201).json(result.rows[0]);
    } catch(err) {
        console.log(err.message)
        res.status(500).json({error : "Une erreur s'est produite "})
    }
});


// Get all users
router.get('/', async (req, res) => {

    try{
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows)
    } catch (err) {
        res.status(500).send({error : err.message})
    }
});

// Get one User
router.get('/:id', async (req,res) => {
    try { 
        const { id } = req.params;
        const result = await db.query(
            'SELECT * FROM users WHERE id = $1',
             [id]);
        if(result.rows.length === 0){
            return res.status(404).json({error: 'User not found'})
        }
        res.json(result.rows[0]);
    } catch (err){
        res.status(500).json({error : err.message})
    }
});



// Update new User
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { last_name, first_name, phone } = req.body;
        
        const result = await db.query(
            'UPDATE users SET last_name = $1, first_name = $2, phone = $3 WHERE id = $4 RETURNING *',
            [last_name, first_name, phone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  Delete a user

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'DELETE FROM users WHERE id = $1 RETURNING *', 
            [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router
// module.exports = router