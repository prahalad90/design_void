import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useState } from "react";

DataTable.use(DT);

function Task() {
    const columns = [
        { data: 'name' },
        { data: 'position' },
        { data: 'office' },
        { data: 'extn' },
        { data: 'start_date' },
        { data: 'salary' },
    ];

    const [formData, setFormData] = useState({
        project: "",
        taskName: "",
        dueDate: "",
        taskDetail: "",
      });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });
        console.log(formData);
        const result = await response.json();
        console.log("Response:", result);
    } catch (error) {
        console.error("Error:", error);
    }
    };

    return (
        <>
            <div>
                <h1 className='text-2xl'>New Task</h1>
                <hr />
                <div className='w-full'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-wrap gap-2 py-4'>

                            <select name="project" id="" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(33%-4px)]' value={formData.project}
            onChange={handleChange}>
                                <option value="" >Select</option>
                                <option value="Sanchi">Sanchi</option>
                                <option value="Qubescape">Qubescape</option>
                                <option value="Wonder">Wonder</option>
                            </select>
                            <input className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(67%-4px)]' placeholder='Task Name' type="text" name='taskName' value={formData.taskName}
            onChange={handleChange}/>
                            <input type="date" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(20%-4px)]' placeholder='Due Date' name='dueDate' value={formData.dueDate}
            onChange={handleChange}/>
                            <input type="text" className='border-2 border-solid border-blue-400 rounded-[5px] p-2 w-[calc(80%-4px)]' placeholder='Task Detail' name='taskDetail' value={formData.taskDetail}
            onChange={handleChange}/>
                            <input type="Submit" value="Submit" className='bg-blue-500 px-5 py-2 b rounded-[5px] cursor-pointer' />
                        </div>
                    </form>
                </div>
            </div>
            <hr className='my-5' />
            
            <DataTable ajax="/data.json" columns={columns} className="display">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Extn.</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Position</td>
                        <td>Office</td>
                        <td>Extn.</td>
                        <td>Start date</td>
                        <td>Salary</td>
                    </tr>
                </tbody>
            </DataTable>
        </>
    );
}

export default Task;