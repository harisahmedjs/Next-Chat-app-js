import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken";

connect()

export async function POST(request){
    try {
        
        const reqbody = await request.json()
        const { email , password} = reqbody
        console.log(reqbody)

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "user doesnot exists" } , {status: 400})
        }
        console.log("user exists")

        const validPassword = bcryptjs.compare(password , user.password)

        if (!validPassword) {
            return NextResponse.json({error : "check your credentials"} , {status: 400})
        }
         
        const tokenData = {
            id: user._id,
            username : user.username,
            email: user.email
        }

    const token =  jwt.sign(tokenData , process.env.SECRET_TOKEN , { expiresIn: '1d' })

    const response = NextResponse.json({message: "logged in Success" , success: true})

    response.cookies.set("token" , token , {
        httpOnly :true
    })

    return response

    } catch (error) {
        return NextResponse.json({error: error.message} , {status: 500})
    }

}