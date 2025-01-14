const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express()

const port = process.env.PORT || 5000;

// app.get("/test-error", (req, res, next) => {
//     res.status(500); // Set status code
//     next(new Error("This is a test error")); // Pass the error to the handler
// });


// app.get("/no-error", (req, res) => {
//     res.status(200).json({ message: "No error, all good!😊" });
// });

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});