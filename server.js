
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require ('dotenv');
const users = require('./routes/api/users');
dotenv.config();
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());


// Connect to Mongo
mongoose.connect(process.env.DATABASE_ACCESS,
         { useNewUrlParser: true, useUnifiedTopology: true }
                    )
                    .then(() => console.log('DATABASE Connected'))
                     .catch(e => console.log('error db:', e))

// Use Routes
app.use('/api/users', users);

// Serve static assets if in production
if(process.env.DATABASE_ACCESS=== 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));