const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const logger = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/user.router");
const { Connect } = require("./config/connect");

/* logger morgan */
app.use(logger("tiny"));

/* json parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* connect to db */
Connect();

/* Enable CORS */
app.use(cors()); 

/* routes */
app.use("/api", userRouter);

/* server start */
const PORT = process.env.PORT;
app.listen(PORT, console.log(`server started on port ${PORT}`));
