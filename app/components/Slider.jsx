import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { RiChatNewLine, RiMore2Fill } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

const Slider = ({ onUserSelect }) => {
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResult = await profile();
        console.log("Profile Data:", profileResult.data.data); // Log fetched profile data
        setProfileData(profileResult.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Fetch users whenever profileData changes
  useEffect(() => {
    if (profileData._id) {
      // Only fetch users if profileData has a valid id
      users();
    }
  }, [profileData]);

  // Fetch users
  async function users() {
    try {
      const result = await axios.get("/api/users/allusers");
      console.log("All Users:", result.data);

      if (profileData && profileData._id) {
        const filteredUsers = result.data.filter(
          (user) => user._id !== profileData._id
        );
        console.log("Filtered Users:", filteredUsers);
        setUserData(filteredUsers);
      } else {
        console.error("Profile data is not set or invalid");
      }
    } catch (error) {
      console.error("Error fetching all users", error);
    }
  }

  // Fetch profile
  async function profile() {
    try {
      const result = await axios.post("/api/users/profile");
      return result; // Return the result to be used in fetchData
    } catch (error) {
      console.error("Error fetching profile", error);
      throw error; // Propagate error to fetchData
    }
  }

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Handle the selected file
    }
  };

  return (
    <section className="bg-[#1C1D22] text-white w-[350px]">
      <div className="flex justify-between items-center px-6 py-2 pt-6">
        {profileData.imageUrl && (
          <Image
            src={profileData.imageUrl}
            width={200}
            height={180}
            alt="User Image"
            className="rounded-full w-[48px] h-[48px] object-cover"
          />
        )}
        <div className="flex gap-6">
          <RiChatNewLine className="text-2xl" />
          
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" >
            <RiMore2Fill className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#1C1D22] rounded-box z-[1] w-52 p-2 shadow-white text-white "
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Change Theme</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-6 py-2 mt-2 relative">
        <input
          type="text"
          className="w-full p-2 bg-[#26272D] text-white rounded-lg focus:outline-none"
          placeholder="Search..."
        />
        <LuSearch className="absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-white" />
      </div>

      <hr className="mt-2 mb-2" />

      <div>
        <h1 className="text-2xl max-lg:text-xl mb-2 mt-2 px-6 py-2">Stories</h1>
        <div className="flex items-center overflow-auto hide-scrollbar smooth-scroll cursor-pointer gap-6 pl-6 py-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <div
            className="w-[60px] h-[60px] max-lg:w-[54px] max-lg:h-[54px] p-6 bg-[#F1E0AC] rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleIconClick}
          >
            <FaPlus className="text-white text-xl" />
          </div>
          {userData.map((item) => (
            <Image
              key={item.id} // Assuming each user has a unique id
              src={item.imageUrl}
              width={200}
              height={180}
              alt="User Image"
              className="rounded-full w-[60px] h-[60px] max-lg:w-[54px] max-lg:h-[54px] object-cover object-top"
            />
          ))}
        </div>
      </div>

      <hr className="mt-2 mb-2" />
      <h1 className="text-2xl max-lg:text-xl mb-2 mt-2 px-6 py-2">Messages</h1>

      <div className="flex flex-col gap-y-3 h-[370px] overflow-y-scroll">
        {userData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-x-6 p-2 hover:bg-[#141416] w-[90%] mx-auto cursor-pointer"
            onClick={() => onUserSelect(item)} // Call the onUserSelect function when clicked
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
