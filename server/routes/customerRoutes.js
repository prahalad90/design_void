const express = require("express");
const router = express.Router();
const { getAllCustomer, addCustomer, getCustomerById, updateCustomer, deleteCustomer} = require("../models/Customer");


router.get("/", async (req, res) => {
  try {
    const customers = await getAllCustomer();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/",async (req, res) => {
  try {
    const { name, address, pincode, mobile, email} = req.body;
    const newCustomer = await addCustomer(name, address, pincode, mobile, email);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { name, address, pincode, mobile, email } = req.body;   
    const updateCustomer = await updateCustomer(req.params.id, name, address, pincode, mobile, email);
    if (!updateCustomer) return res.status(404).json({ error: "Customer not found" });
    res.json(updateCustomer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await deleteCustomer(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted successfully", customer: deleteCustomer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;