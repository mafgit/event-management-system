const db = require("../db");

const get_tickets = (req, res) => {
    const eventId = req.query.eventId; // Assuming you're passing eventId as a query parameter

    const query = "SELECT * FROM tickets WHERE event_id = ?";
    db.query(query, [eventId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching tickets" });
        }
        res.status(200).json(result);
    });
};

const get_ticket = (req, res) => {
    const ticketId = req.params.id; // Assuming you're passing the ticket ID as a URL parameter

    const query = "SELECT * FROM tickets WHERE ticket_id = ?";
    db.query(query, [ticketId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching ticket" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(result[0]);
    });
};

const create_ticket = (req, res) => {
    const { eventId, userId, ticketType, price } = req.body; // Assuming ticket data is sent in the request body

    const query = "INSERT INTO tickets (event_id, user_id, ticket_type, price) VALUES (?, ?, ?, ?)";
    db.query(query, [eventId, userId, ticketType, price], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error creating ticket" });
        }
        res.status(201).json({ message: "Ticket created successfully!" });
    });
};

const update_ticket = (req, res) => {
    const ticketId = req.params.id; // Assuming you're passing the ticket ID as a URL parameter
    const { ticketType, price } = req.body; // Assuming updated ticket data is sent in the request body

    const query = "UPDATE tickets SET ticket_type = ?, price = ? WHERE ticket_id = ?";
    db.query(query, [ticketType, price, ticketId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating ticket" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket updated successfully!" });
    });
};

const delete_ticket = (req, res) => {
    const ticketId = req.params.id; // Assuming you're passing the ticket ID as a URL parameter

    const query = "DELETE FROM tickets WHERE ticket_id = ?";
    db.query(query, [ticketId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting ticket" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully!" });
    });
};

module.exports = {
    get_tickets,
    get_ticket,
    create_ticket,
    update_ticket,
    delete_ticket,
}
