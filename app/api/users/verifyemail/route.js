import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest , NextResponse } from "next/server";


connect()

export async function POST(request){
    try {
        const reqbody = await request.json()
         const {token} = reqbody
         console.log(token)
 
        const user = await User.findOne({verifyToken : token , verifyTokenExpiry: {$gt: Date.now()}})
  
        if (!user) {
            return NextResponse.json({error : "Invalid Token"} , {status : 400})
        }
        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: "Email Verified Successfully", success: true})

    } catch (error) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}