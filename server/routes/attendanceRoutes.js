const express = require("express");
const router = express.Router();
const { addAttendance, getAttendanceByUser,updateAttendance } = require('../models/Attendance')

router.post("/", async (req, res) => {
    try {
        const { userId, checkIn, checkOut = null, status = 'present', workingHours = '0 hours' } = req.body
        const newPunchIN = await addAttendance(userId, checkIn, checkOut = null, status = 'present', workingHours = '0 hours');
        res.status(201).json(newPunchIN)
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
