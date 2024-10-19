import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { RiChatNewLine, RiMore2Fill } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from 'react-icons/fa';
const Slider = () => {
    const [profileData, setProfileData] = useState([]);
    const [userData, setUserData] = useState([]);

    // Fetch users and profile data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                await profile(); // First fetch the profile
            await users(); 
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    // Log data when it's set
    useEffect(() => {
        // console.log("Profile Data:", profileData);
        // console.log("User Data:", userData);
        console.log(profileData)
    }, [profileData, userData]);

    // Fetch users
    async function users() {
        try {
            const result = await axios.get("/api/users/allusers");
    
            // Assuming `profileData` contains the logged-in user's ID
            const filteredUsers = result.data.filter(user => user.id !== profileData.id);
    
            setUserData(filteredUsers); // Set only the users excluding the logged-in user
        } catch (error) {
            console.error("Error fetching all users", error);
        }
    }

    // Fetch profile
    async function profile() {
        try {
            const result = await axios.post("/api/users/profile");
            setProfileData(result.data.data); // Make sure result.data is an array
            //   console.log("Profile data fetched:", result.data.data);
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    }

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Perform any action you need with the selected file
            console.log('Selected file:', file);
        }
    };

    return (
        <section className="bg-[#1C1D22] text-white w-[350px]">
            <div className='flex justify-between items-center px-6 py-2'>
                <Image
                    src={profileData.imageUrl}
                    width={200}
                    height={180}
                    alt="User Image"
                    className="rounded-full w-[48px] h-[48px] object-cover"
                />
                <div className='flex gap-6'>
                    <RiChatNewLine className='text-2xl' />
                    <RiMore2Fill className='text-2xl' />
                </div>
            </div>

            <div className="px-6 py-2 mt-2 relative">
                <input
                    type="text"
                    className="w-full p-2  bg-[#26272D] text-white  rounded-lg focus:outline-none "
                    placeholder="Search..."
                />
                <LuSearch className="absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-white" />
            </div>

            <hr className='mt-2 mb-2' />

            <div >
                <h1 className='text-2xl mb-2 mt-2 px-6 py-2'>Stories</h1>
                <div className=" flex items-center overflow-auto hide-scrollbar smooth-scroll cursor-pointer gap-6 pl-6 py-2">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />

                    <div
                        className="w-[60px] h-[60px] p-6  bg-[#F1E0AC] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleIconClick}
                    >
                        <FaPlus className="text-white text-xl  " />
                    </div>
                    {userData.map((item , index) =>(
                        <Image
                            src={item.imageUrl}
                            width={200}
                            height={180}
                            alt="User Image"
                            className="rounded-full w-[60px] h-[60px] object-cover"
                        />
                       
                    ))}
                </div>
                    
                
                
            </div>


            {/* Render User Data */}
            <hr className='mt-2 mb-2' />
            <h1 className='text-2xl mb-2 mt-2 px-6 py-2'>Messages</h1>
           
            <div className="flex flex-col gap-y-3   h-[400px] overflow-y-scroll">
                {userData.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-x-6 p-2 hover:bg-[#141416] w-[90%] mx-auto"
                    >
                        <Image
                            src={item.imageUrl}
                            width={200}
                            height={180}
                            alt="User Image"
                            className="rounded-full w-[48px] h-[48px] object-cover"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-[#FFFFFF] font-semibold">{item.username}</h1>
                            <p className="text-[11px] font-light">Lorem ipsum dolor</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Slider;
