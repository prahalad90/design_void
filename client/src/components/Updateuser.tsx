import { useState, useEffect } from "react";

const UpdateUser = ({ user, onClose }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user}`);
        const data = await response.json();
      
        setFormData({
          name: data.name || "",
          email: data.email || "",
          password: "", // Leave blank for security
          role: data.role || "employee",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

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

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    updatedData.append("password", formData.password);
    updatedData.append("role", formData.role);
    
    if (image) {
      updatedData.append("image", image);
    }

    console.log("Submitting Data:", Object.fromEntries(updatedData.entries())); // Debugging
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${user}`,{
        method: "PUT",
        body: updatedData,
      });

      if (response.ok) {
        alert("User updated successfully!");
        onClose();
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="modal">
      <div className="modal-content border-1 p-5">
        <h2>Update User</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            className="border-[1px] rounded-[5px] w-full my-2 p-2"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
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
  );
};

export default UpdateUser;
