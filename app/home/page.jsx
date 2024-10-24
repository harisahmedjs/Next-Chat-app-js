"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeController from "../components/ThemeController";
import Slider from "../components/Slider";
import { LuSearch } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import { RiMore2Fill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };
  const messagesArr = [
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "sender",
      time: "12:09",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "sender",
      time: "12:12",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "sender",
      time: "12:13",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "receiver",
      time: "12:11",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "receiver",
      time: "12:14",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "receiver",
      time: "12:14",
    },
    {
      message:
        "Connecting the dots between information and development! Join us in celebrating World Development Information Day. Let's leverage information for sustainable",
      type: "receiver",
      time: "12:14",
    },
  ];

  // Sort messages by time
  const sortedMessages = [...messagesArr].sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1]; // Compare hours first, then minutes
  });
  return (
    <>
      {/* <button onClick={handleLogout}>logout</button> */}
      <section className="flex w-full">
        <Slider onUserSelect={handleUserSelect} />
        <div className="user-details w-full">
          {selectedUser ? (
            <>
              <div className="bg-[#1C1D22] w-full text-[#FFFFFF] px-20 py-5">
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
                    <LuSearch className="text-2xl " />
                    <RiMore2Fill className="text-2xl" />
                  </div>
                </div>
              </div>
              <div className="bg-[#141416] w-full p-4 h-[646px] overflow-y-scroll">
                <div>
                  {sortedMessages.map((item, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${
                        item.type === "sender" ? "justify-end pb-2" : "justify-start"
                      }`}
                    >
                      <div
                        className={`relative max-w-md p-3 ${
                          item.type === "sender"
                            ? "bg-blue-500 text-white p-2 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl"
                            : "bg-gray-700 text-white rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl"
                        }`}
                      >
                        <p className="mb-1">{item.message}</p>
                        <span
    className={`text-xs text-gray-300 absolute   bottom-0 ${
      item.type === "sender" ? "left-0 px-4 mt-4" : "right-0 px-4 py-2 "
    }`}
  >
    {item.time}
  </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#1C1D22] w-full py-4  sticky  bottom-0 flex justify-center">
                  <div className=" flex items-center w-[90%] mx-auto justify-evenly px-4">
                    <BsEmojiSmile className="text-white text-2xl" />
                    <GrAttachment className="text-white text-2xl" />
                    <input
                      type="text"
                      placeholder="write a message"
                      className=" h-[40px] w-[808px] rounded-xl px-4 py-4 focus:outline-none bg-[#26272D] text-white "
                    />
                    <MdOutlineKeyboardVoice className="text-white text-2xl" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Select a user to see their details.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
