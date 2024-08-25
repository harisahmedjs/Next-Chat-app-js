import mongoose from "mongoose";

export function connect(){
    try{
        mongoose.connect("mongodb+srv://harisfreefire987:asdf@cluster0.g1ixa.mongodb.net/")
        const connection = mongoose.connection

        connection.on('connected' , ()=>{
            console.log("mongoDb connected")
        })

        connection.on('error' , (err)=>{
            console.log("mongodb connection error please nake sure that databse is up and running: " + err)
            process.exit( )
        })
    } catch (err) {
      console.log("error connecting to db" + err)
    }
}