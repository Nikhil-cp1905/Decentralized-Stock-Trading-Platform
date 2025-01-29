import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (email === "admin@srmist.com" && password === "admin") {
                alert("Login successful!");
                setError("");
                navigate("/"); // Redirect to Overview page
            } else {
                setError("Invalid email or password");
            }
        } else {
            alert("Sign-up successful!");
            setError("");
        }
    };

    return (
        <div className='flex-1 flex flex-col items-center justify-center min-h-screen bg-black text-white relative z-50'>
            <Header title={isLogin ? "Login" : "Sign Up"} className="text-[#182434]" />

            <div className='w-full max-w-md bg-[#182434] p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-center text-white mb-4'>{isLogin ? "Login" : "Sign Up"}</h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            className='w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring focus:ring-gray-500' 
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring focus:ring-gray-500' 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring focus:ring-gray-500' 
                    />
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <button 
                        type="submit" 
                        className='w-full p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition text-white font-bold'>
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className='text-center mt-4 text-gray-400'>
                    {isLogin ? "Don't have an account?" : "Already have an account?"} 
                    <span 
                        className='text-gray-300 cursor-pointer underline ml-1' 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}>
                        {isLogin ? " Sign Up" : " Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
