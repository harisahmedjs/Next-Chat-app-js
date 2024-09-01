import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest , NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect()

export async function GET(request){
     const userId = await getDataFromToken(request)
     const user = await User.findOne({_id:userId}).select("-password")
     return NextResponse.json({
        message: "user found ",
        data : user
     })
}