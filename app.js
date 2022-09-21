const path = require('path');
const express = require('express');

const uploadRouter = require('./src/routes/uploadRoute');

// Start express app
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/upload', uploadRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
// module.exports = app;
