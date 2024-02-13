const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost/wanderlust ";

main().then(()=>{
    console.log("connection to DB");
}).catch((err)=>{console.log(err);})

async function main(){
    mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({
    ...obj,
    owner:"65b26fe34434f1e5687e9e15",
   }));
   await Listing.insertMany(initData.data);
   console.log("data was initialize");
}

initDB();