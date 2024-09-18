import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModal";

connect()

export async function GET(){
    try {
    
        // Fetch all users from the 'users' collection
        const users = await User.find({})
    
        // Return the users as a JSON response
        return NextResponse.json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
      }
}