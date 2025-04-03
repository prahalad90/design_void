const express = require("express");
const router = express.Router();
const { getAllInvoice, getInvoiceByCustomer, getInvoiceById, addInvoice} = require("../models/Invoice");

router.get("/", async (req, res) => {
  try {
    const invoiceData = await getAllInvoice();
    res.json(invoiceData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
    try {
      const invoiceData = await getAllInvoice();
      res.json(invoiceData);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

router.post("/", async (req, res) => { 
    try{
        const { name, particular, amount } = req.body;
        console.log(name, particular, amount)
        const date = new Date().toLocaleTimeString()
        const newInvoice = addInvoice(name, amount, date, particular);
        res.status(201).json(newInvoice);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;