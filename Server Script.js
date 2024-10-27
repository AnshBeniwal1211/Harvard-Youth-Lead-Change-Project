const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/organic-food-supply', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for tickets
const orderSchema = new mongoose.Schema({
    food: String,
    quantity: Number,
});

const ticketSchema = new mongoose.Schema({
    name: String,
    email: String,
    orderItems: [orderSchema],
    date: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle ticket submission
app.post('/api/tickets', (req, res) => {
    const { name, email, orderItems } = req.body;

    console.log('Received request:', req.body); // Log the incoming request

    const newTicket = new Ticket({ name, email, orderItems });

    newTicket.save()
        .then(() => {
            res.status(200).send({ message: 'Ticket saved successfully' });
            // Notify the company about the new request (implementation depends on the notification method)
            // Example: send an email or integrate with a messaging service
        })
        .catch((err) => {
            console.error('Error saving ticket:', err);
            res.status(500).send({ message: 'Error saving ticket' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});