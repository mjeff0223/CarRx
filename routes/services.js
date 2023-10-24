const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport')

router.post('/services', async (req, res) => {
    // Check if the user is logged in and has a role of a service provider
    if (!req.user || req.user.role !== 'serviceProvider') {
        return res.status(401).send('Unauthorized: You need to be logged in as a service provider');
    }

    try {
        const service = await db.Service.create({
            service_name: req.body.service_name,
            description: req.body.description,
            price: req.body.price,
            duration: req.body.duration,
            providerId: req.body.providerId
            
        });
        res.status(201).json(service)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})

    }
});

router.delete('/services/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await db.Service.findByPk(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // If you want to check if the logged-in user is the owner of the service, you can do so here
        // if (req.user.id !== service.providerId) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        await service.destroy();
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
