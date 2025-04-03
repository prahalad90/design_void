import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceForm = ({ setShowForm }) => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)

        try {
            const response = await axios.post("http://localhost:5000/api/invoice", FormData, {
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

                <form className="w-[50%] lg:p-[50px] p-5 bg-blue-500 flex flex-col gap-4 relative" onSubmit={handleSubmit} >
                    <button onClick={() => setShowForm(false)} className="absolute right-[10px] top-[10px] bg-white rounded-[100%] px-2 py-1 text-2xl">X</button> {/* Close Button */}
                    <select className="border rounded-[5px] p-3" name="name" id="" value={formData.name} onChange={handleSelectChange}>
                        <option value="">Select Customer</option>
                        {customer.map((cust: any) => (
                            <option key={cust.id} value={cust.id}>
                                {cust.name}
                            </option>
                        ))}
                    </select>
                    <input className="border rounded-[5px] p-3" type="text" placeholder="Particular" onChange={handleChange} name="particular" value={formData.particular} />
                    <input className="border rounded-[5px] p-3" type="text" placeholder="Amount" onChange={handleChange} name="amount" value={formData.amount} />
                    <button className="border rounded-[5px] p-3">Save Invoice</button>
                </form>
            </div>
        </>
    )
}

export default InvoiceForm;