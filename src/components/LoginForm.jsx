import React, { useState } from 'react';

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-1 text-[48px]">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6 text-[18px] mt-2 font-bold">Welcome Back! Please enter your details.</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 text-lg text-black bg-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 text-lg text-black bg-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between text-sm">
              <a href="#" className="text-green-600 hover:text-green-800">Forgot Password</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign In
            </button>

            <p className="text-center text-sm mt-4 text-[#767676] font-bold">
              Don't have an account? <a href="#" className="text-green-400 hover:text-green-800">Create now</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Logo */}
      <div className="w-1/2 bg-[#1A0839] flex items-center justify-center">
        <img
        src="logo.svg"
        alt="NeoAgent Logo"
        className="w-3/4 max-w-md"
        />
      </div>
    </div>
  );
};

export default LoginForm;
