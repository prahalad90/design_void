import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceForm = ({ setShowForm }) => {
    // State for customer and invoice details
    const [formData, setFormData] = useState({
        name: "",  // Customer ID
        particular: "",
    });

    // State for line items
    const [lineItems, setLineItems] = useState([{ description: "", quantity: "", price: "" }]);

    // State for customer list
    const [customers, setCustomers] = useState([]);

    // Fetch customers on component mount
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/customer");
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    // Handle input change for customer details
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle line item input change
    const handleLineItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLineItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], [name]: value };
            return updatedItems;
        });
    };

    // Add a new line item
    const addNewLineItem = () => {
        setLineItems([...lineItems, { description: "", quantity: "", price: "" }]);
    };

    // Remove a line item
    const removeLineItem = (index: number) => {
        setLineItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const invoiceData = {
            customer: {
                id: formData.name,
                particular: formData.particular
            },
            items: lineItems
        };

        try {
            await axios.post("http://localhost:5000/api/invoice", invoiceData);
            alert("Invoice Saved successfully!");

            // Reset form
            setFormData({ name: "", particular: "" });
            setLineItems([{ description: "", quantity: "", price: "" }]);
            setShowForm(false);
        } catch (error: any) {
            console.error("Error adding invoice:", error.response?.data || error);
            alert("Failed to add invoice.");
        }
    };

    return (
        <div className="fixed flex justify-center items-center h-screen w-full top-0 left-0 z-100">
            <form className="w-[50%] lg:p-[50px] p-5 bg-blue-200 flex flex-col gap-4 relative" onSubmit={handleSubmit}>
                {/* Close Button */}
                <button onClick={() => setShowForm(false)} type="button" className="absolute right-[10px] top-[10px] bg-white rounded-full px-2 py-1 text-2xl">X</button>
                
                {/* Customer Details */}
                <h3 className="text-xl">Customer Details</h3>
                <hr />
                <select className="border outline-none rounded-[5px] p-3" name="name" value={formData.name} onChange={handleChange}>
                    <option value="">Select Customer</option>
                    {customers.map((cust: any) => (
                        <option key={cust.id} value={cust.id}>{cust.name}</option>
                    ))}
                </select>
                <input className="border outline-none rounded-[5px] p-3" type="text" placeholder="Particular" name="particular" value={formData.particular} onChange={handleChange} />
                
                {/* Item Details */}
                <div className="flex justify-between">
                    <h3 className="text-xl">Item Details</h3>
                    <button type="button" onClick={addNewLineItem} className="bg-green-500 text-white px-3 py-1 rounded">+ Add Item</button>
                </div>
                <hr />

                {/* Line Items */}
                {lineItems.map((lineItem, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input className="border outline-none flex-1 p-2 rounded" type="text" placeholder="Item" name="description" value={lineItem.description} onChange={(e) => handleLineItemChange(index, e)} />
                        <input className="border outline-none w-20 p-2 rounded" type="number" placeholder="Qty" name="quantity" value={lineItem.quantity} onChange={(e) => handleLineItemChange(index, e)} />
                        <input className="border outline-none w-24 p-2 rounded" type="number" placeholder="Price" name="price" value={lineItem.price} onChange={(e) => handleLineItemChange(index, e)} />
                        <button type="button" onClick={() => removeLineItem(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                    </div>
                ))}

                {/* Save Invoice Button */}
                <button type="submit" className="border outline-none bg-blue-900 text-white rounded-[5px] p-3 mt-3">Save Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceForm;
