import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";


const Project = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status:"Running",
    duedate:"", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/project", formData);
      alert("Project added successfully!");
      console.log("Project Created:", response.data);
      setFormData({
        name: "",
        description: "",
        status: "Running",
        duedate: "",
      });
    } catch (error:any) {
      console.error("Error adding project:", error.response?.data || error);
      alert("Failed to add project.");
    }
  };

  const [project, setProject] = useState([])

  const fetchProject = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/project");
      setProject(response.data); // Store fetched users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [handleSubmit]);

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.status,
    },
    {
      name: "Role",
      selector: (row: any) => row.duedate,
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
      <h2 className="text-2xl">Add New Project</h2>
      <hr className="my-2" />
      <form onSubmit={handleSubmit}>
        
        <div className="my-2 grid grid-flow-col grid-rows-4 gap-x-4 gap-y-0">
          <label className="text-xl pr-5 content-center">Name: </label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="text" name="name" value={formData.name} onChange={handleChange} required />
        
          <label className="text-xl pr-5 content-center">Description:</label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2' type="text" name="description" value={formData.description} onChange={handleChange} required />
        
          <label className="text-xl pr-5 content-center">Duedate:</label>
          <input className='border-2 outline-none border-solid border-blue-400 rounded-[5px] p-2 ' type="date" name="duedate" value={formData.duedate} onChange={handleChange} required />
        </div>
        <button className='bg-blue-500 px-5 py-2 b rounded-[5px] cursor-pointer' type="submit">Add Project</button>
      </form>
      <hr className="my-5" />
      <div className="p-4">
        <h2 className="text-2xl mb-4">Users List</h2>
        <DataTable
          columns={columns}
          data={project}
          pagination
          highlightOnHover
          striped
          customStyles={customStyles}
        />
      </div>

    </div>
  );
};

export default Project;
