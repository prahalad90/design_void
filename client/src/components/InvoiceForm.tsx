import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceForm = ({ setShowForm }) => {
    
    const [lineItems, setLineItems] = useState([{ description: "", quantity: "", price: "" }]);

    const [formData, setFormData] = useState({
        name: "",
        amount: 0,
        particular: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    const handleLineItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedItems = [...lineItems];
        updatedItems[index][name] = value;
        setLineItems(updatedItems);
    };

    const addNewLineItem = () => {
        setLineItems([...lineItems, { description: "", quantity: "", price: "" }]);
    };
    const removeLineItem = (index: number) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/invoice", formData, {
            });
            alert("Invoice Saved successfully!");

            setFormData({
                name: "",
                amount: 0,
                particular: "",

            });
            setShowForm(false);
        } catch (error: any) {
            console.error("Error adding invoice:", error.response?.data || error);
            alert("Failed to add invoice.");
        }
    };


    const [customer, setCustomer] = useState([])

    const fetchCustomer = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/customer");
            setCustomer(response.data); // Store fetched users in state
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    


    return (
        <>
            <div className="fixed flex justify-center items-center h-screen w-full top-0 left-0 z-100">

                <form className="w-[50%] lg:p-[50px] p-5 bg-blue-200 flex flex-col gap-4 relative" onSubmit={handleSubmit} >
                    <button onClick={() => setShowForm(false)} className="absolute right-[10px] top-[10px] bg-white rounded-[100%] px-2 py-1 text-2xl">X</button> {/* Close Button */}
                    <h3 className="text-xl">Customer Details</h3>
                    <hr />
                    <select className="border outline-none rounded-[5px] p-3" name="name" id="" value={formData.name} onChange={handleSelectChange}>
                        <option className="border outline-none rounded-[5px] p-3" value="">Select Customer</option>
                        {customer.map((cust: any) => (
                            <option className="border outline-none rounded-[5px] p-3" key={cust.id} value={cust.id}>
                                {cust.name}
                            </option>
                        ))}
                    </select>
                    <input className="border outline-none rounded-[5px] p-3" type="text" placeholder="Particular" onChange={handleChange} name="particular" value={formData.particular} />
                    <div className="flex justify-between">
                    <h3 className="text-xl">Item Details</h3> 
                    <button type="button" onClick={addNewLineItem}>+ Add Item</button></div>


                    <hr />
                    {lineItems.map((lineItem, index) => (
                    <div key={index} className="flex justify-between">
                        <input className="border outline-none w-100 rounded-[5px] p-3" type="text" placeholder="Item" name="description" value={lineItem.description} onChange={(e) => handleLineItemChange(index, e)} />
                        <input className="border outline-none w-20 rounded-[5px] p-3" type="text" placeholder="Quantity" name="quantity" value={lineItem.quantity} onChange={(e) => handleLineItemChange(index, e)} />
                        <input className="border outline-none w-40 rounded-[5px] p-3" type="text" placeholder="Price" name="price" value={lineItem.price} onChange={(e) => handleLineItemChange(index, e)} />
                        <button type="button" onClick={() => removeLineItem(index)}>Remove</button>
                    </div>
                ))}
                    <button className="border outline-none bg-blue-900 w-50 rounded-[5px] p-3">Save Invoice</button>
                </form>
            </div>
        </>
    )
}

export default InvoiceForm;