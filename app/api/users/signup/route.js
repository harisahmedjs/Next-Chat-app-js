import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helper/mailer";

connect()

export async function POST(request){
 try {
    const reqbody = await request.json()
    const {username , email , password} = reqbody
    const user =  await User.findOne({email})

 if (user) {
    return NextResponse.json({error : "user already exist"} , {status :400})
 }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password , salt)

    const newUser = new User({
      username,
      email,
      password : hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    //send verify email
    await sendMail({
      email,
      emailType : "VERIFY",
      userId : savedUser._id
    })
    return NextResponse.json({ message : "user successfully registered" , success : true , savedUser})

 } catch (error) {
    return NextResponse.json({error : error.message} , {status :500})
 }
}
