const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET;


//testing purposes
router.delete('/delete', async (req, res) => {
    try {
        await db.User.destroy({
            where: {}, // No condition means all records
            truncate: true, // This will reset the primary key counter as well
            cascade: true
        });
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        const user = await db.User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }

        // Check if username already exists
        const userWithUsername = await db.User.findOne({ where: { username: req.body.username }});
        if (userWithUsername) {
            return res.status(400).json({ username })
        }

       

        // Create a new user
        const newUser = await db.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
            
        });

        res.json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await db.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ email: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ password: 'Incorrect password' });
        }

        // User matched, create JWT payload
        const payload = {
            id: user.id,
            username: user.username
            // ... add other fields as necessary
        };

        // Sign the token
        jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token: 'Bearer ' + token });
        });
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/all-users', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get('/:id', passport.authenticate('jwt', { session: false }), getUserById);

function getUserById(req, res) {
     // Check if the user making the request is the same as the user being requested or if they are an admin
     if (req.user.id.toString() === req.params.id || req.user.role === 'admin') {
        db.User.findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Exclude sensitive information
                const { password, ...userWithoutPassword } = user.dataValues;
                res.json(userWithoutPassword);
            })
            .catch(err => res.status(500).json({ message: 'Server error', error: err }));
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
    }

}
  

// ... other user-related routes ...

module.exports = router;

