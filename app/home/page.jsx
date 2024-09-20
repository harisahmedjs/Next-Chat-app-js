"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ThemeController from '../components/ThemeController'
import Slider from '../components/Slider'


const page = () => {

 const router = useRouter()



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
