const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/memoryGameResults', require('./routes/memoryGameResults.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
}

const PORT = process.env.PORT || config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App was started on port ${PORT}!`));
    } catch(e) {
        console.log("Server Error", e.message);
            process.exit(1)
    }
}

start()
