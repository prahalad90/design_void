const express = require("express");
const router = express.Router();
const { getAllInvoice,getLastInvoiceNumber, addInvoice} = require("../models/Invoice");
const pool = require('../config/db');


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
        const { name, particular, items } = req.body;
        const date = new Date().toLocaleDateString()
        console.log(date)
        const lastInvoiceNumber = await getLastInvoiceNumber();
        console.log(lastInvoiceNumber)
        const newInvoiceNumber = lastInvoiceNumber + 1;
        
        for (let i = 0; i < items.length; i++) {
          const { description, quantity, price } = items[i];
          await addInvoice(newInvoiceNumber, name, particular, date, description, quantity, price);
        }
        console.log('saved')
        res.status(201).json({ message: "Invoice created", invoice: newInvoiceNumber });
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;