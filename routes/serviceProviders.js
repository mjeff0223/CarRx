const express = require('express');
const router = express.Router();




function ensureAdminOrServiceProvider(req, res, next) {
    if (req.user && req.user.role === 'admin' || req.user.role === 'serviceProvider') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied' });
}

router.post('/registerSP', ensureAdminOrServiceProvider, async (req, res) => {
    try {
        // Check if email already exists
        const existingProvider = await db.ServiceProvider.findOne({ where: { email: req.body.email } });
        if (existingProvider) {
            return res.status(400).json({ email: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new service provider
        const serviceProvider = await db.ServiceProvider.create({
            company_name: req.body.company_name,
            email: req.body.email,
            password: hashedPassword,
            role: 'serviceProvider'
            
        });

        res.status(201).json({ message: 'Service Provider created successfully', serviceProvider });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const serviceProvider = await db.ServiceProvider.findByPk(req.params.id);
        if (!serviceProvider || serviceProvider.role !== 'serviceProvider') {
            return res.status(403).json({ message: 'Access denied' });
        }
          // If the email field is provided in the request body, update the email
          if (req.body.email) {
            serviceProvider.email = req.body.email;
        }

        // If the password field is provided in the request body, hash and update the password
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            serviceProvider.password = hashedPassword;
        }

        // Save the updated details
        await serviceProvider.save();

        // Return a success response
        res.json({ message: 'Service Provider details updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }

});

router.delete('/delete/:id', async (req, res) => {
    try {
        const serviceProvider = await db.ServiceProvider.findByPk(req.params.id);
        if (!serviceProvider || serviceProvider.role !== 'serviceProvider') {
            return res.status(403).json({ message: 'Access denied' });
        }
        await serviceProvider.destroy();
        res.status(200).json({ message: 'Service Provider deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/companies', async (req, res) => {
    try {
        const serviceProviders = await db.ServiceProvider.findAll({
            attributes: ['id', 'company_name'], // Only fetch id and company_name
            include: [{
                model: db.Review,
                attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'avgRating']]
            }]
        });

        res.json(serviceProviders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/companies/:id', async (req, res) => {
    try {
        const serviceProvider = await db.ServiceProvider.findByPk(req.params.id, {
            attributes: ['id', 'company_name'], // Only fetch id and company_name
            include: [{
                model: db.Review,
                attributes: [[db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'avgRating']]
            }]
        });

        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }

        res.json(serviceProvider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

});


module.exports = router;
