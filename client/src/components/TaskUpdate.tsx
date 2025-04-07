import { useState } from "react"

const UpdateTask = (id, onClose) => {
    const [formData, setFormData] = useState({
        assignTo : "",
        taskName : "",
        project : "",
        description: "",
        dueDate : "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/api/task/${id}`),{
            method: "PUT",
            body: formData,
        }
        if (response.ok) {
            alert("User updated successfully!");
            onClose();
          } else {
            alert("Failed to update user.");
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
    }

    }

    return (
        <>
            <div className="modal">
                <div className="modal-content border-1 p-5">
                    <h2>Update User</h2>
                    <form onSubmit={handleSubmit} className="w-full">
                        <select name="assignTo" id="">
                            <option value=""></option>
                        </select>
                        <input
                            className="border-[1px] rounded-[5px] w-full my-2 p-2"
                            type="text"
                            name="name"
                            value={formData.taskName}
                            onChange={handleChange}
                            placeholder="Task Name"
                        />
                        <input
                            className="border-[1px] rounded-[5px] w-full my-2 p-2"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            className="border-[1px] rounded-[5px] w-full my-2 p-2"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                        />
                        <select
                            className="border-[1px] rounded-[5px] w-full my-2 p-2"
                            name="role"
                            value={formData.role}
                            onChange={handleSelectChange}
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                        </select>

                        <input
                            className="border-[1px] rounded-[5px] w-full my-2 p-2"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className="flex gap-5">
                            <button type="submit" className="bg-blue-500 px-5 py-2 rounded-[5px] text-white">
                                Update
                            </button>
                            <button type="button" className="bg-red-500 px-5 py-2 rounded-[5px] text-white" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}