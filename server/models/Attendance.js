const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    checkIn: { type: String, required: true }, // Time of check-in
    checkOut: { type: String }, // Time of check-out
    location: { type: String } // Optional: Store Geo Coordinates
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
