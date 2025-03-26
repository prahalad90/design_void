import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Login = () => {
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/login/", formData);
          console.log("Login Success:", response.data);
          localStorage.setItem("auth", "true");
          setFormData({
            email: "",
            password:"",
          });
        } catch (error:any) {
          console.error("Error adding user:", error.response?.data || error);
          alert("Incorrect Password.");
        }
      };




    return (
        <div className="flex items-center justify-center h-screen w-full bg-black text-white">
            <div className="border-2 border-solid p-5 rounded-xl text-center">
                <h2 className="text text-center text-2xl">Login Page</h2>
                <input type="text" name="email" className="w-100 block my-5 outline-none border-2 border-solid border-blue-400 rounded-[5px] p-2" onChange={handleChange}/>
                <input type="text" name="password" className="w-100 block my-5 outline-none border-2 border-solid border-blue-400 rounded-[5px] p-2 " onChange={handleChange}/>
                <button className="w-50 bg-red-500 p-2 rounded-[5px]" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
