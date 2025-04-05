import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {validateEmail} from '../../utils/helper.js'
import { toast } from "react-toastify";
import { BackgroundLinesDemo } from '@/components/bg.jsx';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if (!validateEmail(email)) {
          setError("Please enter a valid email address");
          return;
        }
      
        if (!password) {
          setError("Please enter the password");
          return;
        }
      
        setError("");
      
        try {
          const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // Ensures cookies (JWT) are stored in the browser
          });
      
          const data = await response.json();
      
          if (response.ok) {
            localStorage.setItem("token", data.token); // Store token for future API calls
            toast.success("Login successful!");
            navigate("/"); // Redirect user on successful login
          } else {
            setError(data.message || "Invalid email or password");
          }
        } catch (error) {
          console.error("Login error:", error);
          setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('/images/bg.jpeg')` }}
        >

{/*             
               <BackgroundLinesDemo/> */}
         
             
         
            <div className="bg-white/80 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
               
            </div>
        </div>
    );
};
