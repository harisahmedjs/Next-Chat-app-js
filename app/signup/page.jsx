"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const page = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const user = {
        username,
        email,
        password
    }

  const router = useRouter()

    const handlelogin = async () => {

        if (username && email && password) {
            try {
               const result =  await axios.post("/api/users/signup", user)
                  console.log(result.data.savedUser)
                  if (result.data.savedUser) {
                     router.push("/home")
                  }
                } catch (error) {
                    console.log(error.message)
                }
                // console.log(user)
                // console.log(username);
                // console.log(email);
                // console.log(password);
                
                //   setUsername('');
                //   setEmail('');
                //   setPassword('');
         

        } else {
            console.log("Please enter all values");
        }
    }

    return (
        <div className='flex items-center  max-w-screen-2xl mx-auto px-4 justify-center min-h-screen'>
            <div className='w-[500px] max-md:w-full mx-auto px-6 py-12 max-md:py-6 max-md:h-[540px] rounded-3xl bg-white border-2 border-gray-100'>
                <h1 className='text-4xl max-md:text-2xl font-semibold'>Register</h1>
                <p className='font-medium text-lg max-md:text-base text-gray-500 mt-4'> Fill in your details to join us!</p>
                <div className='mt-8 max-md:mt-4'>
                    <div className='flex flex-col mb-2'>
                        <label className='text-lg max-md:text-base font-medium'>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full border-2 focus:border-violet-500 focus:outline-none max-md:p-2 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="John Doe"
                            type='text' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg max-md:text-base font-medium'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border-2 focus:border-violet-500 focus:outline-none max-md:p-2 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="abc@example.com"
                            type='email' />
                    </div>

                    <div className='flex flex-col mt-4  relative'>
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
                            onClick={handlelogin}
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 max-md:py-2 bg-violet-500 rounded-xl text-white font-bold text-lg max-md:text-base'>
                            Register
                        </button>
                        {/* <button
                            className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 max-md:py-2 max-md:text-base rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100' >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='max-md:w-[16px]'>
                                <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                                <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                                <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                                <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
                            </svg>
                            Sign up with Google
                        </button> */}
                    </div>
                    <div className='mt-8  max-md:mt-4 max-md:text-base flex justify-center items-center'>
                        <p className='font-medium text-base'>Already have an account?</p>
                        <button className='ml-2 font-medium text-base text-violet-500'><Link href="/">Login</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
