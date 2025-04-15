const express = require("express");
const router = express.Router();
const {getAllEntry,getEntryByInvoice } = require("../models/Account");

router.get("/", async (req, res) => {
    try {
      const data = await getAllEntry();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

router.get("/:id", async(req,res)=>{
    try {
        const data = await getEntryByInvoice(req.params.id);
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: "Server error" });
      }
})


module.exports = router;