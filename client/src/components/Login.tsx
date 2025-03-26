import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Login = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async () => {
      try {
          const res = await axios.post('http://localhost:5000/auth/login', { email, password });
          localStorage.setItem('token', res.data.token);
          console.log('Login successful');
          navigate('/');

      } catch (err) {
          console.log('Login failed');
      }
  };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-black text-white">
            <div className="border-2 border-solid p-5 rounded-xl text-center">
                <h2 className="text text-center text-2xl">Login Page</h2>
                <input type="text" name="email" className="w-100 block my-5 outline-none border-2 border-solid border-blue-400 rounded-[5px] p-2" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" name="password" className="w-100 block my-5 outline-none border-2 border-solid border-blue-400 rounded-[5px] p-2 " onChange={(e) => setPassword(e.target.value)}/>
                <button className="w-50 bg-red-500 p-2 rounded-[5px]" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
