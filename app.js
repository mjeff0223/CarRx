const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const serviceProviderRoutes = require('./routes/serviceProviders');
const passport = require('passport');
require('dotenv').config();
require('./middlewares/googleAuth')



const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRoutes);
app.use('/serviceProviders', serviceProviderRoutes);
app.use(passport.initialize())
// ... other routes ...
require('./config/passport')(passport)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
