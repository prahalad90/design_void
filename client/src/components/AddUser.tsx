import React, { useState, useEffect} from "react";
import axios from "axios";
import DataTable from "react-data-table-component";


const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      alert("User added successfully!");
      console.log("User Created:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error);
      alert("Failed to add user.");
    }
  };


  const [users, setUsers] = useState([]);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data); // Store fetched users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [handleSubmit]);

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Role",
      selector: (row: any) => row.role,
    },
  ];
  return (
    <div>
      <h2 className="text-2xl">Add New User</h2>
      <hr className="my-2" />
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="text-xl pr-5">Name: </label>
          <input className='border-2 border-solid border-blue-400 rounded-[5px] p-2' type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="my-5">
          <label className="text-xl pr-5">Email:</label>
          <input className='border-2 border-solid border-blue-400 rounded-[5px] p-2' type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="my-5">
          <label className="text-xl pr-5">Password:</label>
          <input className='border-2 border-solid border-blue-400 rounded-[5px] p-2 ' type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="my-5">
          <label className="text-xl pr-5">Role:</label>
          <select className='border-2 border-solid border-blue-400 rounded-[5px] p-2 ' name="role" value={formData.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className='bg-blue-500 px-5 py-2 b rounded-[5px] cursor-pointer' type="submit">Add User</button>
      </form>

      <hr className="my-5" />
      <div className="p-4">
      <h2 className="text-2xl mb-4">Users List</h2>
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
      />
    </div>

    </div>
  );
};

export default AddUserForm;
