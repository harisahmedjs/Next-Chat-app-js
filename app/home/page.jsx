"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ThemeController from "../components/ThemeController";
import Slider from "../components/Slider";
import { LuSearch } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import { RiMore2Fill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const Page = () => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

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

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioURL(URL.createObjectURL(audioBlob));
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleEmoji = e =>{
    setText(prev=> prev + e.emoji)
    setOpen(false)
  }

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Display the file name if needed
      console.log(file); // Process the file or upload it here
    }
  };
  
  return (
    <>
      {/* <button onClick={handleLogout}>logout</button> */}
      <section className="flex w-full overflow-x-hidden">
        <Slider onUserSelect={handleUserSelect} />
        <div className="user-details w-full">
          {selectedUser ? (
            <>
              <div className="bg-[#1C1D22] w-full text-[#FFFFFF] px-20  max-lg:px-4 py-5">
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
              <div className="bg-chat bg-no-repeat bg-cover bg-center w-full p-4 h-[646px] overflow-y-scroll">
                <div>
                  {sortedMessages.map((item, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${
                        item.type === "sender"
                          ? "justify-end pb-2"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`relative max-w-md max-md:max-w-sm p-3 ${
                          item.type === "sender"
                            ? "bg-[#005c4b] text-white max-xl:text-sm p-2 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl"
                            : "bg-[#202c33] text-white max-xl:text-sm rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl"
                        }`}
                      >
                        <p className="mb-1">{item.message}</p>
                        <span
                          className={`text-xs text-gray-300 absolute   bottom-0 ${
                            item.type === "sender"
                              ? "left-0 px-4 mt-4"
                              : "right-0 px-4 py-2 "
                          }`}
                        >
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#1C1D22]  py-4 sticky bottom-0 flex justify-center">
      <div className="flex items-center w-[90%] max-lg:w-full    mx-auto justify-evenly px-4 relative">
        
        {/* Emoji Picker with Smooth Transition */}
        <div
          className={`absolute bottom-16 left-0 bg-[#26272D] p-2 rounded-lg shadow-md transition-all duration-500 ease-in-out
            ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}
          `}
          style={{ transformOrigin: 'bottom' }}
        >
          {open && <EmojiPicker onEmojiClick={handleEmoji} />}
        </div>
        
        <BsEmojiSmile
          className="text-white text-2xl max-lg:text-xl cursor-pointer"
          onClick={() => setOpen(prev => !prev)}
        />
        
        <div>
      <label htmlFor="file-upload" className="cursor-pointer">
        <GrAttachment className="text-white text-2xl  max-lg:text-xl " />
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

    </div>
        
        <input
          type="text"
          placeholder="Write a message"
          className="h-[46px] max-lg:h-[40px] w-[808px] max-xl:w-[600px] max-lg:w-[350px] text-xl max-lg:text-md rounded-xl px-4 py-4 focus:outline-none bg-[#26272D] text-white"
          onChange={(e)=>setText(e.target.value)}
          value={text}
        />
        
        <MdOutlineKeyboardVoice className="text-white text-2xl  max-lg:text-xl " />
      </div>
    </div>
              </div>
            </>
          ) : (
            <div>
              <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
              {audioURL && (
                <audio controls>
                  <source src={audioURL} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
