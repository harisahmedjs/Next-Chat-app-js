"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ThemeController from '../components/ThemeController'
import Slider from '../components/Slider'


const page = () => {

 const router = useRouter()
 const [profileData , setProfileData] = useState([])
 const [userData , setUserData] = useState([])

 useEffect(() => {
  // Create an async function inside the useEffect to handle the calls
  const fetchData = async () => {
    try {
      await users();
      await profile();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  fetchData(); // Call the async function
}, []);

useEffect(() => {
  console.log(userData); // This will only log when userData changes
}, [userData]);

async function users() {
  try {
    const result = await axios.get("/api/users/allusers");
        setUserData(result.data)
      } catch (error) {
    console.error("Error fetching all users", error);
  }
}



async function profile() {
  try {
    const result = await axios.post("/api/users/profile");
    // console.log(result.data);
  } catch (error) {
    console.error("Error fetching profile", error);
  }
}

// async function handleLogout() {
//    const res = await axios.get("/api/users/logout")
//    console.log(res.data)
//    router.push('/')
// }



  return (
    <>
      {/* <button onClick={handleLogout}>logout</button> */}
      <section>
        <Slider />
      </section>
    </>
  )
}

export default page
