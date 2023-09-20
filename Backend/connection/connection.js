const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    // Handle the error as needed, e.g., exit the application or retry the connection.
  }
}

module.exports = connectToDatabase;