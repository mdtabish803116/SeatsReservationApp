const mongoose = require("mongoose")


async function connectDataBase(){
    const dbUrl = "mongodb://localhost:27017/book-ticket"

  try {
      await mongoose.connect(dbUrl);
      console.log("database connection successful");
  }catch(err) {
      console.error("Error in database connection",err.message);
      throw err
  }
}

module.exports = connectDataBase

