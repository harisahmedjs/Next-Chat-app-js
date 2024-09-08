import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest , NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect()

export async function POST(request){
   try {
      const userId =  getDataFromToken(request)
      const user = await User.findOne({_id:userId}).select("-password")
      return NextResponse.json({
         message: "user found ",
         data : user
      })
   } catch (error) {
      return NextResponse.json({error: error.message}, {status: 400});
   }
     
}