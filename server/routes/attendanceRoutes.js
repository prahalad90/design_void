const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getUserById, } = require("../models/User");
const { addAttendance, getAttendanceByUser, checkUserAttendanceToday, updateAttendance } = require("../models/Attendance");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { ssim } = require('ssim.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function compareImages(uploadedBuffer, storedImageBuffer) {
    try {

        const uploadedResized = await sharp(uploadedBuffer)
            .resize(200, 200)
            .grayscale()
            .raw()
            .toBuffer({ resolveWithObject: true });

        const storedResized = await sharp(storedImageBuffer)
            .resize(200, 200)
            .grayscale()
            .raw()
            .toBuffer({ resolveWithObject: true });

        if (
            uploadedResized.info.width !== storedResized.info.width ||
            uploadedResized.info.height !== storedResized.info.height
        ) {
            console.error("Image dimensions do not match");
            return false;
        }

        // 🔹 Compute SSIM
        const ssimValue = ssim(
            {
                data: uploadedResized.data,
                width: uploadedResized.info.width,
                height: uploadedResized.info.height,
            },
            {
                data: storedResized.data,
                width: storedResized.info.width,
                height: storedResized.info.height,
            }
        ).mssim;

        return ssimValue > 0.35;

    } catch (error) {
        console.error("Error comparing images:", error);
        return false;
    }
}

router.post("/", upload.single("image"), async (req, res) => {
    const { id } = req.body;

    if (!req.file || !id) {
        return res.status(400).json({ message: "Missing image or user ID" });
    }

    try {
        const result = await getUserById(id);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        let storedImageBuffer;

        if (Buffer.isBuffer(result.image)) {
            storedImageBuffer = result.image;
        } else {
            const storedImagePath = path.join(__dirname, "../", result.image);
            if (!fs.existsSync(storedImagePath)) {
                return res.status(404).json({ message: "Profile image file not found" });
            }
            storedImageBuffer = fs.readFileSync(storedImagePath);
        }

        const isMatch = await compareImages(req.file.buffer, storedImageBuffer);
        if (isMatch) {
            console.log('Face match')
            const isPunch = await checkUserAttendanceToday(id);
            console.log(isPunch)
            if (isPunch.status == "Punch Out") {
                return res.status(200).json({ message: "You have already marked your attendance." });
            } else if (isPunch.status == "Punch In") {
                const punchOut = await updateAttendance(id);
                if (!punchOut || punchOut.length === 0) {
                    return res.status(404).json({ message: "No attendance records found" });
                }
                else{
                    console.log('updated')
                    return res.json({ message: "Image matches user profile, attendance updated", success: true });
                }
            } else{
                const attdata = await addAttendance(id);
                if (!attdata || attdata.length === 0) {
                    return res.status(404).json({ message: "No attendance records found" });
                }
                else {
                    return res.json({ message: "Image matches user profile, attendance added", success: true });
                }
            }

        } else {
            return res.json({ message: "Image does not match", success: false });
        }
    } catch (error) {
        console.error("Error processing image:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



router.get('/', async (req, res) => {
    const id = req.query.id;
    try {
        const attdata = await getAttendanceByUser(id);
        if (!attdata || attdata.length === 0) {
            return res.status(404).json({ message: "No attendance records found" });
        }
        console.log(attdata)
        res.json(attdata);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;