import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";

function Task() {

    const [formData, setFormData] = useState({
        userid: "",
        project: "",
        title: "",
        description: "",
        duedate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/task/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    status: "Pending",
                    assignedby: 1,
                }),
            });
            console.log(formData);
            const result = await response.json();
            console.log("Response:", result);
            setFormData({
                userid: "",
                project: "",
                title: "",
                description: "",
                duedate: "",
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [task, setTask] = useState([]);

    // Function to fetch users
    const fetchTask = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/task/");
            setTask(response.data); // Store fetched users in state
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    const columns = [
        {
            name: "Task",
            selector: (row: any) => row.user_id,
            sortable: true,
        },
        {
            name: "Project",
            selector: (row: any) => row.project,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row: any) => row.description,
        },
        {
            name: "Assigned By",
            selector: (row: any) => row.assignedby,
        },
        {
            name: "Due Date",
            selector: (row: any) => new Date(row.duedate).toLocaleDateString("en-US"),
        },
        {
            name: "Status",
            selector: (row: any) => row.status,
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

    const [project, setProject] = useState([])

    const fetchProject = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/project/");
            setProject(response.data); // Store fetched users in state
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [])


    const [myuser, setUser] = useState([])

    const fetchAssignby = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/");
            setUser(response.data); // Store fetched users in state
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchAssignby();
    }, [])


    return (
        <>
            <div>
                <h1 className='text-2xl'>New Task</h1>
                <hr />
                <div className='w-full'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-wrap gap-2 py-4'>
                            <select name="userid" id="" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(33%-4px)]' value={formData.userid} onChange={handleSelectChange}>
                                <option value="">Assign To</option>
                                {myuser.map((user: any) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <select name="project" id="" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(33%-4px)]' value={formData.project} onChange={handleSelectChange}>
                                <option value="">Select Project</option>
                                {project.map((proj: any) => (
                                    <option key={proj.id} value={proj.name}>
                                        {proj.name}
                                    </option>
                                ))}
                            </select>

                            <input className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(33%-4px)]' placeholder='Task Name' type="text" name='title' value={formData.title}
                                onChange={handleChange} />
                            <input type="text" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(80%-4px)]' placeholder='Task Detail' name='description' value={formData.description}
                                onChange={handleChange} />
                            <input type="date" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(20%-4px)]' placeholder='Due Date' name='duedate' value={formData.duedate}
                                onChange={handleChange} />
                            <input type="Submit" value="Submit" className='bg-blue-500 px-5 py-2 b rounded-[5px] cursor-pointer' />
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-2xl">Task List</h2>
                <hr className="mb-4" />
                <DataTable
                    columns={columns}
                    data={task}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={customStyles}
                />
            </div>
        </>
    );
}

export default Task;