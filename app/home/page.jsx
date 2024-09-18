"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const page = () => {

 const router = useRouter()

  useEffect(()=>{
  
    users()

  },[])

  async function users (){
        const result = await axios.get("/api/users/allusers")
            console.log(result.data)
      }

async function handleLogout() {
   const res = await axios.get("/api/users/logout")
   console.log(res.data)
   router.push('/')
}



  return (
    <div>
      <h1>hello</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default page
