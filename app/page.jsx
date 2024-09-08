"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginData = {
    email,
    password
  };

  const router = useRouter();

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true); // Start loading
      try {
        const result = await axios.post("/api/users/login", loginData);
        console.log(result.data);
        setEmail('');
        setPassword('');
        router.push("/home")
        // Redirect or perform additional actions
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      console.log("Please enter all values");
    }
  };

  return (
    <div className='flex items-center max-w-screen-2xl mx-auto px-4 justify-center min-h-screen'>
      <div className='w-[500px] max-md:w-full mx-auto px-6 py-12 max-md:py-6 max-md:h-[540px] rounded-3xl bg-white border-2 border-gray-100'>
        <h1 className='text-4xl max-md:text-2xl font-semibold'>Login</h1>
        <p className='font-medium text-lg max-md:text-base text-gray-500 mt-4'> Welcome back! Please enter your details.</p>
        <div className='mt-8 max-md:mt-4'>
          <div className='flex flex-col'>
            <label className='text-lg max-md:text-base font-medium'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border-2 focus:border-violet-500 focus:outline-none max-md:p-2 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="abc@example.com"
              type='email'
            />
          </div>

          <div className='flex flex-col mt-4 relative'>
            <label className='text-lg max-md:text-base font-medium'>Password</label>
            <input
              className='w-full border-2 focus:border-violet-500 focus:outline-none max-md:p-2 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="******"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className='absolute right-4 top-16 max-sm:top-[54px] transform -translate-y-1/2 cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <HiEye size={24} /> : <HiEyeOff size={22} />}
            </div>
          </div>

          <div className='mt-8 max-md:mt-4 flex flex-col gap-y-4'>
            <button
              onClick={handleLogin}
              className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 max-md:py-2 bg-violet-500 rounded-xl text-white font-bold text-lg max-md:text-base'
              disabled={loading} // Disable button when loading
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <div className='mt-8 max-md:mt-4 max-md:text-base flex justify-center items-center'>
            <p className='font-medium text-base'>Don't have an account?</p>
            <button className='ml-2 font-medium text-base text-violet-500'>
              <Link href="/signup">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
