"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeController from "../components/ThemeController";
import Slider from "../components/Slider";
import { LuSearch } from "react-icons/lu";
import { RiMore2Fill } from "react-icons/ri";

const Page = () => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      {/* <button onClick={handleLogout}>logout</button> */}
      <section className="flex w-full">
        <Slider onUserSelect={handleUserSelect} />
        <div className="user-details w-full">
          {selectedUser ? (
            <div className="bg-black w-full text-[#FFFFFF] px-20 py-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center ">
                  <img
                    src={selectedUser.imageUrl}
                    alt={selectedUser.username}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <h2 className="text-xl">{selectedUser.username}</h2>
                </div>
                <div className="flex gap-4 items-center">
                  <LuSearch className="text-2xl "/>
                  <RiMore2Fill className="text-2xl" />
                </div>
              </div>
            </div>
          ) : (
            <p>Select a user to see their details.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
