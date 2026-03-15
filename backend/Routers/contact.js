const express = require("express");
const router = express.Router();
const Contact = require("../Models/contact");


router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const newMessage = new Contact({ name, email, subject, message });
      // new Model(req.body).save()
    await newMessage().save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;


