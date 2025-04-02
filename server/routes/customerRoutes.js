const express = require("express");
const router = express.Router();
const { getAllCustomer, addCustomer, getCustomerById, updateCustomer, deleteCustomer} = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const customer = await getAllCustomer();
    console.log('no data')
    res.json(customer);
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
  console.log('here')
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
    const updateCustomerData = await updateCustomer(req.params.id, name, address, pincode, mobile, email);
    if (!updateCustomerData) return res.status(404).json({ error: "Customer not found" });
    res.json(updateCustomerData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedcustomerdata = await deleteCustomer(req.params.id);
    if (!deletedcustomerdata) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted successfully", customer: deletedcustomerdata });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
