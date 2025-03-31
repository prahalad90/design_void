import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import UpdateUser from '../components/Updateuser'


const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [image, setImage] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("role", formData.role);
    if (image) {
      newFormData.append("image", image);
    }
    try {
      const response = await axios.post("http://localhost:5000/api/users", newFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User added successfully!");
      console.log("User Created:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",

      });
    } catch (error: any) {
      console.error("Error adding user:", error.response?.data || error);
      alert("Failed to add user.");
    }
  };


  const [users, setUsers] = useState([]);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [handleSubmit]);

  const [selectedUser, setSelectedUser] = useState(null)

  const columns = [
    {
      name: "ID",
      selector: (row: any) => <img src={`http://127.0.0.1:5000${row.image}`} alt="" />,
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
    {
      name: "Update",
      selector: (row:any) => (
        <button onClick={() => setSelectedUser(row.id)}>Update</button>
      ),
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
    <div>
      <h2 className="text-2xl">Add New User</h2>
      <hr className="my-2" />
      <form onSubmit={handleSubmit}>

        <div className="my-5 grid grid-flow-col grid-rows-4 gap-x-4 gap-y-0">
          <label className="text-xl pr-5 content-center">Name: </label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label className="text-xl pr-5 content-center">Email:</label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="text-xl pr-5 content-center">Password:</label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label className="text-xl pr-5 content-center">Role:</label>
          <select className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' name="role" value={formData.role} onChange={handleSelectChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <label htmlFor="image">Image</label>
          <input name="image" type="file" accept="image/*" onChange={handleImageChange} />
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
          customStyles={customStyles}
        />
      </div>
      {selectedUser && (
        <UpdateUser user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AddUserForm;
