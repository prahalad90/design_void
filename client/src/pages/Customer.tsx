import { useState,useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";


const Customer = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        pincode: "",
        mobile: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/customer", formData, {
            });
           
            alert("Customer added successfully!");
            console.log("User Created:", response.data);
            setFormData({
                name: "",
                address: "",
                pincode: "",
                mobile: "",
                email: "",
            });
        } catch (error: any) {
            console.error("Error adding customer:", error.response?.data || error);
            alert("Failed to add customer.");
        }
    };

    const [customer, setCustomer] = useState([]);

    // Function to fetch users
    const fetchCustomer = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/customer");
            setCustomer(response.data);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);


    const columns = [
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row: any) => row.address,
        },

        {
            name: "Update",
            selector: () => <button>Update</button>,
        },
    ];

    const customStyles = {
        rows: {
          style: {
            fontSize: '16px', // Adjust text size for table rows
          },
        },
        headCells: {
          style: {
            fontSize: '18px', // Adjust text size for table headers
            fontWeight: 'bold',
          },
        },
        cells: {
          style: {
            fontSize: '16px', // Adjust text size for table cells
          },
        },
      };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="my-5 grid grid-flow-col grid-rows-4 gap-x-4 gap-y-0">
                        <label className="text-xl pr-5 content-center">Name: </label>
                        <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="text" name="name" value={formData.name} onChange={handleChange} required />

                        <label className="text-xl pr-5 content-center">Address:</label>
                        <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="text" name="address" value={formData.address} onChange={handleChange} required />

                        <label className="text-xl pr-5 content-center">Pincode:</label>
                        <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />

                        <label className="text-xl pr-5 content-center">mobile:</label>
                        <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

                        <label className="text-xl pr-5 content-center">Email:</label>
                        <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' type="text" name="email" value={formData.email} onChange={handleChange} required />

                    </div>
                    <button className='bg-blue-500 px-5 py-2 b rounded-[5px] cursor-pointer' type="submit">Add Customer</button>
                </form>
            </div>

            <hr className="my-5" />
            <div className="p-4">
                <h2 className="text-2xl mb-4">Customer List</h2>
                <DataTable
                    columns={columns}
                    data={customer}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={customStyles}
                />
            </div>
            
        </>
    )
}
export default Customer;